/// <reference types="cypress" />
import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';
import { faker } from '@faker-js/faker';

let landingSearch;
let sdkSearch;

Given('I open the login page', function () {
  cy.visit('/');
  this.steps.push('Given I open the login page');
});

When('I enter valid credentials', function () {
  cy.login('user');

  this.steps.push('When I enter valid credentials');
});

Then('I see that I am logged in both in UI and API', function () {
  cy.get('[data-test="header-logo"]').should('be.visible');
  this.steps.push('Then I see that I am logged in both in UI and API');
});

When('I click on the log out button', function () {
  cy.get('[data-test="user-name"]').click();
  cy.contains('Log out').click();
  this.steps.push('When I click on the log out button');
});

Then('I see that I am logged out in the UI, validating the URL', function () {
  cy.url().should('include', 'https://stg-facephi.eu.auth0.com/login');
  this.steps.push('Then I see that I am logged out in the UI, validating the URL');
});

When('I click on the tutorial flow', function () {
  cy.get('[data-test="show-tutorial"]').click();
  cy.get('[data-test="tutorial-layout"]').should('be.visible');
  this.steps.push('When I click on the tutorial flow');
});

Then('I see the entire tutorial messages via UI', function () {
  cy.get('[data-test="tutorial-step"]').invoke('text').should('be.equal', '1');
  cy.get('[data-test="next-step-tutorial"]', { timeout: 1000 }).click();
  cy.get('[data-test="tutorial-step"]').invoke('text').should('be.equal', '2');
  cy.get('[data-test="next-step-tutorial"]', { timeout: 1000 }).click();
  cy.get('[data-test="tutorial-step"]').invoke('text').should('be.equal', '3');
  cy.get('[data-test="next-step-tutorial"]', { timeout: 1000 }).click();
  cy.get('[data-test="tutorial-step"]').invoke('text').should('be.equal', '4');
  this.steps.push('Then I see the entire tutorial messages via UI');
});

Then('I see the Landing and SDK buttons in the Homepage via UI', function () {
  cy.contains('Welcome!').should('be.visible');
  cy.get('[data-test="landing-type-Landing"]').should('be.visible');
  cy.get('[data-test="landing-type-SDK-Mobile"]').should('be.visible');
  this.steps.push('Then I see the Landing and SDK buttons in the Homepage via UI');
});

When('I click on Landing button', function () {
  cy.get('[data-test="landing-type-Landing"]').click();
  this.steps.push('When I click on Landing button');
});

Then('I see pre-defined templates to create a Landing', function () {
  cy.intercept('POST', '**/v1/graphql', (req) => {
    if (req.body.operationName === 'createDraft') {
      expect(req.body).to.have.property('operationName', 'createDraft');
    }
  }).as('createDraft');
  cy.intercept('POST', '**/v1/graphql', (req) => {
    if (req.body.operationName === 'getLandingByPk') {
      expect(req.body).to.have.property('operationName', 'getLandingByPk');
    }
  }).as('getLandingByPk');
  cy.get('[data-test="toast-message"]').invoke('text').should('be.equal', 'Landing created');
  cy.contains('See more').click();
  cy.get('[data-test="landing-workflow-videoRecording"]').should('be.visible');
  cy.get('[data-test="landing-workflow-onboarding"]').should('be.visible');
  cy.get('[data-test="landing-workflow-OnboardingReniec"]').should('be.visible');
  cy.get('[data-test="landing-workflow-OnboardingDocumentValidationResults"]').should('be.visible');
  cy.get('[data-test="landing-workflow-OnboardingValidationReniec"]').should('be.visible');
  cy.get('[data-test="landing-workflow-OnboardingResults"]').should('be.visible');
  cy.get('[data-test="landing-workflow-VideoContracting"]').should('be.visible');
  cy.get('[data-test="landing-workflow-undefined"]').should('be.visible');
  cy.contains('Authentication').should('be.visible');
  cy.get('[data-test="own-workflow-New flow"]').should('be.visible');
  cy.wait('@createDraft');
  cy.wait('@getLandingByPk');
  this.steps.push('Then I see pre-defined templates to create a Landing');
});

