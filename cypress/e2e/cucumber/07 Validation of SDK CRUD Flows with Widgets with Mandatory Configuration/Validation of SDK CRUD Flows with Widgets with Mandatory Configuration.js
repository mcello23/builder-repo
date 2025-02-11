/// <reference types="cypress" />
import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';

Given('I login to Builder creating a SDK flow in the UI', function () {
  cy.login('user');
  cy.createSDKwithWidgetsNewFlow();
  this.steps.push('Given I login to Builder creating a SDK flow in the UI');
});

When('I select all widgets', function () {
  cy.get('[data-test="Selphi-widget-drag"]').click();
  cy.get('[data-test="SelphID-widget-drag"]').click();
  cy.get('[data-test="Video assistance-widget-drag"]').click();
  cy.get('[data-test="Video ID-widget-drag"]').click();
  cy.get('[data-test="Selphi Signature-widget-drag"]').click();
  cy.get('[data-test="Video ID Signature-widget-drag"]').click();
  cy.get('[data-test="QR capture-widget-drag"]').click();
  cy.get('[data-test="NFC-widget-drag"]').click();
  cy.get('[data-test="Phactura capture-widget-drag"]').click();
  cy.get('[data-test="Voice-widget-drag"]').click();
  cy.get('[data-test="External step-widget-drag"]').click();
  cy.get('[data-test="Phingers-widget-drag"]').click();
  this.steps.push('  When I select all widgets');
});

Then('I see the required configurations for the selected widgets via UI', function () {
  cy.get('[data-test="required-widget-card"]').should('be.visible');
  cy.get('[data-test="1-Selphi-required-step"]').should('be.visible');
  cy.get('[data-test="2-SelphID-required-step"]').should('be.visible');
  cy.get('[data-test="5-Selphi Signature-required-step"]').should('be.visible');
  cy.get('[data-test="10-Voice-required-step"]').should('be.visible');
  this.steps.push('  Then I see the required configurations for the selected widgets via UI');
});

When('I fill all the mandatory fields', function () {
  cy.intercept('POST', '**/v1/graphql', (req) => {
    if (req.body.operationName === 'getStatusSdkMobileByPk') {
      expect(req.body).to.have.property('operationName', 'getStatusSdkMobileByPk');
    }
  }).as('getStatusSdkMobileByPk');
  cy.intercept('POST', '**/v1/graphql', (req) => {
    if (req.body.operationName === 'getSDKMobileTheme') {
      expect(req.body).to.have.property('operationName', 'getSDKMobileTheme');
    }
  }).as('getSDKMobileTheme');
  cy.intercept('POST', '**/v1/graphql', (req) => {
    if (req.body.operationName === 'getSdksMobileByPk') {
      expect(req.body).to.have.property('operationName', 'getSdksMobileByPk');
    }
  }).as('getSdksMobileByPk');
  cy.intercept('POST', '**/v1/graphql', (req) => {
    if (req.body.operationName === 'updateWidget') {
      expect(req.body).to.have.property('operationName', 'updateWidget');
    }
  }).as('updateWidget');
  cy.get('[data-test="1-Selphi-config"]').click();
  cy.get('[data-test="root_resourcesPath"]').type('randmomPath');
  cy.get('[data-test="modal-close-button"]').click();
  cy.get('[data-test="2-SelphID-config"]').click();
  cy.get('[data-test="root_resourcesPath"]').type('randmomPath');
  cy.get('[data-test="modal-close-button"]').click();
  cy.get('[data-test="5-Selphi Signature-config"]').click();
  cy.get('#root_resourcesPath').type('randmomPath');
  cy.get('[data-test="modal-close-button"]').click();
  cy.get('[data-test="10-Voice-config"]').click();
  cy.get('#root_phrases_0').type('randomPhrase');
  cy.get('[data-test="modal-close-button"]').click();
  this.steps.push('  When I fill all the mandatory fields');
});

Then('I save the flow, validating through UI and API', function () {
  cy.get('[data-test="studio-finish-button"]').click();
  cy.get('[data-test="save-button"]').click();
  cy.get('[data-test="name-flow"]').type('randomName');
  cy.get('[data-test="data-test-submit-button"]').click();
  cy.contains('Flow created').should('be.visible');
  cy.wait('@getStatusSdkMobileByPk').its('response.statusCode').should('eq', 200);
  cy.wait('@getSDKMobileTheme').its('response.statusCode').should('eq', 200);
  cy.wait('@getSdksMobileByPk').its('response.statusCode').should('eq', 200);
  cy.wait('@updateWidget').its('response.statusCode').should('eq', 200);
  this.steps.push('  Then I save the flow, validating through UI and API');
});

