/* eslint-disable */
/// <reference types="cypress" />
import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';

Given('I login to Builder creating a SDK flow', function () {
  cy.login('user');
  cy.createSDKwithWidgets();
  this.steps.push('Given I login to Builder creating a SDK flow');
});

Then('I see SDK colors, button roundness and dark themes options, validating UI and API calls', function () {
  cy.intercept('POST', '**/v1/graphql', (req) => {
    const { body } = req;
    if (body?.operationName === 'getSDKMobileTheme') {
      expect(body).to.have.property('operationName', 'getSDKMobileTheme');
    }
  }).as('getSDKMobileTheme');

  cy.intercept('POST', '**/v1/graphql', (req) => {
    const { body } = req;
    if (body?.operationName === 'getSdksMobileByPk') {
      expect(body).to.have.property('operationName', 'getSdksMobileByPk');
    }
  }).as('getSdksMobileByPk');

  cy.get('[data-test="main colors-collapsable"] [data-test="collapsable-button"]').click();
  cy.get('[data-test="primaryColor"]').should('be.visible');
  cy.get('[data-test="secondaryColor"]').should('be.visible');
  cy.get('[data-test="backgroundColor"]').should('be.visible');
  cy.get('[data-test="neutralColor"]').should('be.visible');
  cy.get('[data-test="accentColor"]').should('be.visible');

  cy.get('[data-test="status colors-collapsable"] [data-test="collapsable-button"]').click();
  cy.get('[data-test="errorColor"]').should('be.visible');
  cy.get('[data-test="successColor"]').should('be.visible');

  cy.get('[data-test="text colors-collapsable"] [data-test="collapsable-button"]').click();
  cy.get('[data-test="titleTextColor"]').should('be.visible');
  cy.get('[data-test="bodyTextColor"]').should('be.visible');

  cy.get('[data-test="icons colors-collapsable"] [data-test="collapsable-button"]').click();
  cy.get('[data-test="topIconsColor"]').should('be.visible');

  cy.get('[data-test="button-collapsable"] [data-test="collapsable-button"]').click();
  cy.get('[data-test="roundedCornerShape"]').should('be.visible');
  cy.get('[data-test="switch-theme-mode"]').should('be.visible');

  cy.wait('@getSDKMobileTheme').its('response.statusCode').should('eq', 200);
  cy.wait('@getSdksMobileByPk').its('response.statusCode').should('eq', 200);

  this.steps.push('  Then I see SDK colors, button roundness and dark themes options, validating UI and API calls');
});

When('I set button roundness to "10"', function () {
  cy.get('[data-test="button-collapsable"] [data-test="collapsable-button"]').click();
  cy.get('[data-test="roundedCornerShape"]').clear().type('10');
  this.steps.push('  When I set button roundness to "10"');
});

Then('I see the roundness previewed on the right side of the screen', function () {
  cy.get('rect[data-test="button"]').should('have.attr', 'rx', '10');
  this.steps.push('  Then I see the roundness previewed on the right side of the screen');
});

When('I turn on dark theme mode', function () {
  cy.get('[data-test="switch-theme-mode"]').click();
  this.steps.push('  When I turn on dark theme mode');
});

Then('I see the dark theme mode was applied', function () {
  cy.get('[data-test="theme-dark"]').should('be.visible');
  this.steps.push('  Then I see the dark theme mode was applied');
});

