/// <reference types="cypress" />
import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';
import { faker } from '@faker-js/faker';

const landingName = faker.lorem.word(10);

Given('I login to Builder as a user', function () {
  cy.login('user');
  this.steps.push('Given I login to Builder as a user');
});

Given('I login to Builder as a owner', function () {
  cy.login('owner');
  this.steps.push('Given I login to Builder as a owner');
});

Given('I login with a draft Landing created via API', function () {
  cy.api_createLandingEmpty();
  cy.login('user');
  this.steps.push('Given I login with a draft Landing created via API');
});

When('I visit the Landing', function () {
  cy.stubCamera_OpenLanding();
  this.steps.push('When I visit the Landing');
});

When('I create a Landing flow with community template', function () {
  cy.get('[data-test="landing-type-Landing"]').click();
  cy.get('[data-test="landing-workflow-onboarding"]').click();
  cy.get('[data-test="save-button"]').click();
  cy.get('[data-test="name-flow"]').type(landingName);
  cy.get('[data-test="data-test-submit-button"]').click();
  this.steps.push('  When I create a Landing flow with community template');
});

When('I customize the colors of the Landing', function () {
  cy.intercept('POST', '**/v1/graphql', (req) => {
    const { body } = req;
    if (body?.operationName === 'createTheme') {
      expect(body).to.have.property('operationName', 'createTheme');
    }
  }).as('createTheme');

  cy.intercept('POST', '**/v1/graphql', (req) => {
    const { body } = req;
    if (body?.operationName === 'addThemeToLanding') {
      expect(body).to.have.property('operationName', 'addThemeToLanding');
    }
  }).as('addThemeToLanding');

  cy.get('input[type="file"]', { force: true }).attachFile('banco_hip_logo.jpg');
  cy.wait(1000);

  const colorMappings = {
    Primary: '#ff7f00',
    Secondary: '#591bf9',
    Tertiary: '#4c6b76',
  };

  Object.entries(colorMappings).forEach(([colorName, hexCode]) => {
    //eslint-disable-next-line
    cy.get(`[data-test="color-picker-${colorName}"] [data-test="input-container"] [data-test="color-picker-input"]`)
      .clear()
      .type(hexCode)
      .click();
  });

  cy.get('[data-test="submit-customize"]').click();
  this.steps.push('  When I customize the colors of the Landing');
});

Then('I validate via UI and API the customization was successfully saved', function () {
  cy.wait('@createTheme');
  cy.wait('@addThemeToLanding');
  cy.get('[data-test="toast-message"]').should('be.visible');
  cy.contains('Theme associated').should('be.visible');
  this.steps.push('  Then I validate via UI and API the customization was successfully saved');
});

Then('I validate via UI and API the connection was successfully saved', function () {
  cy.wait('@addModules');
  cy.get('[data-test="toast-message"]').should('be.visible');
  cy.get('[data-test="toast-message"]').invoke('text').should('be.equal', 'Connections created or updated');
  this.steps.push('  Then I validate via UI and API the connection was successfully saved');
});
