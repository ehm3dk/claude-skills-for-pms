"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestIdMiddleware = requestIdMiddleware;
function newRequestId() {
    return crypto.randomUUID();
}
function requestIdMiddleware(req, res, next) {
    const incoming = (req.header('x-request-id') ?? req.header('X-Request-Id') ?? '').trim() || undefined;
    const requestId = incoming ?? newRequestId();
    req.requestId = requestId;
    res.setHeader('X-Request-Id', requestId);
    next();
}
//# sourceMappingURL=request-id.middleware.js.map