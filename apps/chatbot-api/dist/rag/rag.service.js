"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RagService = void 0;
const common_1 = require("@nestjs/common");
const promises_1 = require("node:fs/promises");
const node_path_1 = __importDefault(require("node:path"));
function tokenize(q) {
    return q
        .toLowerCase()
        .split(/[^a-z0-9]+/g)
        .map((t) => t.trim())
        .filter((t) => t.length >= 3)
        .slice(0, 12);
}
let RagService = class RagService {
    corpus = null;
    async retrieve(query) {
        const enabled = (process.env.RAG_ENABLED ?? '').trim().toLowerCase() === 'true';
        if (!enabled)
            return { snippets: [] };
        await this.ensureCorpusLoaded();
        const corpus = this.corpus ?? [];
        const terms = tokenize(query);
        if (terms.length === 0)
            return { snippets: [] };
        const scored = corpus
            .map((doc) => ({
            doc,
            score: terms.reduce((acc, t) => acc + this.countOccurrences(doc.content.toLowerCase(), t), 0),
        }))
            .filter((x) => x.score > 0)
            .sort((a, b) => b.score - a.score)
            .slice(0, 3);
        const snippets = scored.map(({ doc }) => ({
            sourceId: doc.id,
            title: doc.title,
            snippet: doc.content.slice(0, 500),
        }));
        return { snippets };
    }
    async ensureCorpusLoaded() {
        if (this.corpus)
            return;
        const dir = (process.env.RAG_CORPUS_DIR ?? '').trim() || node_path_1.default.join(process.cwd(), 'rag_corpus');
        let files = [];
        try {
            files = (await (0, promises_1.readdir)(dir)).filter((f) => f.endsWith('.md') || f.endsWith('.txt'));
        }
        catch {
            this.corpus = [];
            return;
        }
        const docs = await Promise.all(files.map(async (file) => {
            const full = node_path_1.default.join(dir, file);
            const content = await (0, promises_1.readFile)(full, 'utf8');
            return {
                id: file,
                title: file,
                content,
            };
        }));
        this.corpus = docs;
    }
    countOccurrences(haystack, needle) {
        let count = 0;
        let idx = 0;
        while (true) {
            const next = haystack.indexOf(needle, idx);
            if (next === -1)
                return count;
            count += 1;
            idx = next + needle.length;
        }
    }
};
exports.RagService = RagService;
exports.RagService = RagService = __decorate([
    (0, common_1.Injectable)()
], RagService);
//# sourceMappingURL=rag.service.js.map