When('I customize some colors', function () {
  cy.intercept('POST', '**/v1/graphql', (req) => {
    const { body } = req;
    if (body?.operationName === 'createSDKMobileTheme') {
      expect(body).to.have.property('operationName', 'createSDKMobileTheme');
    }
  }).as('createSDKMobileTheme');

  cy.intercept('POST', '**/v1/graphql', (req) => {
    const { body } = req;
    if (body?.operationName === 'addThemeToSDKMobile') {
      expect(body).to.have.property('operationName', 'addThemeToSDKMobile');
    }
  }).as('addThemeToSDKMobile');

  cy.get('[data-test="main colors-collapsable"] [data-test="collapsable-button"]').click();

  cy.get('[data-test="primaryColor"] [data-test="input-container"] [data-test="input-remove-value"]').click();
  cy.get('[data-test="primaryColor"] [data-test="input-container"] [data-test="color-picker-input"]')
    .clear()
    .type('#d00f0f');
  cy.get('[data-test="primaryColor"] [data-test="color-picker-box"]').click();

  cy.get('[data-test="backgroundColor"] [data-test="input-container"] [data-test="input-remove-value"]').click();
  cy.get('[data-test="backgroundColor"] [data-test="input-container"] [data-test="color-picker-input"]')
    .clear()
    .type('#f3f4f5');
  cy.get('[data-test="backgroundColor"] [data-test="color-picker-box"]').click();

  this.steps.push('  When I customize some colors');
});

Then('I see them reflected on the right side of the screen', function () {
  cy.get('rect[data-test="button"]').should('have.attr', 'fill', '#d00f0f');
  cy.get('[data-test="success-case"]').should('have.attr', 'fill', '#f3f4f5');
  this.steps.push('  Then I see them reflected on the right side of the screen');
});

When('I save the changes validating through UI and API', function () {
  cy.intercept('POST', '**/v1/graphql', (req) => {
    const { body } = req;
    if (body?.operationName === 'createSDKMobileTheme') {
      expect(body).to.have.property('operationName', 'createSDKMobileTheme');
    }
  }).as('createSDKMobileTheme');

  cy.intercept('POST', '**/v1/graphql', (req) => {
    const { body } = req;
    if (body?.operationName === 'addThemeToSDKMobile') {
      expect(body).to.have.property('operationName', 'addThemeToSDKMobile');
    }
  }).as('addThemeToSDKMobile');
  cy.get('[data-test="submit-customize"]').click();
  cy.get('[data-test="toast-message"]').should('be.visible');
  cy.contains('Theme associated');
  cy.wait('@createSDKMobileTheme').its('response.statusCode').should('eq', 200);
  cy.wait('@addThemeToSDKMobile').its('response.statusCode').should('eq', 200);
  this.steps.push('  When I save the changes validating through UI and API');
});

When('I customize some colors and save the changes', function () {
  cy.intercept('POST', '**/v1/graphql', (req) => {
    const { body } = req;
    if (body?.operationName === 'createSDKMobileTheme') {
      expect(body).to.have.property('operationName', 'createSDKMobileTheme');
    }
  }).as('createSDKMobileTheme');

  cy.intercept('POST', '**/v1/graphql', (req) => {
    const { body } = req;
    if (body?.operationName === 'addThemeToSDKMobile') {
      expect(body).to.have.property('operationName', 'addThemeToSDKMobile');
    }
  }).as('addThemeToSDKMobile');

  cy.get('[data-test="main colors-collapsable"] [data-test="collapsable-button"]').click();

  cy.get('[data-test="primaryColor"] [data-test="input-container"] [data-test="input-remove-value"]').click();
  cy.get('[data-test="primaryColor"] [data-test="input-container"] [data-test="color-picker-input"]')
    .clear()
    .type('#d00f0f');
  cy.get('[data-test="primaryColor"] [data-test="color-picker-box"]').click();

  cy.get('[data-test="backgroundColor"] [data-test="input-container"] [data-test="input-remove-value"]').click();
  cy.get('[data-test="backgroundColor"] [data-test="input-container"] [data-test="color-picker-input"]')
    .clear()
    .type('#f3f4f5');
  cy.get('[data-test="backgroundColor"] [data-test="color-picker-box"]').click();

  cy.get('[data-test="submit-customize"]').click();
  cy.get('[data-test="toast-message"]').should('be.visible');
  cy.wait('@createSDKMobileTheme').its('response.statusCode').should('eq', 200);
  cy.wait('@addThemeToSDKMobile').its('response.statusCode').should('eq', 200);
  cy.contains('Flow created');
  this.steps.push('  When I customize some colors and save the changes');
});

