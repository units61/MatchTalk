import {create} from 'zustand';
import {agoraClient, RemoteUser} from '../services/agora/agoraClient';
import {IMicrophoneAudioTrack} from 'agora-rtc-sdk-ng';

interface AgoraState {
  // State
  isInitialized: boolean;
  isJoined: boolean;
  channelName: string | null;
  localAudioTrack: IMicrophoneAudioTrack | null;
  remoteUsers: RemoteUser[];
  isMuted: boolean;
  isPublishing: boolean;
  error: string | null;

  // Actions
  initialize: () => Promise<void>;
  joinChannel: (channelName: string, token?: string, uid?: number) => Promise<void>;
  leaveChannel: () => Promise<void>;
  toggleMute: () => void;
  publishAudio: () => Promise<void>;
  unpublishAudio: () => Promise<void>;
  setError: (error: string | null) => void;
  clearError: () => void;
}

export const useAgoraStore = create<AgoraState>((set, get) => ({
  // Initial state
  isInitialized: false,
  isJoined: false,
  channelName: null,
  localAudioTrack: null,
  remoteUsers: [],
  isMuted: false,
  isPublishing: false,
  error: null,

  // Initialize Agora client
  initialize: async () => {
    try {
      await agoraClient.initialize();
      set({isInitialized: true, error: null});

      // Setup event listeners
      agoraClient.on('user-joined', (user: RemoteUser) => {
        const currentUsers = get().remoteUsers;
        if (!currentUsers.find((u) => u.uid === user.uid)) {
          set({remoteUsers: [...currentUsers, user]});
        }
      });

      agoraClient.on('user-left', (data: {uid: number | string}) => {
        const currentUsers = get().remoteUsers;
        set({remoteUsers: currentUsers.filter((u) => u.uid !== data.uid)});
      });

      agoraClient.on('user-published', (data: {uid: number | string}) => {
        const remoteUsers = agoraClient.getRemoteUsers();
        set({remoteUsers});
      });

      agoraClient.on('user-unpublished', (data: {uid: number | string}) => {
        const remoteUsers = agoraClient.getRemoteUsers();
        set({remoteUsers});
      });

      agoraClient.on('error', (data: {error: Error}) => {
        set({error: data.error.message});
        console.error('Agora error:', data.error);
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to initialize Agora';
      set({error: errorMessage, isInitialized: false});
      throw error;
    }
  },

  // Join channel
  joinChannel: async (channelName: string, token?: string, uid?: number) => {
    try {
      const state = get();
      if (!state.isInitialized) {
        await state.initialize();
      }

      await agoraClient.joinChannel(channelName, token, uid);
      const localAudioTrack = agoraClient.getLocalAudioTrack();
      const remoteUsers = agoraClient.getRemoteUsers();

      set({
        isJoined: true,
        channelName,
        localAudioTrack,
        remoteUsers,
        isPublishing: true,
        isMuted: localAudioTrack?.muted || false,
        error: null,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to join channel';
      set({error: errorMessage, isJoined: false, channelName: null});
      throw error;
    }
  },

  // Leave channel
  leaveChannel: async () => {
    try {
      await agoraClient.leaveChannel();
      set({
        isJoined: false,
        channelName: null,
        localAudioTrack: null,
        remoteUsers: [],
        isPublishing: false,
        isMuted: false,
        error: null,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to leave channel';
      set({error: errorMessage});
      throw error;
    }
  },

  // Toggle mute
  toggleMute: () => {
    const state = get();
    if (!state.localAudioTrack) {
      return;
    }

    const newMutedState = !state.isMuted;
    agoraClient.muteLocalAudio(newMutedState);
    set({isMuted: newMutedState});
  },

  // Publish audio
  publishAudio: async () => {
    try {
      await agoraClient.publishAudio();
      set({isPublishing: true, error: null});
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to publish audio';
      set({error: errorMessage});
      throw error;
    }
  },

  // Unpublish audio
  unpublishAudio: async () => {
    try {
      await agoraClient.unpublishAudio();
      set({isPublishing: false, error: null});
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to unpublish audio';
      set({error: errorMessage});
      throw error;
    }
  },

  // Set error
  setError: (error: string | null) => {
    set({error});
  },

  // Clear error
  clearError: () => {
    set({error: null});
  },
}));





