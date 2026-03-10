import { Injectable } from '@nestjs/common';
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import type { RagRetrieveResult, RagSnippet } from './rag.types';

type CorpusDoc = { id: string; title: string; content: string };

function tokenize(q: string): string[] {
  return q
    .toLowerCase()
    .split(/[^a-z0-9]+/g)
    .map((t) => t.trim())
    .filter((t) => t.length >= 3)
    .slice(0, 12);
}

@Injectable()
export class RagService {
  private corpus: CorpusDoc[] | null = null;

  async retrieve(query: string): Promise<RagRetrieveResult> {
    const enabled = (process.env.RAG_ENABLED ?? '').trim().toLowerCase() === 'true';
    if (!enabled) return { snippets: [] };

    await this.ensureCorpusLoaded();
    const corpus = this.corpus ?? [];
    const terms = tokenize(query);
    if (terms.length === 0) return { snippets: [] };

    const scored = corpus
      .map((doc) => ({
        doc,
        score: terms.reduce((acc, t) => acc + this.countOccurrences(doc.content.toLowerCase(), t), 0),
      }))
      .filter((x) => x.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);

    const snippets: RagSnippet[] = scored.map(({ doc }) => ({
      sourceId: doc.id,
      title: doc.title,
      snippet: doc.content.slice(0, 500),
    }));

    return { snippets };
  }

  private async ensureCorpusLoaded(): Promise<void> {
    if (this.corpus) return;

    const dir =
      (process.env.RAG_CORPUS_DIR ?? '').trim() || path.join(process.cwd(), 'rag_corpus');
    let files: string[] = [];
    try {
      files = (await readdir(dir)).filter((f) => f.endsWith('.md') || f.endsWith('.txt'));
    } catch {
      this.corpus = [];
      return;
    }

    const docs = await Promise.all(
      files.map(async (file) => {
        const full = path.join(dir, file);
        const content = await readFile(full, 'utf8');
        return {
          id: file,
          title: file,
          content,
        } satisfies CorpusDoc;
      }),
    );

    this.corpus = docs;
  }

  private countOccurrences(haystack: string, needle: string): number {
    let count = 0;
    let idx = 0;
    while (true) {
      const next = haystack.indexOf(needle, idx);
      if (next === -1) return count;
      count += 1;
      idx = next + needle.length;
    }
  }
}

