import type { NextFunction, Request, Response } from 'express';

function newRequestId(): string {
  return crypto.randomUUID();
}

export function requestIdMiddleware(req: Request, res: Response, next: NextFunction): void {
  const incoming =
    (req.header('x-request-id') ?? req.header('X-Request-Id') ?? '').trim() || undefined;
  const requestId = incoming ?? newRequestId();
  (req as Request & { requestId?: string }).requestId = requestId;
  res.setHeader('X-Request-Id', requestId);
  next();
}

