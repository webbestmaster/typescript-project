// eslint-disable-next-line unicorn/prefer-module
module.exports = {
    modulePathIgnorePatterns: ['<rootDir>/tsc-check/'],
    preset: 'ts-jest',
    rootDir: '../../',
    // setupFilesAfterEnv: ['./test-unit/config/setup-jest.ts'],
    // testEnvironment: 'jsdom', // @testing-library/jest-dom
    testTimeout: 10e3,
};
