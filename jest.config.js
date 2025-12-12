module.exports = {
  preset: 'react-native',
  testEnvironment: 'jsdom',
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|react-native-web|@react-navigation)/)',
  ],
  testPathIgnorePatterns: ['<rootDir>/backend/'],
};




