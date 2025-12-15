import AgoraRTC, {
  IAgoraRTCClient,
  IMicrophoneAudioTrack,
  IRemoteAudioTrack,
  UID,
} from 'agora-rtc-sdk-ng';
import {config} from '../../lib/config';

export interface RemoteUser {
  uid: UID;
  audioTrack?: IRemoteAudioTrack;
  hasAudio: boolean;
  muted: boolean;
}

type AgoraEvent = 'user-joined' | 'user-left' | 'user-published' | 'user-unpublished' | 'error';

type EventCallback = (data: any) => void;

class AgoraClient {
  private client: IAgoraRTCClient | null = null;
  private localAudioTrack: IMicrophoneAudioTrack | null = null;
  private remoteUsers: Map<UID, RemoteUser> = new Map();
  private eventListeners: Map<AgoraEvent, Set<EventCallback>> = new Map();
  private isInitialized = false;
  private currentChannel: string | null = null;

  /**
   * Initialize Agora RTC client
   */
  async initialize(): Promise<void> {
    if (this.isInitialized && this.client) {
      return;
    }

    const appId = config.agora.appId;
    if (!appId) {
      throw new Error('Agora App ID is not configured. Please set REACT_APP_AGORA_APP_ID in your .env file');
    }

    // Create Agora client
    this.client = AgoraRTC.createClient({
      mode: 'rtc',
      codec: 'vp8',
    });

    // Setup event listeners
    this.setupEventListeners();

    this.isInitialized = true;
  }

  /**
   * Setup Agora client event listeners
   */
  private setupEventListeners(): void {
    if (!this.client) return;

    // User joined
    this.client.on('user-joined', (user) => {
      console.log('Agora: User joined', user.uid);
      const remoteUser: RemoteUser = {
        uid: user.uid,
        hasAudio: user.hasAudio,
        muted: false,
      };
      this.remoteUsers.set(user.uid, remoteUser);
      this.emit('user-joined', remoteUser);
    });

    // User left
    this.client.on('user-left', (user) => {
      console.log('Agora: User left', user.uid);
      this.remoteUsers.delete(user.uid);
      this.emit('user-left', {uid: user.uid});
    });

    // User published audio
    this.client.on('user-published', async (user, mediaType) => {
      console.log('Agora: User published', user.uid, mediaType);
      if (mediaType === 'audio') {
        try {
          await this.client!.subscribe(user, mediaType);
          const remoteUser = this.remoteUsers.get(user.uid);
          if (remoteUser) {
            remoteUser.audioTrack = user.audioTrack;
            remoteUser.hasAudio = true;
            remoteUser.muted = false;
            // Play the remote audio track
            user.audioTrack?.play();
            this.emit('user-published', {uid: user.uid, mediaType});
          }
        } catch (error) {
          console.error('Error subscribing to user audio:', error);
          this.emit('error', {error, uid: user.uid});
        }
      }
    });

    // User unpublished audio
    this.client.on('user-unpublished', (user, mediaType) => {
      console.log('Agora: User unpublished', user.uid, mediaType);
      if (mediaType === 'audio') {
        const remoteUser = this.remoteUsers.get(user.uid);
        if (remoteUser) {
          remoteUser.audioTrack = undefined;
          remoteUser.hasAudio = false;
          this.emit('user-unpublished', {uid: user.uid, mediaType});
        }
      }
    });

    // Connection state change
    this.client.on('connection-state-change', (curState, revState) => {
      console.log('Agora: Connection state changed', curState, revState);
      if (curState === 'DISCONNECTED' || curState === 'FAILED') {
        this.emit('error', {error: new Error(`Connection ${curState}`)});
      }
    });
  }

  /**
   * Join a channel
   */
  async joinChannel(channelName: string, token?: string, uid?: UID): Promise<void> {
    if (!this.isInitialized || !this.client) {
      await this.initialize();
    }

    if (!this.client) {
      throw new Error('Agora client not initialized');
    }

    // Leave current channel if joined
    if (this.currentChannel && this.currentChannel !== channelName) {
      await this.leaveChannel();
    }

    // Create local audio track
    try {
      this.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
      console.log('Agora: Local audio track created');
    } catch (error) {
      console.error('Error creating microphone track:', error);
      throw new Error('Failed to access microphone. Please check permissions.');
    }

    // Join channel
    try {
      const appId = config.agora.appId;
      await this.client.join(appId, channelName, token || null, uid || null);
      this.currentChannel = channelName;
      console.log('Agora: Joined channel', channelName);

      // Publish local audio track
      if (this.localAudioTrack) {
        await this.client.publish([this.localAudioTrack]);
        console.log('Agora: Published local audio track');
      }
    } catch (error) {
      console.error('Error joining channel:', error);
      // Cleanup local track on error
      if (this.localAudioTrack) {
        this.localAudioTrack.close();
        this.localAudioTrack = null;
      }
      throw error;
    }
  }