When('I select all widgets, filling all the mandatory fields', function () {
  cy.intercept('POST', '**/v1/graphql', (req) => {
    if (req.body.operationName === 'getStatusSdkMobileByPk') {
      expect(req.body).to.have.property('operationName', 'getStatusSdkMobileByPk');
    }
  }).as('getStatusSdkMobileByPk');
  cy.intercept('POST', '**/v1/graphql', (req) => {
    if (req.body.operationName === 'getSDKMobileTheme') {
      expect(req.body).to.have.property('operationName', 'getSDKMobileTheme');
    }
  }).as('getSDKMobileTheme');
  cy.intercept('POST', '**/v1/graphql', (req) => {
    if (req.body.operationName === 'getSdksMobileByPk') {
      expect(req.body).to.have.property('operationName', 'getSdksMobileByPk');
    }
  }).as('getSdksMobileByPk');
  cy.get('[data-test="Selphi-widget-drag"]').click();
  cy.get('[data-test="SelphID-widget-drag"]').click();
  cy.get('[data-test="Video assistance-widget-drag"]').click();
  cy.get('[data-test="Video ID-widget-drag"]').click();
  cy.get('[data-test="Selphi Signature-widget-drag"]').click();
  cy.get('[data-test="Video ID Signature-widget-drag"]').click();
  cy.get('[data-test="QR capture-widget-drag"]').click();
  cy.get('[data-test="NFC-widget-drag"]').click();
  cy.get('[data-test="Phactura capture-widget-drag"]').click();
  cy.get('[data-test="Voice-widget-drag"]').click();
  cy.get('[data-test="External step-widget-drag"]').click();
  cy.get('[data-test="Phingers-widget-drag"]').click();
  cy.get('[data-test="1-Selphi-config"]').click();
  cy.get('[data-test="root_resourcesPath"]').type('randmomPath');
  cy.get('[data-test="modal-close-button"]').click();
  cy.get('[data-test="2-SelphID-config"]').click();
  cy.get('[data-test="root_resourcesPath"]').type('randmomPath');
  cy.get('[data-test="modal-close-button"]').click();
  cy.get('[data-test="5-Selphi Signature-config"]').click();
  cy.get('#root_resourcesPath').type('randmomPath');
  cy.get('[data-test="modal-close-button"]').click();
  cy.get('[data-test="10-Voice-config"]').click();
  cy.get('#root_phrases_0').type('randomPhrase');
  cy.get('[data-test="modal-close-button"]').click();
  this.steps.push('  When I select all widgets, filling all the mandatory fields');
});

When('I go back to homepage and delete the flow', function () {
  cy.intercept('POST', '**/v1/graphql', (req) => {
    if (req.body.operationName === 'deleteSdkMobile') {
      expect(req.body).to.have.property('operationName', 'deleteSdkMobile');
    }
  }).as('deleteSdkMobile');
  cy.get('[data-test="test-button-landing-list"]').click();
  cy.get('[data-test="option-menu-test"]').click();
  cy.get('[data-test="option-delete"]').click();
  cy.get('[data-test="data-test-submit-button"]').click();
  this.steps.push('  When I go back to homepage and delete the flow');
});

Then('I validate the flow was deleted via UI and API', function () {
  cy.get('[data-test="test-landing-card"]').should('not.exist');
  cy.contains('Application deleted').should('be.visible');
  cy.wait('@deleteSdkMobile').its('response.statusCode').should('eq', 200);
  this.steps.push('  Then I validate the flow was deleted via UI and API');
});

When('I save the flow', function () {
  cy.get('[data-test="studio-finish-button"]').click();
  cy.get('[data-test="save-button"]').click();
  cy.get('[data-test="name-flow"]').type('randomName');
  cy.get('[data-test="data-test-submit-button"]').click();
  cy.contains('Flow created').should('be.visible');
  cy.wait('@getStatusSdkMobileByPk').its('response.statusCode').should('eq', 200);
  cy.wait('@getSDKMobileTheme').its('response.statusCode').should('eq', 200);
  cy.wait('@getSdksMobileByPk').its('response.statusCode').should('eq', 200);
  this.steps.push('  When I save the flow');
});
