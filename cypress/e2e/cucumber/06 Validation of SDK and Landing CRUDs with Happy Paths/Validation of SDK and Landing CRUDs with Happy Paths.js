/// <reference types="cypress" />
import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';
import { faker } from '@faker-js/faker';

let randomTitle = faker.lorem.words(2);
let randomName = faker.lorem.words(1);

When('I connect the Landing', function () {
  cy.intercept('POST', '**/v1/graphql', (req) => {
    if (req.body.operationName === 'addModules') {
      expect(req.body).to.have.property('operationName', 'addModules');
    }
  }).as('addModules');
  cy.get(
    ':nth-child(2) > .UI--c-dhzjXW-ibgoPhL-css > .UI--c-dhzjXW-idYyByh-css > .UI--c-dhzjXW-ijOdKzf-css > [data-test="collapsable-button"]',
  ).click();
  cy.get('[data-test="input-container"]').eq(0).click();
  cy.contains('button', 'demo').click();
  cy.get('[data-test="test-tenant-json-schema"]').eq(0).click();
  cy.contains('button', 'demo').click();
  cy.get('button').contains('Save').click();
  this.steps.push('  When I connect the Landing');
});

When('I configure the Landing URL', function () {
  cy.intercept('POST', '**/v1/graphql', (req) => {
    if (req.body.operationName === 'createLanding') {
      expect(req.body).to.have.property('operationName', 'createLanding');
    }
  }).as('createLanding');
  cy.intercept('POST', '**/v1/graphql', (req) => {
    if (req.body.operationName === 'addConfigToLanding') {
      expect(req.body).to.have.property('operationName', 'addConfigToLanding');
    }
  }).as('addConfigToLanding');
  cy.get('[data-test="input-title"]').type(randomTitle);
  cy.get('[data-test="input-name"]').type(randomName);
  cy.get('[data-test="button-apikey"]').click();
  cy.wait(1000);
  cy.get('[data-test="test-save-button"]').click();
  this.steps.push('  When I configure the Landing URL');
});

Then('I validate via UI and API the configuration was successfully saved', function () {
  cy.wait('@createLanding');
  cy.wait('@addConfigToLanding');
  cy.get('[data-test="toast-message"]').should('be.visible');
  cy.contains('Configuration associated').should('be.visible');
  this.steps.push('  Then I validate via UI and API the configuration was successfully saved');
});

When('I create a SDK flow', function () {
  cy.createSDKTemplate();
  this.steps.push('  When I create a SDK flow');
});

When('I customize the colors of the SDK', function () {
  cy.intercept('POST', '**/v1/graphql', (req) => {
    if (req.body.operationName === 'createSDKMobileTheme') {
      expect(req.body).to.have.property('operationName', 'createSDKMobileTheme');
    }
  }).as('createSDKMobileTheme');
  cy.intercept('POST', '**/v1/graphql', (req) => {
    if (req.body.operationName === 'addThemeToSDKMobile') {
      expect(req.body).to.have.property('operationName', 'addThemeToSDKMobile');
    }
  }).as('addThemeToSDKMobile');
  cy.get('[data-test="main colors-collapsable"] [data-test="collapsable-button"]').click();
  cy.get('[data-test="primaryColor"] [data-test="input-container"] [data-test="input-remove-value"]').click();
  cy.get('[data-test="primaryColor"] [data-test="input-container"] [data-test="color-picker-input"]').type('#d00f0f');
  cy.get('[data-test="primaryColor"] [data-test="color-picker-box"]').click();
  cy.get('[data-test="backgroundColor"] [data-test="input-container"] [data-test="input-remove-value"]').click();
  cy.get('[data-test="backgroundColor"] [data-test="input-container"] [data-test="color-picker-input"]').type(
    '#f3f4f5',
  );
  cy.get('[data-test="backgroundColor"] [data-test="color-picker-box"]').click();
  cy.get('[data-test="submit-customize"]').click();
  cy.get('[data-test="toast-message"]').should('be.visible');
  this.steps.push('  When I customize the colors of the SDK');
});

