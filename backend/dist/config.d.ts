/**
 * Validate environment variables on startup
 */
export declare function validateEnvironment(): void;
export declare const config: {
    nodeEnv: string;
    port: number;
    jwtSecret: string;
    jwtExpiresIn: string;
    databaseUrl: string;
    redisUrl: string;
    corsOrigins: string[];
    agora: {
        appId: string;
        appCertificate: string;
    };
    storage: {
        type: string;
        uploadDir: string;
        s3: {
            bucket: string;
            region: string;
            accessKeyId: string;
            secretAccessKey: string;
        };
    };
};
//# sourceMappingURL=config.d.ts.map