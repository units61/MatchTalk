import { Server as HttpServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
export declare const initializeWebSocket: (httpServer: HttpServer) => SocketIOServer<import("socket.io").DefaultEventsMap, import("socket.io").DefaultEventsMap, import("socket.io").DefaultEventsMap, any>;
export declare const emitToUser: (io: SocketIOServer, userId: string, event: string, data: any) => void;
export declare const emitToRoom: (io: SocketIOServer, roomId: string, event: string, data: any) => void;
//# sourceMappingURL=server.d.ts.map