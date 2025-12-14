declare class FileService {
    private storage;
    constructor();
    saveAvatar(file: Express.Multer.File, userId: string): Promise<string>;
    deleteAvatar(filePath: string): Promise<void>;
}
export declare const fileService: FileService;
export {};
//# sourceMappingURL=fileService.d.ts.map