Then('I validate via UI and API the SDK customization was successfully saved', function () {
  cy.contains('Theme associated');
  cy.wait('@createSDKMobileTheme').its('response.statusCode').should('eq', 200);
  cy.wait('@addThemeToSDKMobile').its('response.statusCode').should('eq', 200);
  this.steps.push('  Then I validate via UI and API the SDK customization was successfully saved');
});

When('I connect the SDK', function () {
  cy.intercept('POST', '**/v1/graphql', (req) => {
    if (req.body.operationName === 'requestLicense') {
      expect(req.body).to.have.property('operationName', 'requestLicense');
    }
  }).as('requestLicense');
  cy.intercept('POST', '**/v1/graphql', (req) => {
    if (req.body.operationName === 'updateSdkMobileConfiguration') {
      expect(req.body).to.have.property('operationName', 'updateSdkMobileConfiguration');
    }
  }).as('updateSdkMobileConfiguration');
  cy.intercept('POST', '**/v1/graphql', (req) => {
    if (req.body.operationName === 'updateSdkMobile') {
      expect(req.body).to.have.property('operationName', 'updateSdkMobile');
    }
  }).as('updateSdkMobile');
  cy.get('[data-test="input-name"]').type(randomName);
  cy.get('[data-test="button-apikey"]').click();
  cy.wait(650);
  cy.get('[data-test="test-save-button"]').click();
  this.steps.push('  When I connect the SDK');
});

Then('I validate via UI and API the SDK connection was successfully saved', function () {
  cy.wait('@requestLicense');
  cy.wait('@updateSdkMobileConfiguration');
  cy.wait('@updateSdkMobile');
  cy.get('[data-test="toast-message"]').should('be.visible');
  cy.contains('Configuration updated').should('be.visible');
  this.steps.push('  Then I validate via UI and API the SDK connection was successfully saved');
});

Given('I login to Builder with four SDKs with different status created via API', function () {
  cy.api_createFourSDKs_AllStatus();
  cy.login('user');
  this.steps.push('Given I login to Builder with four SDKs with different status created via API');
});

When('I am at the SDKs homepage', function () {
  cy.intercept('POST', '**/v1/graphql', (req) => {
    if (req.body.operationName === 'getSdksMobile') {
      req.reply((res) => {
        const expectedSDKs = [
          { name: 'banco-test', status: 'draft' },
          { name: 'banco-test2', status: 'license_pending' },
          { name: 'banco-test3', status: 'published' },
          { name: 'banco-test4', status: 'to_be_published' },
        ];
        const sdkStatuses = res.body.data.mobile_sdks.map((sdk) => ({
          name: sdk.name,
          status: sdk.status,
        }));
        expectedSDKs.forEach((expectedSdk) => {
          const sdk = sdkStatuses.find((s) => s.name === expectedSdk.name);
          expect(sdk).to.exist;
          expect(sdk.status).to.equal(expectedSdk.status);
        });
      });
    }
  }).as('getMobileSDKs');
  cy.get('[data-test="SDK-Mobile"]').click();
  this.steps.push('  When I am at the SDKs homepage');
});

Then('I validate via UI and API the SDK statuses are correctly shown', function () {
  cy.wait('@getMobileSDKs').then(() => {
    cy.contains('Draft').should('be.visible');
    cy.contains('License pending').should('be.visible');
    cy.contains('Published').should('be.visible');
    cy.contains('To be published').should('be.visible');
  });
  this.steps.push('  Then I validate via UI and API the SDK statuses are correctly shown');
});

Given('I login to Builder with four Landing with different status created via API', function () {
  cy.api_createFourLandings_AllStatus();
  cy.login('user');
  this.steps.push('Given I login to Builder with four Landing with different status created via API');
});

