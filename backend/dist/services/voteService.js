"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.voteService = void 0;
const prisma_1 = require("../lib/prisma");
const errors_1 = require("../errors");
const server_1 = require("../websocket/server");
const timerService_1 = require("./timerService");
class VoteService {
    constructor() {
        this.io = null;
    }
    /**
     * WebSocket server'ı set et
     */
    setIO(io) {
        this.io = io;
    }
    /**
     * Extension vote kaydetme
     */
    async voteExtension(userId, roomId, vote) {
        // Oda kontrolü
        const room = await prisma_1.prisma.room.findUnique({
            where: { id: roomId },
            include: {
                participants: true,
            },
        });
        if (!room) {
            throw new errors_1.HttpError(404, 'Oda bulunamadı');
        }
        // Kullanıcı odada mı kontrol et
        const isParticipant = room.participants.some((p) => p.userId === userId);
        if (!isParticipant) {
            throw new errors_1.HttpError(403, 'Bu odada değilsiniz');
        }
        // Timer son 10 saniyede mi kontrol et (sadece son 10 saniyede oy verilebilir)
        // timeLeftSec <= 10 && timeLeftSec > 0 olmalı
        if (room.timeLeftSec > 10 || room.timeLeftSec <= 0) {
            throw new errors_1.HttpError(400, 'Uzama oylaması sadece son 10 saniyede yapılabilir');
        }
        // Kullanıcı daha önce oy vermiş mi kontrol et
        // Mevcut Room model'de extensionYes ve extensionNo var ama kullanıcı bazlı değil
        // Basit implementasyon: Her kullanıcı sadece bir kez oy verebilir
        // (Daha gelişmiş için RoomVote model eklenebilir)
        // Vote'u kaydet
        const updateData = {};
        if (vote === 'yes') {
            updateData.extensionYes = (room.extensionYes || 0) + 1;
        }
        else {
            updateData.extensionNo = (room.extensionNo || 0) + 1;
        }
        const updatedRoom = await prisma_1.prisma.room.update({
            where: { id: roomId },
            data: updateData,
            include: {
                participants: true,
            },
        });
        // WebSocket ile vote güncellemesi gönder
        if (this.io) {
            (0, server_1.emitToRoom)(this.io, roomId, 'vote-update', {
                roomId,
                userId,
                vote,
                extensionYes: updatedRoom.extensionYes,
                extensionNo: updatedRoom.extensionNo,
            });
        }
        // Tüm katılımcılar oy verdi mi kontrol et
        const totalVotes = (updatedRoom.extensionYes || 0) + (updatedRoom.extensionNo || 0);
        if (totalVotes >= room.participants.length) {
            // Tüm oylar toplandı, sonucu hesapla
            await this.processVoteResult(roomId);
        }
        return {
            roomId,
            vote,
            extensionYes: updatedRoom.extensionYes,
            extensionNo: updatedRoom.extensionNo,
            totalVotes,
            totalParticipants: room.participants.length,
        };
    }
    /**
     * Vote durumunu getir
     */
    async getVoteStatus(roomId) {
        const room = await prisma_1.prisma.room.findUnique({
            where: { id: roomId },
            include: {
                participants: true,
            },
        });
        if (!room) {
            throw new errors_1.HttpError(404, 'Oda bulunamadı');
        }
        const totalVotes = (room.extensionYes || 0) + (room.extensionNo || 0);
        const totalParticipants = room.participants.length;
        const votesRemaining = totalParticipants - totalVotes;
        return {
            roomId,
            extensionYes: room.extensionYes || 0,
            extensionNo: room.extensionNo || 0,
            totalVotes,
            totalParticipants,
            votesRemaining,
            allVotesIn: totalVotes >= totalParticipants,
        };
    }
    /**
     * Vote sonucunu hesapla
     */
    async calculateVoteResult(roomId) {
        const room = await prisma_1.prisma.room.findUnique({
            where: { id: roomId },
        });
        if (!room) {
            throw new errors_1.HttpError(404, 'Oda bulunamadı');
        }
        const extensionYes = room.extensionYes || 0;
        const extensionNo = room.extensionNo || 0;
        const totalVotes = extensionYes + extensionNo;
        if (totalVotes === 0) {
            return 'close';
        }
        // %50+ evet ise uzat
        const yesPercentage = (extensionYes / totalVotes) * 100;
        return yesPercentage >= 50 ? 'extend' : 'close';
    }
    /**
     * Vote sonucuna göre odayı uzat veya kapat
     */
    async processVoteResult(roomId) {
        try {
            const result = await this.calculateVoteResult(roomId);
            if (result === 'extend') {
                // Odayı 5 dakika uzat
                const extensionSeconds = 300; // 5 dakika
                const room = await prisma_1.prisma.room.update({
                    where: { id: roomId },
                    data: {
                        timeLeftSec: extensionSeconds,
                        durationSec: extensionSeconds,
                        extended: true,
                        extensionYes: 0, // Reset votes
                        extensionNo: 0,
                    },
                });
                // Timer'ı yeniden başlat (voteStarted durumunu temizlemek için stopTimer çağır)
                await timerService_1.timerService.stopTimer(roomId);
                await timerService_1.timerService.startTimer(roomId);
                // WebSocket ile bildir
                if (this.io) {
                    (0, server_1.emitToRoom)(this.io, roomId, 'room-extended', {
                        roomId,
                        newTimeLeft: extensionSeconds,
                        message: 'Oda 5 dakika uzatıldı',
                    });
                    (0, server_1.emitToRoom)(this.io, roomId, 'vote-result', {
                        roomId,
                        result: 'extend',
                        message: 'Oylama sonucu: Oda uzatıldı',
                    });
                }
                return { result: 'extend', newTimeLeft: extensionSeconds };
            }
            else {
                // Odayı kapat
                await prisma_1.prisma.room.update({
                    where: { id: roomId },
                    data: {
                        timeLeftSec: 0,
                        extensionYes: 0,
                        extensionNo: 0,
                    },
                });
                // Timer'ı durdur
                await timerService_1.timerService.stopTimer(roomId);
                // WebSocket ile bildir
                if (this.io) {
                    (0, server_1.emitToRoom)(this.io, roomId, 'vote-result', {
                        roomId,
                        result: 'close',
                        message: 'Oylama sonucu: Oda kapatıldı',
                    });
                    (0, server_1.emitToRoom)(this.io, roomId, 'room-closed', {
                        roomId,
                        reason: 'vote-rejected',
                    });
                }
                return { result: 'close' };
            }
        }
        catch (error) {
            console.error(`Error processing vote result for room ${roomId}:`, error);
            throw error;
        }
    }
}
exports.voteService = new VoteService();
//# sourceMappingURL=voteService.js.map