  /**
   * Leave current channel
   */
  async leaveChannel(): Promise<void> {
    if (!this.client) {
      return;
    }

    try {
      // Unpublish local audio track
      if (this.localAudioTrack) {
        await this.client.unpublish([this.localAudioTrack]);
        this.localAudioTrack.close();
        this.localAudioTrack = null;
      }

      // Leave channel
      await this.client.leave();
      this.currentChannel = null;
      this.remoteUsers.clear();
      console.log('Agora: Left channel');
    } catch (error) {
      console.error('Error leaving channel:', error);
      throw error;
    }
  }

  /**
   * Publish local audio track
   */
  async publishAudio(): Promise<void> {
    if (!this.client || !this.localAudioTrack) {
      throw new Error('Not in a channel or no local audio track');
    }

    try {
      await this.client.publish([this.localAudioTrack]);
      console.log('Agora: Published audio');
    } catch (error) {
      console.error('Error publishing audio:', error);
      throw error;
    }
  }

  /**
   * Unpublish local audio track
   */
  async unpublishAudio(): Promise<void> {
    if (!this.client || !this.localAudioTrack) {
      return;
    }

    try {
      await this.client.unpublish([this.localAudioTrack]);
      console.log('Agora: Unpublished audio');
    } catch (error) {
      console.error('Error unpublishing audio:', error);
      throw error;
    }
  }

  /**
   * Mute or unmute local audio
   */
  muteLocalAudio(muted: boolean): void {
    if (!this.localAudioTrack) {
      return;
    }

    try {
      if (muted) {
        this.localAudioTrack.setMuted(true);
        console.log('Agora: Local audio muted');
      } else {
        this.localAudioTrack.setMuted(false);
        console.log('Agora: Local audio unmuted');
      }
    } catch (error) {
      console.error('Error muting/unmuting audio:', error);
      throw error;
    }
  }

  /**
   * Get remote users
   */
  getRemoteUsers(): RemoteUser[] {
    return Array.from(this.remoteUsers.values());
  }

  /**
   * Get local audio track
   */
  getLocalAudioTrack(): IMicrophoneAudioTrack | null {
    return this.localAudioTrack;
  }

  /**
   * Check if joined to a channel
   */
  isJoined(): boolean {
    return this.currentChannel !== null && this.client?.connectionState === 'CONNECTED';
  }

  /**
   * Get current channel name
   */
  getCurrentChannel(): string | null {
    return this.currentChannel;
  }

  /**
   * Subscribe to events
   */
  on(event: AgoraEvent, callback: EventCallback): void {
    if (!this.eventListeners.has(event)) {
      this.eventListeners.set(event, new Set());
    }
    this.eventListeners.get(event)!.add(callback);
  }

  /**
   * Unsubscribe from events
   */
  off(event: AgoraEvent, callback?: EventCallback): void {
    if (!this.eventListeners.has(event)) {
      return;
    }

    if (callback) {
      this.eventListeners.get(event)!.delete(callback);
    } else {
      this.eventListeners.get(event)!.clear();
    }
  }

  /**
   * Emit event to listeners
   */
  private emit(event: AgoraEvent, data: any): void {
    const listeners = this.eventListeners.get(event);
    if (listeners) {
      listeners.forEach((callback) => {
        try {
          callback(data);
        } catch (error) {
          console.error(`Error in ${event} listener:`, error);
        }
      });
    }
  }

  /**
   * Cleanup and destroy client
   */
  async destroy(): Promise<void> {
    try {
      await this.leaveChannel();
      if (this.client) {
        this.client.removeAllListeners();
        this.client = null;
      }
      this.remoteUsers.clear();
      this.eventListeners.clear();
      this.isInitialized = false;
      console.log('Agora: Client destroyed');
    } catch (error) {
      console.error('Error destroying Agora client:', error);
      throw error;
    }
  }
}

export const agoraClient = new AgoraClient();





