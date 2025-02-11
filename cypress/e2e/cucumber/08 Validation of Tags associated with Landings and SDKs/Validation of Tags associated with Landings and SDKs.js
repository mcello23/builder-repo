/// <reference types="cypress" />
import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';

Given('I login to Builder with a SDK flow and TAG created via API', function () {
  cy.api_createTestMobileSDK();
  cy.login('user');
  cy.get('[data-test="SDK-Mobile"]').click();
  this.steps.push('Given I login to Builder with a SDK flow and TAG created via API');
});

When('I search for a SDK with the tag "TEST"', function () {
  cy.intercept('POST', '**/v1/graphql', (req) => {
    if (req.body.operationName === 'getTags') {
      expect(req.body).to.have.property('operationName', 'getTags');
    }
  }).as('getTags');
  cy.get('[data-test="tags"]').eq(0).click();
  cy.get('[data-test="option-TEST"]').click();
  this.steps.push('  When I search for a SDK with the tag "TEST"');
});

Then('I am able to see the SDK with the tag', function () {
  cy.get('[data-test="chip-tag-TEST"]').should('be.visible');
  cy.get('[data-test="test-landing-card"]').should('be.visible');
  this.steps.push('  Then I am able to see the SDK with the tag');
});

When('I search for the tag "DEV"', function () {
  cy.get('[data-test="option-DEV"]').click();
  this.steps.push('  When I search for the tag "DEV"');
});

Then('I am able to see the SDK with two tags, validating through UI and API', function () {
  cy.get('[data-test="chip-tag-TEST"]').should('be.visible');
  cy.get('[data-test="chip-tag-DEV"]').should('be.visible');
  cy.get('[data-test="test-landing-card"]').should('be.visible');
  cy.wait('@getTags').its('response.statusCode').should('eq', 200);
  this.steps.push('  Then I am able to see the SDK with two tags, validating through UI and API');
});

When('I go to SDK homepage', function () {
  cy.get('[data-test="header-logo"]').click();
  cy.get('[data-test="SDK-Mobile"]').click();
  cy.get('[data-test="info-button"]').click();

  this.steps.push('  When I go to SDK homepage');
});

When('I am able to add a custom TAG', function () {
  cy.intercept('POST', '**/v1/graphql', (req) => {
    if (req.body.operationName === 'getTags') {
      expect(req.body).to.have.property('operationName', 'getTags');
    }
  }).as('getTags');
  cy.get('[data-test="tags"]').eq(1).click();
  cy.get('[data-test="tags"]').eq(1).type('ANY_TAG{enter}');
  cy.wait('@getTags').its('response.statusCode').should('eq', 200);
  this.steps.push('  When I am able to add a custom TAG');
});

Then('I validate the TAG is saved via API and UI', function () {
  cy.get('[data-test="tag-ANY_TAG"]').should('be.visible');
  cy.get('[data-test="tag-TEST"]').should('be.visible');
  cy.contains('Tag assigned').should('be.visible');
  this.steps.push('  Then I validate the TAG is saved via API and UI');
});

When('I add multiple TAGs to a flow', function () {
  cy.get('[data-test="SDK-Mobile"]').click();
  cy.get('[data-test="info-button"]').click();
  this.steps.push('  When I add multiple TAGs to a flow');
});

When('I search for a SDK with multiple tags', function () {
  cy.searchMultipleSDKTag();
  this.steps.push('  When I search for a SDK with multiple tags');
});

Then('I am able to see the SDK with multiple tags', function () {
  cy.get('[data-test="chip-tag-TEST"]').should('be.visible');
  cy.get('[data-test="chip-tag-DEV"]').should('be.visible');
  this.steps.push('  Then I am able to see the SDK with multiple tags');
});

When('I am able to remove a custom TAG', function () {
  cy.intercept('POST', '**/v1/graphql', (req) => {
    if (req.body.operationName === 'deleteTagLanding') {
      expect(req.body).to.have.property('operationName', 'deleteTagLanding');
    }
  }).as('deleteTagLanding');
  cy.get('[data-test="tag-DEV"]').should('exist');
  cy.get('[data-test="tag-TEST"]').should('exist');
  cy.get('[data-test="tag-QA"]').should('exist');
  cy.get('[data-test="tag-DEV"] [data-test="closeable-chips"]').click();
  cy.get('[data-test="tag-TEST"] [data-test="closeable-chips"]').click();
  cy.get('[data-test="tag-QA"] [data-test="closeable-chips"]').click();
  cy.wait('@deleteTagLanding').its('response.statusCode').should('eq', 200);
  this.steps.push('  When I am able to remove a custom TAG');
});

Then('I validate the TAG is removed via API and UI', function () {
  cy.contains('Tag removed').should('be.visible');
  this.steps.push('  Then I validate the TAG is removed via API and UI');
});

Given('I login to Builder with a Landing flow and TAG created via API', function () {
  cy.api_createLandingEmpty();
  cy.login('user');
  this.steps.push('Given I login to Builder with a Landing flow and TAG created via API');
});

When('I search for a Landing with the tag "TEST"', function () {
  cy.intercept('POST', '**/v1/graphql', (req) => {
    if (req.body.operationName === 'getTags') {
      expect(req.body).to.have.property('operationName', 'getTags');
    }
  }).as('getTags');
  cy.get('[data-test="tags"]').eq(0).click();
  cy.get('[data-test="option-TEST"]').click();
  this.steps.push('  When I search for a Landing with the tag "TEST"');
});

Then('I am able to see the Landing with the tag', function () {
  cy.get('[data-test="chip-tag-TEST"]').should('be.visible');
  cy.get('[data-test="test-landing-card"]').should('be.visible');

  this.steps.push('  Then I am able to see the Landing with the tag');
});

Then('I am able to see the Landing with two tags, validating through UI and API', function () {
  cy.wait('@getTags').its('response.statusCode').should('eq', 200);
  cy.get('[data-test="chip-tag-TEST"]').should('be.visible');
  cy.get('[data-test="chip-tag-DEV"]').should('be.visible');
  cy.get('[data-test="test-landing-card"]').should('be.visible');
  this.steps.push('  Then I am able to see the Landing with two tags, validating through UI and API');
});

When('I open my landing details', function () {
  cy.get('[data-test="info-button"]').click();
  this.steps.push('  When I open my landing details');
});
