module.exports = {
  roots: ['<rootDir>', '<rootDir>/src'],
  modulePaths: ['<rootDir>', '<rootDir>/src'],
  testURL: 'http://localhost/',
  testEnvironment: 'jsdom',
  transform: {
    '\\.(ts|tsx|js|jsx)$': 'ts-jest',
  },
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/.erb/mocks/fileMock.js',
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
  },
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json'],
  moduleDirectories: ['node_modules', 'release/app/node_modules'],
  testPathIgnorePatterns: ['release/app/dist', '.fttemplates'],
  setupFiles: ['./.erb/scripts/check-build-exists.ts'],
};
