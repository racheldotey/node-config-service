import type { Config } from '@jest/types';

// @see https://jestjs.io/docs/configuration
const config: Config.InitialOptions = {
    verbose: true,
    coverageDirectory: 'coverage',
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
};


export default config;