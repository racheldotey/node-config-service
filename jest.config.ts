import type { Config } from 'jest';

// @see https://jestjs.io/docs/configuration
const config: Config = {
    verbose: true,
    coverageDirectory: 'coverage',
    errorOnDeprecated: true,
    transform: {
        '^.+\\.(ts|tsx)?$': 'ts-jest',
        "^.+\\.(js|jsx)$": "babel-jest",
    },
};


export default config;