import type {Config} from '@jest/types';

// Sync object
const config: Config.InitialOptions = {
  verbose: true,
  passWithNoTests: true,
  testPathIgnorePatterns: [
    '<rootDir>/build/',
    '<rootDir>/node_modules',
    '<rootDir>/infra',
  ],
  reporters: [
    'default',
    ['jest-junit', {
      outputDirectory: 'reports/',
      outputName: 'jest-report.xml',
    }],
  ],
};
export default config;