When('I go back to the saved flow', function () {
  cy.intercept('POST', '**/v1/graphql', (req) => {
    const { body } = req;
    if (body?.operationName === 'getSDKMobileTheme') {
      expect(body).to.have.property('operationName', 'getSDKMobileTheme');
    }
  }).as('getSDKMobileTheme');
  cy.wait(600);
  cy.get('[data-test="nav-button-theme"]').click();
  this.steps.push('  When I go back to the saved flow');
});

When('I edit many colors and validate them', function () {
  cy.wait('@getSDKMobileTheme').its('response.statusCode').should('eq', 200);

  cy.get('[data-test="main colors-collapsable"] [data-test="collapsable-button"]').click();

  // Define color mappings
  const colorMappings = {
    primaryColor: '#1bbdf9',
    secondaryColor: '#e7ac34',
    backgroundColor: '#abebb2',
    neutralColor: '#e6e6e6',
    accentColor: '#d016e0',
  };

  // Iterate through color mappings
  Object.entries(colorMappings).forEach(([color, hex]) => {
    cy.get(`[data-test="${color}"] [data-test="input-container"] [data-test="input-remove-value"]`).click();
    cy.get(`[data-test="${color}"] [data-test="input-container"] [data-test="color-picker-input"]`).clear().type(hex);
    cy.get(`[data-test="${color}"] [data-test="color-picker-box"]`).click();
  });

  cy.get('[data-test="status colors-collapsable"] [data-test="collapsable-button"]').click();

  cy.get('[data-test="errorColor"] [data-test="input-container"] [data-test="input-remove-value"]').click();
  cy.get('[data-test="errorColor"] [data-test="input-container"] [data-test="color-picker-input"]')
    .clear()
    .type('#a76f6f');
  cy.get('[data-test="errorColor"] [data-test="color-picker-box"]').click();
  cy.get('[data-test="error-color"]').should('have.attr', 'fill', '#a76f6f');

  cy.get('[data-test="successColor"] [data-test="input-container"] [data-test="input-remove-value"]').click();
  cy.get('[data-test="successColor"] [data-test="input-container"] [data-test="color-picker-input"]')
    .clear()
    .type('#0f0');
  cy.get('[data-test="successColor"] [data-test="color-picker-box"]').click();

  cy.get('[data-test="text colors-collapsable"] [data-test="collapsable-button"]').click();

  cy.get('[data-test="titleTextColor"] [data-test="input-container"] [data-test="input-remove-value"]').click();
  cy.get('[data-test="titleTextColor"] [data-test="input-container"] [data-test="color-picker-input"]')
    .clear()
    .type('#a76f6f');
  cy.get('[data-test="titleTextColor"] [data-test="color-picker-box"]').click();
  cy.get('[data-test="title-color"]').should('have.attr', 'fill', '#a76f6f');

  cy.get('[data-test="bodyTextColor"] [data-test="input-container"] [data-test="input-remove-value"]').click();
  cy.get('[data-test="bodyTextColor"] [data-test="input-container"] [data-test="color-picker-input"]')
    .clear()
    .type('#d016e0');
  cy.get('[data-test="bodyTextColor"] [data-test="color-picker-box"]').click();
  cy.get('[data-test="body-color"]').should('have.attr', 'fill', '#d016e0');

  this.steps.push('  When I edit many colors and validate them');
});

Then('I save the updated flow, validating through UI and API', function () {
  cy.intercept('POST', '**/v1/graphql', (req) => {
    const { body } = req;
    if (body?.operationName === 'updateThemeSDKMobile') {
      expect(body).to.have.property('operationName', 'updateThemeSDKMobile');
    }
  }).as('updateThemeSDKMobile');

  cy.get('[data-test="submit-customize"]').click();
  cy.get('[data-test="toast-message"]').should('be.visible');
  cy.contains('Theme updated');
  cy.wait('@updateThemeSDKMobile').its('response.statusCode').should('eq', 200);
  this.steps.push('  Then I save the updated flow, validating through UI and API');
});
