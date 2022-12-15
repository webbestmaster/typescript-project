// eslint-disable-next-line unicorn/prefer-module
module.exports = {
    bail: true, // stop after first failing test
    collectCoverage: true,
    errorOnDeprecated: true,
    injectGlobals: true,
    moduleNameMapper: {
        '^\\S+.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
    },
    modulePathIgnorePatterns: ['<rootDir>/tsc-check/'],
    passWithNoTests: true,
    preset: 'ts-jest',
    rootDir: '../../',
    setupFilesAfterEnv: ['./test-unit/config/setup-jest.ts'],
    silent: true,
    testEnvironment: 'jsdom', // @testing-library/jest-dom
    testTimeout: 10e3,
};
