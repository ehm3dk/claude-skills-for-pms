"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatService = void 0;
const common_1 = require("@nestjs/common");
const internal_api_service_1 = require("../tools/internal-api.service");
const rag_service_1 = require("../rag/rag.service");
function newId() {
    return crypto.randomUUID();
}
let ChatService = class ChatService {
    internalApi;
    rag;
    conversations = new Map();
    constructor(internalApi, rag) {
        this.internalApi = internalApi;
        this.rag = rag;
    }
    async handleMessage(params) {
        const conversation = this.getOrCreateConversation(params.conversationId);
        const userMsg = {
            id: newId(),
            role: 'user',
            content: params.message,
            createdAtIso: new Date().toISOString(),
        };
        conversation.history.push(userMsg);
        const assistant = await this.generateAssistantReply(params.message, params.requestId);
        conversation.history.push(assistant.message);
        return {
            conversationId: conversation.id,
            message: assistant.message,
            quickReplies: assistant.quickReplies,
            requestId: params.requestId,
        };
    }
    getOrCreateConversation(conversationId) {
        if (conversationId) {
            const existing = this.conversations.get(conversationId);
            if (existing)
                return existing;
        }
        const created = { id: newId(), history: [] };
        this.conversations.set(created.id, created);
        return created;
    }
    async generateAssistantReply(userMessage, requestId) {
        const lower = userMessage.toLowerCase();
        if (lower.includes('what can you do')) {
            return {
                message: {
                    id: newId(),
                    role: 'assistant',
                    content: 'Right now I’m a starter bot wired end-to-end. Next we’ll add tool calling so I can query your internal APIs (read-only first) and return structured answers with request IDs and audit logs.',
                    createdAtIso: new Date().toISOString(),
                },
                quickReplies: ['Show me a sample tool call', 'List planned tools'],
            };
        }
        if (lower.includes('sample tool call')) {
            return {
                message: {
                    id: newId(),
                    role: 'assistant',
                    content: [
                        'Here’s an example of how the backend will structure a tool call (v2):',
                        '',
                        JSON.stringify({
                            tool: 'searchInternalApi',
                            input: { query: 'order status 12345', limit: 5 },
                        }, null, 2),
                    ].join('\n'),
                    createdAtIso: new Date().toISOString(),
                },
                quickReplies: ['Help me add my first tool', 'How do permissions work?'],
            };
        }
        if (lower.includes('planned tools') || lower.includes('list planned tools')) {
            return {
                message: {
                    id: newId(),
                    role: 'assistant',
                    content: [
                        'Planned tools (read-only first):',
                        '- `searchInternalApi` (calls your internal API)',
                        '- `getUserContext` (derives roles/tenant from auth)',
                    ].join('\n'),
                    createdAtIso: new Date().toISOString(),
                },
            };
        }
        if (lower.includes('api endpoint') || lower.includes('find an api')) {
            try {
                const data = await this.internalApi.search({ query: userMessage, limit: 5, requestId });
                return {
                    message: {
                        id: newId(),
                        role: 'assistant',
                        content: [
                            'Here are search results from the internal API:',
                            '',
                            ...data.results.map((r) => `- ${r.title}${r.url ? ` (${r.url})` : ''}`),
                        ].join('\n'),
                        createdAtIso: new Date().toISOString(),
                    },
                    quickReplies: ['Search for another endpoint', 'What can you do?'],
                };
            }
            catch {
                return {
                    message: {
                        id: newId(),
                        role: 'assistant',
                        content: 'I tried to call the internal API tool, but it failed. Configure `INTERNAL_API_BASE_URL` and try again.',
                        createdAtIso: new Date().toISOString(),
                    },
                };
            }
        }
        if (lower.includes('doc') || lower.includes('knowledge') || lower.includes('rag')) {
            const retrieved = await this.rag.retrieve(userMessage);
            if (retrieved.snippets.length === 0) {
                return {
                    message: {
                        id: newId(),
                        role: 'assistant',
                        content: 'RAG is currently disabled or there are no matching documents. To enable: set `RAG_ENABLED=true` and add .md/.txt files under `apps/chatbot-api/rag_corpus/`.',
                        createdAtIso: new Date().toISOString(),
                    },
                    quickReplies: ['What can you do?', 'Show me a sample tool call'],
                };
            }
            return {
                message: {
                    id: newId(),
                    role: 'assistant',
                    content: [
                        'Here’s what I found in the knowledge base:',
                        '',
                        ...retrieved.snippets.map((s) => `- ${s.title} [source: ${s.sourceId}]\n  ${s.snippet.replace(/\n+/g, ' ').slice(0, 220)}…`),
                    ].join('\n'),
                    createdAtIso: new Date().toISOString(),
                },
            };
        }
        return {
            message: {
                id: newId(),
                role: 'assistant',
                content: `Got it: “${userMessage}”. (Starter response)`,
                createdAtIso: new Date().toISOString(),
            },
            quickReplies: ['What can you do?', 'Show me a sample tool call'],
        };
    }
};
exports.ChatService = ChatService;
exports.ChatService = ChatService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [internal_api_service_1.InternalApiService,
        rag_service_1.RagService])
], ChatService);
//# sourceMappingURL=chat.service.js.map