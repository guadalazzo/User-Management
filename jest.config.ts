import type { Config } from 'jest';

const config: Config = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
    '^.+\\.tsx?$': 'ts-jest', // Add this line to handle TypeScript files
    '^.+\\.scss$': 'jest-css-modules-transform',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '\\.(css|scss)$': '<rootDir>/src/tests/_mocks_/stylemocks.ts',
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};

export default config;
