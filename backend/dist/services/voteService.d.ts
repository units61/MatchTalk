import { Server as SocketIOServer } from 'socket.io';
declare class VoteService {
    private io;
    /**
     * WebSocket server'ı set et
     */
    setIO(io: SocketIOServer): void;
    /**
     * Extension vote kaydetme
     */
    voteExtension(userId: string, roomId: string, vote: 'yes' | 'no'): Promise<{
        roomId: string;
        vote: "yes" | "no";
        extensionYes: number;
        extensionNo: number;
        totalVotes: number;
        totalParticipants: number;
    }>;
    /**
     * Vote durumunu getir
     */
    getVoteStatus(roomId: string): Promise<{
        roomId: string;
        extensionYes: number;
        extensionNo: number;
        totalVotes: number;
        totalParticipants: number;
        votesRemaining: number;
        allVotesIn: boolean;
    }>;
    /**
     * Vote sonucunu hesapla
     */
    private calculateVoteResult;
    /**
     * Vote sonucuna göre odayı uzat veya kapat
     */
    private processVoteResult;
}
export declare const voteService: VoteService;
export {};
//# sourceMappingURL=voteService.d.ts.map