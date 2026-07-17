// Jest config for a modern (zoneless) Angular workspace.
// jest-preset-angular compiles components/templates with the Angular compiler
// and runs everything headless in jsdom — no browser, no Karma, no docker.
const { createCjsPreset } = require('jest-preset-angular/presets');

/** @type {import('jest').Config} */
module.exports = {
  ...createCjsPreset({ tsconfig: '<rootDir>/tsconfig.spec.json' }),
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  // Watchman is optional and unavailable in many containers and CI environments.
  watchman: false,
};
