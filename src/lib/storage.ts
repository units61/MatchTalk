/**
 * Basit depolama yardımcıları.
 * Web'de localStorage kullanır; RN ortamında AsyncStorage geçirilmişse opsiyonel olarak enjekte edilebilir.
 */
class Storage {
  async setItem(key: string, value: string) {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(key, value);
      return;
    }
  }

  async getItem(key: string): Promise<string | null> {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem(key);
    }
    return null;
  }

  async removeItem(key: string) {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(key);
    }
  }
}

export const storage = new Storage();

