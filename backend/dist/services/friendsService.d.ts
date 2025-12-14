import { AddFriendInput } from '../schemas/friends';
export declare class FriendsService {
    /**
     * Kullanıcının arkadaş listesini getirme
     */
    getFriends(userId: string): Promise<{
        id: string;
        friend: {
            email: string;
            name: string;
            gender: string;
            id: string;
            createdAt: Date;
        };
        createdAt: Date;
    }[]>;
    /**
     * Arkadaş ekleme
     */
    addFriend(userId: string, input: AddFriendInput): Promise<{
        success: boolean;
        friend: {
            id: string;
            name: string;
            email: string;
            gender: string;
        };
    }>;
    /**
     * Arkadaşlığı kaldırma
     */
    removeFriend(userId: string, friendId: string): Promise<{
        success: boolean;
    }>;
    /**
     * Kullanıcı arama (arkadaş olmayanlar)
     */
    searchUsers(userId: string, query: string): Promise<{
        email: string;
        name: string;
        gender: string;
        id: string;
        createdAt: Date;
    }[]>;
}
export declare const friendsService: FriendsService;
//# sourceMappingURL=friendsService.d.ts.map