When('I am at the SDKs homepage', function () {
  cy.intercept('POST', '**/v1/graphql', (req) => {
    if (req.body.operationName === 'getSdksMobile') {
      req.reply((res) => {
        const expectedSDKs = [
          { name: 'banco-test', status: 'draft' },
          { name: 'banco-test2', status: 'license_pending' },
          { name: 'banco-test3', status: 'published' },
          { name: 'banco-test4', status: 'to_be_published' },
        ];
        const sdkStatuses = res.body.data.mobile_sdks.map((sdk) => ({
          name: sdk.name,
          status: sdk.status,
        }));
        expectedSDKs.forEach((expectedSdk) => {
          const sdk = sdkStatuses.find((s) => s.name === expectedSdk.name);
          expect(sdk).to.exist;
          expect(sdk.status).to.equal(expectedSdk.status);
        });
      });
    }
  }).as('getMobileSDKs');
  cy.get('[data-test="SDK-Mobile"]').click();
  this.steps.push('  When I am at the SDKs homepage');
});

Then('I validate via UI and API the Landing statuses are correctly shown', function () {
  cy.intercept('POST', '**/v1/graphql', (req) => {
    if (req.body.operationName === 'getLandings') {
      req.reply((res) => {
        const expectedLandings = [
          { name: 'banco-test', status: 'draft' },
          { name: 'banco-test2', status: 'license_pending' },
          { name: 'banco-test3', status: 'published' },
          { name: 'banco-test4', status: 'to_be_published' },
        ];
        const landingStatuses = res.body.data.landings.map((landing) => ({
          name: landing.name,
          status: landing.status,
        }));
        expectedLandings.forEach((expectedLanding) => {
          const landing = landingStatuses.find((l) => l.name === expectedLanding.name);
          expect(landing).to.exist;
          expect(landing.status).to.equal(expectedLanding.status);
        });
      });
    }
  }).as('getLandings');

  cy.wait('@getLandings').then(() => {
    cy.contains('Draft').should('be.visible');
    cy.contains('License pending').should('be.visible');
    cy.contains('Published').should('be.visible');
    cy.contains('To be published').should('be.visible');
  });
  this.steps.push('  Then I validate via UI and API the Landing statuses are correctly shown');
});

Given('I login to Builder creating SDK with Enable Tracking and Automatic properties via API', function () {
  cy.intercept('POST', '**/v1/graphql', (req) => {
    if (req.body.operationName === 'getMobileSDKs') {
      req.reply((res) => {
        const expectedSDKs = [
          {
            name: 'banco-test',
            automatic: true,
            enableTracking: true,
          },
        ];
        const sdkStatuses = res.body.data.mobile_sdks.map((sdk) => ({
          name: sdk.name,
          status: sdk.status,
          automatic: sdk.configuration.automatic,
          enableTracking: sdk.configuration.enableTracking,
        }));
        expectedSDKs.forEach((expectedSdk) => {
          const sdk = sdkStatuses.find((s) => s.name === expectedSdk.name);
          expect(sdk).to.exist;
          expect(sdk.automatic).to.equal(expectedSdk.automatic);
          expect(sdk.enableTracking).to.equal(expectedSdk.enableTracking);
        });
      });
    }
  }).as('getMobileSDKs');
  cy.api_createSDK_EnableTracking_Automatic();
  cy.login('user');
  cy.get('[data-test="SDK-Mobile"]').click();
  this.steps.push('Given I login to Builder creating SDK with Enable Tracking and Automatic properties via API');
});

Then('I validate via UI and API the Tracking and Automatic SDKs properties are correctly saved', function () {
  cy.wait('@getMobileSDKs').then(() => {
    cy.contains('Published').should('be.visible');
  });
  this.steps.push('  Then I validate via UI and API the Tracking and Automatic SDKs properties are correctly saved');
});
