import winston from 'winston';
export declare function generateRequestId(): string;
export declare const loggerWithContext: (requestId?: string) => {
    info: (message: string, meta?: any) => void;
    warn: (message: string, meta?: any) => void;
    error: (message: string, meta?: any) => void;
    debug: (message: string, meta?: any) => void;
};
export declare const logger: {
    info: (message: string, ...args: any[]) => winston.Logger;
    warn: (message: string, ...args: any[]) => winston.Logger;
    error: (message: string, ...args: any[]) => winston.Logger;
    debug: (message: string, ...args: any[]) => winston.Logger;
};
export declare const rawLogger: winston.Logger;
//# sourceMappingURL=logger.d.ts.map