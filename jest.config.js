module.exports = {
  collectCoverage: true,
  clearMocks: true,
  coverageDirectory: 'coverage',
  testPathIgnorePatterns: ['/node_modules/'],
  collectCoverageFrom: [
    'server/**/*.js',
    '!__tests__/**/*.js?(x)',
    '!**/node_modules/**',
  ],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
  coveragePathIgnorePatterns: ['<rootDir>/server/db/index.js'],
  testEnvironment: 'node',
};
