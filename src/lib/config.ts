/**
 * Centralized configuration management
 * Reads environment variables with fallback defaults
 */

const getEnvVar = (key: string, defaultValue?: string): string => {
  if (typeof process !== 'undefined' && process.env) {
    return process.env[key] || defaultValue || '';
  }
  return defaultValue || '';
};

export const config = {
  // API Configuration
  api: {
    baseUrl: getEnvVar('REACT_APP_API_BASE_URL', 'http://localhost:4000'),
    wsBaseUrl: getEnvVar('REACT_APP_WS_BASE_URL', 'http://localhost:4000'),
  },

  // Agora WebRTC Configuration
  agora: {
    appId: getEnvVar('REACT_APP_AGORA_APP_ID', ''),
    appCertificate: getEnvVar('REACT_APP_AGORA_APP_CERTIFICATE', ''),
  },

  // JWT (development only)
  jwt: {
    secret: getEnvVar('REACT_APP_JWT_SECRET', ''),
  },
} as const;

export default config;


