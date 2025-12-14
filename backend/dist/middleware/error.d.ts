import { Request, Response, NextFunction } from 'express';
/**
 * Error handler middleware
 */
export declare const errorHandler: (err: unknown, req: Request, res: Response, _next: NextFunction) => Response<any, Record<string, any>> | undefined;
//# sourceMappingURL=error.d.ts.map