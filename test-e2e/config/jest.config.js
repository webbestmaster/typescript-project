// eslint-disable-next-line unicorn/prefer-module
module.exports = {
    bail: true, // stop after first failing test
    errorOnDeprecated: true,
    injectGlobals: true,
    // setupFilesAfterEnv: ['./test-unit/config/setup-jest.ts'],
    // testEnvironment: 'jsdom', // @testing-library/jest-dom
    modulePathIgnorePatterns: ['<rootDir>/tsc-check/'],
    passWithNoTests: true,
    preset: 'ts-jest',
    rootDir: '../../',
    silent: true,
    testTimeout: 10e3,
};
