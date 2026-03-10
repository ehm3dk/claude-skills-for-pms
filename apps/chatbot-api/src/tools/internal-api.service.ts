import { Injectable } from '@nestjs/common';
import type { InternalApiSearchResponse } from './internal-api.types';

function withTimeout<T>(ms: number, fn: (signal: AbortSignal) => Promise<T>): Promise<T> {
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), ms);
  return fn(controller.signal).finally(() => clearTimeout(t));
}

@Injectable()
export class InternalApiService {
  private readonly baseUrl =
    (process.env.INTERNAL_API_BASE_URL ?? '').trim() || 'https://example.invalid';

  async search(params: {
    query: string;
    limit: number;
    requestId?: string;
  }): Promise<InternalApiSearchResponse> {
    const q = params.query.trim();
    const limit = Math.max(1, Math.min(params.limit, 10));
    console.log(
      JSON.stringify({
        type: 'tool_call',
        tool: 'searchInternalApi',
        requestId: params.requestId,
        input: { query: q, limit },
        at: new Date().toISOString(),
      }),
    );

    // v1 fallback: if not configured, return deterministic mock results
    if (this.baseUrl === 'https://example.invalid') {
      return {
        results: [
          {
            id: 'mock-1',
            title: `Mock match for "${q}"`,
            url: 'https://internal.example/search',
            snippet: 'Set INTERNAL_API_BASE_URL to enable real search.',
          },
        ],
      };
    }

    const url = new URL('/search', this.baseUrl);
    url.searchParams.set('q', q);
    url.searchParams.set('limit', String(limit));

    return await withTimeout(8000, async (signal) => {
      const res = await fetch(url, {
        method: 'GET',
        headers: { Accept: 'application/json' },
        signal,
      });

      if (!res.ok) {
        throw new Error(`Internal API error: ${res.status} ${res.statusText}`);
      }

      return (await res.json()) as InternalApiSearchResponse;
    });
  }
}

