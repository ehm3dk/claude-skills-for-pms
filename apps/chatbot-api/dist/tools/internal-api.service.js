"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalApiService = void 0;
const common_1 = require("@nestjs/common");
function withTimeout(ms, fn) {
    const controller = new AbortController();
    const t = setTimeout(() => controller.abort(), ms);
    return fn(controller.signal).finally(() => clearTimeout(t));
}
let InternalApiService = class InternalApiService {
    baseUrl = (process.env.INTERNAL_API_BASE_URL ?? '').trim() || 'https://example.invalid';
    async search(params) {
        const q = params.query.trim();
        const limit = Math.max(1, Math.min(params.limit, 10));
        console.log(JSON.stringify({
            type: 'tool_call',
            tool: 'searchInternalApi',
            requestId: params.requestId,
            input: { query: q, limit },
            at: new Date().toISOString(),
        }));
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
            return (await res.json());
        });
    }
};
exports.InternalApiService = InternalApiService;
exports.InternalApiService = InternalApiService = __decorate([
    (0, common_1.Injectable)()
], InternalApiService);
//# sourceMappingURL=internal-api.service.js.map