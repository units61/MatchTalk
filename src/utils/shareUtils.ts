/**
 * Utility functions for sharing room links and deep linking
 */

/**
 * Get the current base URL (for building share links)
 */
const getBaseUrl = (): string => {
  if (typeof window !== 'undefined') {
    return `${window.location.protocol}//${window.location.host}`;
  }
  return '';
};

/**
 * Generate a shareable room link
 */
export const getRoomShareLink = (roomId: string): string => {
  const baseUrl = getBaseUrl();
  return `${baseUrl}/room/${roomId}`;
};

/**
 * Generate an invite link
 */
export const getInviteLink = (roomId: string): string => {
  const baseUrl = getBaseUrl();
  return `${baseUrl}/invite/${roomId}`;
};

/**
 * Copy text to clipboard
 */
const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      document.body.appendChild(textArea);
      textArea.select();
      const success = document.execCommand('copy');
      document.body.removeChild(textArea);
      return success;
    }
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    return false;
  }
};

/**
 * Share room link using Web Share API or fallback to clipboard
 */
export const shareRoomLink = async (roomId: string, roomName?: string): Promise<boolean> => {
  const link = getRoomShareLink(roomId);
  const text = roomName ? `Join "${roomName}" on MatchTalk: ${link}` : `Join this room on MatchTalk: ${link}`;

  // Try Web Share API first (if available)
  if (navigator.share) {
    try {
      await navigator.share({
        title: roomName || 'MatchTalk Room',
        text: text,
        url: link,
      });
      return true;
    } catch (error: any) {
      // User cancelled or error occurred, fallback to clipboard
      if (error.name !== 'AbortError') {
        console.error('Web Share API error:', error);
      }
    }
  }

  // Fallback to clipboard
  return await copyToClipboard(link);
};

/**
 * Share invite link
 */
export const shareInviteLink = async (roomId: string, roomName?: string): Promise<boolean> => {
  const link = getInviteLink(roomId);
  const text = roomName
    ? `You're invited to join "${roomName}" on MatchTalk: ${link}`
    : `You're invited to join this room on MatchTalk: ${link}`;

  // Try Web Share API first
  if (navigator.share) {
    try {
      await navigator.share({
        title: roomName ? `Invitation: ${roomName}` : 'MatchTalk Invitation',
        text: text,
        url: link,
      });
      return true;
    } catch (error: any) {
      if (error.name !== 'AbortError') {
        console.error('Web Share API error:', error);
      }
    }
  }

  // Fallback to clipboard
  return await copyToClipboard(link);
};




