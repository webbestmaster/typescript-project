### Autotests

#### End-to-End test: jest + puppeteer

Required libraries:
1. jest
2. ts-jest
3. @types/jest

4. puppeteer
5. @types/puppeteer

Running example:
```bash
$ jest ./test-e2e/ [--runInBand]
```

`--runInBand` - run tests sequentially


#### Unit test: jest + react-*

Required libraries:
1. jest
2. ts-jest
3. @types/jest

4. @testing-library/react
5. @testing-library/jest-dom

6*. use https://mswjs.io/ to make http request

7*. use https://github.com/testing-library/react-hooks-testing-library to test react hooks

Jest config `./jest.config.js`
```javascript
// eslint-disable-next-line unicorn/prefer-module
module.exports = {
    globals: {
        'ts-jest': {
            tsconfig: './tsconfig.test.json',
        },
    },
    modulePathIgnorePatterns: ['<rootDir>/tsc-check/'],
    preset: 'ts-jest',
    setupFilesAfterEnv: ['./test-unit/setup-jest.ts'],
    testEnvironment: 'jsdom', // @testing-library/jest-dom
    testTimeout: 10e3,
};
```

Running example:
```bash
$ jest ./test-unit/ --coverage
```
