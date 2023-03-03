import type { Config } from 'jest';

// @see https://jestjs.io/docs/configuration
const config: Config = {
    verbose: true,
    coverageDirectory: 'coverage',
    errorOnDeprecated: true,
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
};


export default config;