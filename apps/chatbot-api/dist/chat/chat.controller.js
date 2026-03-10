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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatController = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const chat_dto_1 = require("./chat.dto");
const chat_service_1 = require("./chat.service");
let ChatController = class ChatController {
    chat;
    constructor(chat) {
        this.chat = chat;
    }
    async chatMessage(body, req) {
        const requestId = req.requestId;
        return await this.chat.handleMessage({
            conversationId: body.conversationId,
            message: body.message,
            requestId,
        });
    }
    chatStream(message, conversationId, req) {
        const requestId = req.requestId;
        return new rxjs_1.Observable((subscriber) => {
            void (async () => {
                const res = await this.chat.handleMessage({
                    conversationId: conversationId || undefined,
                    message: message ?? '',
                    requestId,
                });
                subscriber.next({ data: { type: 'meta', conversationId: res.conversationId, requestId } });
                const text = res.message.content;
                for (let i = 0; i < text.length; i += 1) {
                    subscriber.next({ data: { type: 'delta', text: text[i] } });
                    await new Promise((r) => setTimeout(r, 8));
                }
                subscriber.next({ data: { type: 'done' } });
                subscriber.complete();
            })().catch((err) => subscriber.error(err));
        });
    }
};
exports.ChatController = ChatController;
__decorate([
    (0, common_1.Post)('/chat'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [chat_dto_1.ChatRequestDto, Object]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "chatMessage", null);
__decorate([
    (0, common_1.Sse)('/chat/stream'),
    __param(0, (0, common_1.Query)('message')),
    __param(1, (0, common_1.Query)('conversationId')),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], ChatController.prototype, "chatStream", null);
exports.ChatController = ChatController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [chat_service_1.ChatService])
], ChatController);
//# sourceMappingURL=chat.controller.js.map