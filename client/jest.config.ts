import type {Config} from '@jest/types';

// Sync object
const config: Config.InitialOptions = {
  verbose: true,
  reporters: [
    'default',
    ['jest-junit', {
      outputDirectory: 'reports/',
      outputName: 'jest-report.xml',
    }],
  ],
};
export default config;
