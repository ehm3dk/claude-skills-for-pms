"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatModule = void 0;
const common_1 = require("@nestjs/common");
const request_id_middleware_1 = require("../common/request-id.middleware");
const rag_module_1 = require("../rag/rag.module");
const internal_api_service_1 = require("../tools/internal-api.service");
const chat_controller_1 = require("./chat.controller");
const chat_service_1 = require("./chat.service");
let ChatModule = class ChatModule {
    configure(consumer) {
        consumer.apply(request_id_middleware_1.requestIdMiddleware).forRoutes(chat_controller_1.ChatController);
    }
};
exports.ChatModule = ChatModule;
exports.ChatModule = ChatModule = __decorate([
    (0, common_1.Module)({
        imports: [rag_module_1.RagModule],
        controllers: [chat_controller_1.ChatController],
        providers: [chat_service_1.ChatService, internal_api_service_1.InternalApiService],
    })
], ChatModule);
//# sourceMappingURL=chat.module.js.map