When('I click on SDK button', function () {
  cy.get('[data-test="landing-type-SDK-Mobile"]').click();
  this.steps.push('When I click on SDK button');
});

Then('I see the available fields to create a SDK', function () {
  cy.intercept('POST', '**/v1/graphql', (req) => {
    if (req.body.operationName === 'createDraft') {
      expect(req.body).to.have.property('operationName', 'createDraft');
    }
  }).as('createDraft');
  cy.intercept('POST', '**/v1/graphql', (req) => {
    if (req.body.operationName === 'getPlatforms') {
      expect(req.body).to.have.property('operationName', 'getPlatforms');
    }
  }).as('getPlatforms');
  cy.get('[data-test="toast-message"]').invoke('text').should('be.equal', 'Application created');
  cy.get('[data-test="landing-platform-ios"]').should('be.visible');
  cy.get('[data-test="landing-platform-android"]').should('be.visible');
  cy.get('[data-test="bundleId"]').should('be.visible');
  cy.contains('What is the Bundle ID or App ID?').should('be.visible');
  cy.wait('@createDraft');
  cy.wait('@getPlatforms');
  this.steps.push('Then I see the available fields to create a SDK');
});

When('I click on the "Tags" tab, selecting the last tag available', function () {
  cy.get('[data-test="tags"]').click();
  cy.api_returnDEVTag();
  cy.contains('DEV').scrollIntoView();
  this.steps.push('When I click on the "Tags" tab, selecting the last tag available');
});

Then('I validate that the dropdown works', function () {
  cy.get('[data-test="option-DEV"]').should('be.visible');

  this.steps.push('Then I validate that the dropdown works');
});

When('I perform a search on Landing and SDK pages', function () {
  landingSearch = faker.word.sample();
  sdkSearch = faker.word.sample();
  // eslint-disable-next-line
  cy.get('[data-test="filter-by-name"]').clear().type(landingSearch);
  cy.get('[data-test="SDK-Mobile"]').click();
  // eslint-disable-next-line
  cy.get('[data-test="filter-by-name"]').clear().type(sdkSearch);
  this.steps.push('When I perform a search on Landing and SDK pages');
});

Then('I can see the search is maintained in both pages', function () {
  cy.get('[data-test="Landing"]').click();
  cy.get('[data-test="filter-by-name"]').should('have.value', landingSearch).and('not.have.value', sdkSearch);
  cy.get('[data-test="filter-by-name"]').clear();
  cy.get('[data-test="SDK-Mobile"]').click();
  cy.get('[data-test="filter-by-name"]').should('have.value', sdkSearch).and('not.have.value', landingSearch);
  cy.get('[data-test="filter-by-name"]').clear();
  this.steps.push('Then I can see the search is maintained in both pages');
});

When('I create a Landing to enter Design Studio', function () {
  cy.intercept('POST', '**/v1/graphql', (req) => {
    if (req.body.operationName === 'getWidgets') {
      expect(req.body).to.have.property('operationName', 'getWidgets');
    }
  }).as('getWidgets');
  cy.get('[data-test="landing-type-Landing"]').click();
  cy.get('[data-test="landing-workflow-onboarding"]').click();
  this.steps.push('When I create a Landing to enter Design Studio');
});

Then('I should see that the display is shown in fullscreen', function () {
  cy.wait('@getWidgets');
  cy.get('main').and('have.css', 'flex', '1 1 0%');
  this.steps.push('Then I should see that the display is shown in fullscreen');
});

Given('I login to Builder, with a pre-defined Onboarding landing set', function () {
  cy.api_ActivateOnboarding();
  cy.login('user');
  this.steps.push('Given I login to Builder with a Onboarding Landing created');
});

