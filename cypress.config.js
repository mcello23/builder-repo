const { defineConfig } = require('cypress');
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
const { addCucumberPreprocessorPlugin } = require('@badeball/cypress-cucumber-preprocessor');
const { createEsbuildPlugin } = require('@badeball/cypress-cucumber-preprocessor/esbuild');

module.exports = defineConfig({
  viewportHeight: 1280,
  viewportWidth: 1440,
  defaultCommandTimeout: 5000,
  projectId: '59p94m',
  retries: {
    experimentalStrategy: 'detect-flake-and-pass-on-threshold',
    experimentalOptions: {
      maxRetries: 3,
      passesRequired: 1,
    },
    runMode: true,
    openMode: true,
  },
  screenshotOnRunFailure: true,
  screenshotsFolder: 'cypress/screenshots',
  video: true,
  videosFolder: 'cypress/videos',
  waitForAnimations: true,
  chromeWebSecurity: false,
  failOnStatusCode: false,
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/reports',
    reportPageTitle: 'Builder - E2E Tests Report',
    charts: true,
    embeddedScreenshots: true,
    inlineAssets: false,
    saveAllAttempts: true,
    ignoreVideos: false,
    videoOnFailOnly: false,
    saveJson: true,
    keepJson: true,
    code: false,
    overwrite: true,
    html: true,
    autoOpen: false,
    debug: false,
  },
  numTestsKeptInMemory: 10,
  experimentalMemoryManagement: true,
  e2e: {
    baseUrl: 'https://builder.identity-platform.net/en',
    trashAssetsBeforeRuns: false,
    savedState: {
      whitelist: ['showedOnBoardingModal'],
    },
    experimentalStudio: true,
    experimentalRunAllSpecs: true,
    specPattern: ['cypress/e2e/cucumber/**/*.feature'],
    excludeSpecPattern: ['**/*.skip.feature'],
    async setupNodeEvents(on, config) {
      await addCucumberPreprocessorPlugin(on, config);
      on(
        'file:preprocessor',
        createBundler({
          plugins: [createEsbuildPlugin(config)],
          define: { global: 'window' },
          platform: 'browser',
        }),
      );

      require('cypress-high-resolution')(on, config);
      require('cypress-mochawesome-reporter/plugin')(on);

      return config;
    },
    env: {
      tags: 'not @skip and (@smoke or @e2e or @focus)',
      USER_ID_USER: '8e0966d3-9f0e-4e4f-b784-9bfc802079df',
      USER_ID_OWNER: '76125ce0-34d8-4d09-80db-415062eadaf2',
    },
  },
});
