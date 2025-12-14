import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView, Pressable, Platform} from 'react-native';
import Icon from '../../components/common/Icon';
import Avatar from '../../components/common/Avatar';
import {colors} from '../../theme/colors';
import {spacing} from '../../theme/spacing';
import {typography} from '../../theme/typography';
import {radius} from '../../theme/radius';

interface InviteScreenProps {
  roomId?: string;
  roomName?: string;
  onBack?: () => void;
  onInviteAll?: () => void;
}

interface Friend {
  id: string;
  name: string;
  avatar?: string;
  status: 'online' | 'busy' | 'away';
  activity?: string;
  inviteStatus: 'available' | 'sent' | 'invited' | 'disabled';
}

const InviteScreen: React.FC<InviteScreenProps> = ({
  roomId,
  roomName = 'Geyik Muhabbeti #42',
  onBack,
  onInviteAll,
}) => {
  const [friends] = useState<Friend[]>([
    {
      id: '1',
      name: 'Ahmet Yılmaz',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBo8rrF7zyQADCN6qdBD-hvgGBcO3k_URQRvEkv4E2eK3qBMymO2YBvAphwlCFb49kH-ku_brn4C1ZDJx8Hf8AlgMnn2cH5keNnOge9U7J0JnUdPBmjK4m5Ihdyvdxoac7gtkj_FOnbWEjaUA8GVA_EDN5yH9ixZ1_j9kIVj43jHOVDS8LfITENWtcdGe_8DPLq7copNa8WwE9E8b_MC_PU8ZLO57BXkEEZmdlTK21bnuZg6MH4oRADjKg7587LgVnXHB9Ny04BTIg',
      status: 'online',
      activity: 'Müzik dinliyor 🎵',
      inviteStatus: 'available',
    },
    {
      id: '2',
      name: 'Elif Kaya',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAm20tUaxHdCNzFIwwK1fnHs__RBY5DSIaKH8GsHANqZYcJc0RUSjSSDsYdm-iyA83_w0JdijnTNMX5r0KEMAxd9szQmy6fz22WXhZRr8nTBAxTInNK8dOW5DPZ5rOKT2Uw1_Qqo8dRrJTH7VnpTTq2-1gd86krf8abv7Aa-BqufL7xk8EWDZOQkfdBEumQUWq6PND3JdcYXUwp4MKS2rZTzrVsyU-qCdBdDTiMqPR7K8hhZZXnMAgpFs3LxwFWops7G6xoYOpvVcs',
      status: 'online',
      activity: 'Sohbette',
      inviteStatus: 'sent',
    },
    {
      id: '3',
      name: 'Can Bozok',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBLOIu4ZREV9ujj95TFUPzPEcxIStq2FZ6Lb5r1WCHbu7avM89pqxIqRXqPtaI7J1xK1lNkBpGr3oP8ks4ZeMVyUy6KpjkhBBTv4bacSJSsLio7uaRlCeLdrlKEgZaIh9WClJgGtkn8Fq7_L2rh69Jol6-6GGEMRTcXLlGP7SY-z2wy2OMOu9bgdtwMlaRsWlUYKC29O916rQUQOVuj82exNcmq8dVWnNXf9xDfTxay460GI6uAJTAlurcKT3Mg2l7YW1_6duj1VqA',
      status: 'online',
      activity: 'Online',
      inviteStatus: 'available',
    },
    {
      id: '4',
      name: 'Selin Demir',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD_tpYvP88rqVGuT4HCeex17EEziemmGnJiJ-Tk8h78mwPefUuoaWZTXEHFf1iAlqpn6kk7TLPEmB9hqH0qKgKBMV4n3EBre6rPwcuX2e8Y2sf4EQx0ZEcibOFxaSjjCsRdR1Dkhvy9BYiFG3X7-0PEwSAQ3P-14QG5zA4YDy9ehkFD1gKT2UcaOnYjXa-HU3zfU4ajZW0xHYsGBShmRC6i3YoI3gGWcKTTOgRsmKTGln5c8oEHL4id8dPor1fpPw1BX9EW98QPXIo',
      status: 'busy',
      activity: 'Meşgul',
      inviteStatus: 'disabled',
    },
    {
      id: '5',
      name: 'Mert Çelik',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA_cstIq-5SUu-ad9Y3voOtLpyR_DQB2YIoQ8eEifbvbpYyPtg2rIzLcOlXNqxdBGpvY3cXuPcsYTe3j1LokcCZAt1VrGKDsF6QTa_Cd1yfFapXvVqXLetTajYr4Egp9QPPdZbO8XeEKm1vy7mXEyf-tKZpF8bFoQbdv5_G9Ipa6RTCxljdEHFn_chQ5PEv8IdUrHgFm0IkrL7uK25URFMW-M4cjtpWRVAfrHkE5U34xUvBCnYBvf7FLFKX7-dEWrRg3i57pNP8FGA',
      status: 'online',
      activity: 'Oyun oynuyor 🎮',
      inviteStatus: 'available',
    },
    {
      id: '6',
      name: 'Zeynep Aslan',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBZ9ZqNes38_o931LFmpEJie4DE_BSvn9XjP_jNOlHBnyoeApLWVM_j5ijo48G7dfFsXSKC_t0BdTu74ycHFtR_4Cm2_axljBdwkkcDimFl0PX9oCemmqOdev2oBpGUd4EYhMBq07JmDcp_3X1TaXHNw0F0i47t3Fc4cquphVcevBk-QifIx1j-sgAuN6I5O4cKWeFuoOjaIgCk3ENSfT_n03ps6h44MvvmhVcyW82i7Tjtoic2jvXf0o05Tu7vsDJ4Be5QD5x0llI',
      status: 'online',
      activity: 'Online',
      inviteStatus: 'available',
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return '#10b981';
      case 'busy':
        return '#f59e0b';
      default:
        return '#6b7280';
    }
  };

  const handleInvite = async (friendId: string) => {
    if (!roomId) {
      Alert.alert('Hata', 'Oda bilgisi bulunamadı');
      return;
    }

    try {
      await inviteApi.sendInvite(roomId, friendId);
      Alert.alert('Başarılı', 'Davet gönderildi');
      // Update friend invite status
      setFriends((prev) =>
        prev.map((f) => (f.id === friendId ? {...f, invited: true} : f)),
      );
    } catch (error) {
      Alert.alert('Hata', error instanceof Error ? error.message : 'Davet gönderilemedi');
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={onBack}>
          <Icon name="arrow_back" style={styles.backIcon} />
        </Pressable>
        <Text style={styles.headerTitle}>Odaya Davet Et</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Scrollable Content */}
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Room Info Card */}
        <View style={styles.roomInfoCard}>
          <View style={styles.roomInfoLeft}>
            <Text style={styles.roomName}>{roomName}</Text>
            <View style={styles.roomMeta}>
              <View style={styles.roomMetaItem}>
                <Icon name="group" style={styles.roomMetaIcon} />
                <Text style={styles.roomMetaText}>5/8</Text>
              </View>
              <View style={styles.roomMetaDivider} />
              <View style={styles.roomMetaItem}>
                <Icon name="timer" style={styles.roomMetaIcon} />
                <Text style={styles.roomMetaText}>24:00</Text>
              </View>
            </View>
          </View>
          <View style={styles.roomIconContainer}>
            <Icon name="graphic_eq" style={styles.roomIcon} />
          </View>
        </View>

        {/* List Header */}
        <Text style={styles.listHeader}>Online Arkadaşlar</Text>

        {/* Friends List */}
        <View style={styles.friendsList}>
          {friends.map((friend) => (
            <View key={friend.id} style={styles.friendItem}>
              <View style={styles.friendLeft}>
                <View style={styles.avatarContainer}>
                  <Avatar uri={friend.avatar} name={friend.name} size={48} />
                  <View
                    style={[
                      styles.statusIndicator,
                      {backgroundColor: getStatusColor(friend.status)},
                    ]}
                  />
                </View>
                <View style={styles.friendInfo}>
                  <Text style={styles.friendName}>{friend.name}</Text>
                  <Text style={styles.friendActivity}>{friend.activity}</Text>
                </View>
              </View>
              <View style={styles.friendRight}>
                {friend.inviteStatus === 'available' && (
                  <Pressable
                    style={styles.inviteButton}
                    onPress={() => handleInvite(friend.id)}>
                    <Text style={styles.inviteButtonText}>Davet Et</Text>
                  </Pressable>
                )}
                {friend.inviteStatus === 'sent' && (
                  <View style={styles.sentButton}>
                    <Icon name="check" style={styles.sentIcon} />
                    <Text style={styles.sentText}>Gönderildi</Text>
                  </View>
                )}
                {friend.inviteStatus === 'disabled' && (
                  <Pressable style={styles.disabledButton} disabled>
                    <Text style={styles.disabledText}>Davet Edildi</Text>
                  </Pressable>
                )}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Sticky Bottom Button */}
      <View style={styles.bottomButtonContainer}>
        <Pressable style={styles.inviteAllButton} onPress={onInviteAll}>
          <Text style={styles.inviteAllText}>Tüm Arkadaşları Davet Et</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundDark,
    ...Platform.select({
      web: {
        minHeight: '100vh',
      },
    }),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingTop: spacing.xxl,
    paddingBottom: spacing.md,
    backgroundColor: `${colors.backgroundDark}F5`,
    ...Platform.select({
      web: {
        backdropFilter: 'blur(10px)',
        position: 'sticky',
        top: 0,
        zIndex: 50,
      },
    }),
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: -spacing.sm,
    borderRadius: radius.full,
  },
  backIcon: {
    fontSize: 24,
    color: '#fff',
  },
  headerTitle: {
    flex: 1,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: spacing.sm,
  },
  headerSpacer: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing.md,
    paddingBottom: 100,
  },
  roomInfoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.cardDark,
    borderRadius: radius.xl,
    padding: spacing.md,
    marginTop: spacing.sm,
    marginBottom: spacing.xl,
    borderWidth: 1,
    borderColor: `${colors.textSecondary}50`,
  },
  roomInfoLeft: {
    flex: 2,
    gap: spacing.sm,
  },
  roomName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  roomMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  roomMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs / 2,
  },
  roomMetaIcon: {
    fontSize: 18,
    color: colors.textSecondary,
  },
  roomMetaText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textSecondary,
  },
  roomMetaDivider: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.textSecondary,
  },
  roomIconContainer: {
    width: 64,
    height: 64,
    borderRadius: radius.xl,
    backgroundColor: 'rgba(99, 102, 241, 0.2)',
    ...Platform.select({
      web: {
        backgroundImage: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
      },
    }),
    alignItems: 'center',
    justifyContent: 'center',
  },
  roomIcon: {
    fontSize: 32,
    color: '#fff',
  },
  listHeader: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: spacing.md,
  },
  friendsList: {
    gap: spacing.xs,
  },
  friendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: `${colors.textSecondary}30`,
  },
  friendLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    flex: 1,
    minWidth: 0,
  },
  avatarContainer: {
    position: 'relative',
  },
  statusIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: colors.backgroundDark,
  },
  friendInfo: {
    flex: 1,
    minWidth: 0,
  },
  friendName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
  },
  friendActivity: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: spacing.xs / 2,
  },
  friendRight: {
    marginLeft: spacing.md,
  },
  inviteButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.xl,
  },
  inviteButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  sentButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs / 2,
    backgroundColor: `${colors.success}1A`,
    borderWidth: 1,
    borderColor: `${colors.success}33`,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: radius.xl,
  },
  sentIcon: {
    fontSize: 18,
    color: colors.success,
  },
  sentText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.success,
  },
  disabledButton: {
    backgroundColor: colors.cardDark,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: radius.xl,
    opacity: 0.6,
  },
  disabledText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textSecondary,
  },
  bottomButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: spacing.md,
    paddingTop: spacing.xl,
    ...Platform.select({
      web: {
        backgroundImage: 'linear-gradient(to top, #0F172A, transparent)',
      },
    }),
  },
  inviteAllButton: {
    width: '100%',
    height: 56,
    backgroundColor: colors.primary,
    borderRadius: radius.xl,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.primary,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  inviteAllText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 0.5,
  },
});

export default InviteScreen;