Then('I validate the correct versions of the APIs used in Landing using a GET request', function () {
  cy.request({
    method: 'GET',
    url: 'https://onboarding-only-v3.landing.identity-platform.net/api/version',
  }).then((response) => {
    expect(response.body).to.deep.equal({
      SelphidWebComponent: '6.6.1',
      SelphiWebComponent: '6.6.1',
    });
  });
  this.steps.push('Then I validate the correct versions of the APIs used in Landing using a GET request');
});

When('I click on "My Profile > Edit"', function () {
  cy.get('[data-test="user-name"]').click();
  cy.get('[data-test="option-menu"]').contains('My profile').click();
  cy.get('[data-test="button-edit-test"]').click();
  this.steps.push('When I click on "My Profile > Edit"');
});

Then('I am able to edit my name, surname, role, clients and types', function () {
  cy.get('[data-test="input-email"]').should('be.visible');
  cy.get('[data-test="input-given-name"]').should('be.visible');
  cy.get('[data-test="input-family-name"]').should('be.visible');
  cy.get('[data-test="dropdown-role"]').should('be.visible');
  cy.get('[data-test="dropdown-clients"]').should('be.visible');
  cy.get('[data-test="dropdown-types"]').should('be.visible');
  cy.get('[data-test="input-given-name"]').should('be.enabled');
  cy.get('[data-test="input-family-name"]').should('be.enabled');
  cy.get('[data-test="dropdown-role"]').should('be.enabled');
  cy.get('[data-test="dropdown-clients"]').should('be.enabled');
  cy.get('[data-test="dropdown-types"]').should('be.disabled');
  this.steps.push('Then I am able to edit my name, surname, role, clients and types');
});

When('I click on "User management" button on the top right corner', function () {
  cy.intercept('POST', '**/v1/graphql', (req) => {
    if (req.body.operationName === 'getUsers') {
      expect(req.body).to.have.property('operationName', 'getUsers');
    }
  }).as('getUsers');
  cy.intercept('POST', '**/v1/graphql', (req) => {
    if (req.body.operationName === 'getRoles') {
      expect(req.body).to.have.property('operationName', 'getRoles');
    }
  }).as('getRoles');
  cy.get('[data-test="user-name"]').click();
  cy.get('[data-test="option-menu"]').contains('User management').click();
  cy.wait('@getUsers');
  cy.wait('@getRoles');
  this.steps.push('When I click on "User management" button on the top right corner');
});

Then('I validate "Users", "Groups" fields and "Create" button via UI and API request', function () {
  cy.intercept('POST', '**/v1/graphql', (req) => {
    if (req.body.operationName === 'getGroups') {
      expect(req.body).to.have.property('operationName', 'getGroups');
    }
  }).as('getGroups');
  cy.get('[data-test="create-user"]').should('be.visible');
  cy.get('[data-test="groups"]').should('be.visible');
  cy.contains('Email').should('be.visible');
  cy.contains('Created at').should('be.visible');
  cy.contains('Status').should('be.visible');
  cy.contains('Actions').should('be.visible');
  cy.get('[data-test="filter-by-name"]').should('be.visible');
  cy.get('[data-test="groups"]').click();
  cy.wait('@getGroups');
  this.steps.push('Then I validate "Users", "Groups" fields and "Create" button via UI and API request');
});

When('I click on "My Profile" button on the top right corner', function () {
  cy.get('[data-test="user-name"]').click();
  cy.get('[data-test="option-menu"]').contains('My profile').click();
  this.steps.push('When I click on "My Profile" button on the top right corner');
});

Then('I am able to edit my name and surname', function () {
  cy.get('[data-test="input-email"]').should('be.visible');
  cy.get('[data-test="input-given-name"]').should('be.visible');
  cy.get('[data-test="input-family-name"]').should('be.visible');
  cy.get('[data-test="input-given-name"]').should('be.enabled');
  cy.get('[data-test="input-family-name"]').should('be.enabled');
  cy.get('[data-test="input-given-name"]').should('be.enabled');
  cy.get('[data-test="input-family-name"]').should('be.enabled');
  this.steps.push('Then I am able to edit my name and surname');
});
