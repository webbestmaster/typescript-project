// eslint-disable-next-line unicorn/prefer-module
module.exports = {
    preset: 'ts-jest',
    modulePathIgnorePatterns: ['<rootDir>/tsc-check/'],
    globals: {
        'ts-jest': {
            tsconfig: './tsconfig.test.json',
        },
    },
    testEnvironment: 'jsdom', // @testing-library/jest-dom
    setupFilesAfterEnv: ['./test-unit/setup-jest.ts'],
    testTimeout: 10e3,
};
