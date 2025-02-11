/// <reference types="cypress" />
import { Then, When } from '@badeball/cypress-cucumber-preprocessor';

When('I create a Landing flow', function () {
  cy.get('[data-test="landing-type-Landing"]').click();
  cy.get('[data-test="own-workflow-New flow"]').click();
  this.steps.push('  When I create a Landing flow');
});

Then('I am able to see all the widgets inside Design Studio', function () {
  cy.get('[data-test="Selphi-widget-drag"]').should('be.visible');
  cy.get('[data-test="SelphID-widget-drag"]').should('be.visible');
  cy.get('[data-test="Video recording-widget-drag"]').should('be.visible');
  cy.get('[data-test="Video contracting-widget-drag"]').should('be.visible');
  cy.get('[data-test="Document validation-widget-drag"]').should('be.visible');
  cy.get('[data-test="RENIEC-widget-drag"]').should('be.visible');
  cy.get('[data-test="Results-widget-drag"]').should('be.visible');
  cy.get('[data-test="Form-widget-drag"]').should('be.visible');
  this.steps.push('  Then I am able to see all the widgets inside Design Studio');
});

When('I can see other fileds in Design Studio', function () {
  cy.get('[aria-disabled="true"]').should('be.visible');
  cy.get('[data-test="save-button"]').should('be.visible');
  cy.contains('Flow title').should('be.visible');
  cy.contains('Design studio').should('be.visible');
  this.steps.push('  When I can see other fields in Design Studio');
});

When('I add all widgets to the flow', function () {
  cy.intercept('POST', '**/v1/graphql', (req) => {
    if (req.body.operationName === 'updateWidget') {
      expect(req.body).to.have.property('operationName', 'updateWidget');
    }
  }).as('updateFlow');
  cy.intercept('POST', '**/v1/graphql', (req) => {
    if (req.body.operationName === 'addNewWorkflow') {
      expect(req.body).to.have.property('operationName', 'addNewWorkflow');
    }
  }).as('addingFlow');
  cy.get('[data-test="Video recording-widget-drag"]').click();
  cy.get('[data-test="Form-widget-drag"]').click();
  cy.get('[data-test="2-Form-config"]').click();
  cy.get('#root_formData_title').type('Test');
  cy.get('#root_formData_row_0_title').type('Test');
  cy.get('#root_formData_row_0_field_0_title').type('Test');
  cy.get('[data-test="toast-close-button"]').click();
  cy.get('#root_formData_button').type('Test');
  cy.get('[data-test="modal-close-button"]').click();
  cy.get('[data-test="Results-widget-drag"]').click();
  cy.get('[data-test="Document validation-widget-drag"]').click();
  cy.get('[data-test="RENIEC-widget-drag"]').click();
  cy.get('[data-test="5-RENIEC-config"]').click();
  cy.get('#root_user').type('Test');
  cy.get('#root_k1_token').type('Test');
  cy.get('#root_inputs_0_widget').click();
  cy.get('[data-test="option-6152cce0c01f0c1eb6deedb6"]').click();
  cy.get('#root_inputs_0_key').click();
  cy.contains('Test').click({ force: true });
  cy.get('[data-test="modal-close-button"]').click();
  cy.get('[data-test="SelphID-widget-drag"]').click();
  cy.get('[data-test="Video contracting-widget-drag"]').click();
  cy.get('[data-test="studio-finish-button"]').click();
  cy.wait('@addingFlow');
  this.steps.push('  When I add all widgets to the flow');
});

When('I click on the "Save" button', function () {
  cy.get('[data-test="save-button"]').click();
  cy.get('[data-test="name-flow"]').type('Test');
  cy.get('[data-test="data-test-submit-button"]').click();
  this.steps.push('  When I click on the "Save" button');
});

Then('I validate via UI and API the flow was sucessfully created', function () {
  cy.wait('@updateFlow');
  cy.get('[data-test="toast-message"]').should('be.visible');
  cy.contains('Flow created');
  this.steps.push('  Then I validate via UI and API the flow was successfully created');
});

When('I create a Android SDK flow', function () {
  cy.get('[data-test="landing-type-SDK-Mobile"]').click();
  cy.get('[data-test="bundleId"]').type('com.facephi.sdkmobile');
  cy.get('[data-test="landing-platform-android"]').click();
  cy.get('[data-test="landing-workflow-onboarding"]').click();
  this.steps.push('  When I create a Android SDK flow');
});

Then('I am able to see all SDK widgets inside Design Studio', function () {
  cy.intercept('POST', '**/v1/graphql', (req) => {
    if (req.body.operationName === 'createSdkMobileConfiguration') {
      expect(req.body).to.have.property('operationName', 'createSdkMobileConfiguration');
    }
  }).as('createSdkMobileConfiguration');
  cy.intercept('POST', '**/v1/graphql', (req) => {
    if (req.body.operationName === 'addConfigToSdkMobile') {
      expect(req.body).to.have.property('operationName', 'addConfigToSdkMobile');
    }
  }).as('addConfigToSdkMobile');
  cy.get('[data-test="Selphi-widget-drag"]').should('be.visible');
  cy.get('[data-test="SelphID-widget-drag"]').should('be.visible');
  cy.get('[data-test="Video assistance-widget-drag"]').should('be.visible');
  cy.get('[data-test="Video ID-widget-drag"]').should('be.visible');
  cy.get('[data-test="Selphi Signature-widget-drag"]').should('be.visible');
  cy.get('[data-test="Video ID Signature-widget-drag"]').should('be.visible');
  cy.get('[data-test="QR capture-widget-drag"]').should('be.visible');
  cy.get('[data-test="NFC-widget-drag"]').should('be.visible');
  cy.get('[data-test="Phactura capture-widget-drag"]').should('be.visible');
  cy.get('[data-test="Voice-widget-drag"]').should('be.visible');
  cy.get('[data-test="Phingers-widget-drag"]').should('be.visible');
  cy.get('[data-test="External step-widget-drag"]').should('be.visible');
  this.steps.push('  Then I am able to see all SDK widgets inside Design Studio');
});

When('I can see other SDK fields in Design Studio', function () {
  cy.wait('@createSdkMobileConfiguration');
  cy.wait('@addConfigToSdkMobile');
  cy.get('[data-test="0-Start-widget-item"]').should('be.visible');
  cy.get('[data-test="save-button"]').should('be.visible');
  cy.contains('Onboarding').should('be.visible');
  cy.contains('Design studio').should('be.visible');
  cy.contains('Added template').should('be.visible');
  this.steps.push('  When I can see other SDK fields in Design Studio');
});

When('I create a iOS SDK flow', function () {
  cy.get('[data-test="landing-type-SDK-Mobile"]').click();
  cy.get('[data-test="bundleId"]').type('com.facephi.sdkmobile');
  cy.get('[data-test="landing-platform-ios"]').click();
  cy.get('[data-test="own-workflow-New flow"]').click();
  this.steps.push('  When I create an iOS SDK flow');
});

When('I add all SDK widgets to the flow', function () {
  cy.get('[data-test="Selphi-widget-drag"]').click();
  cy.get('[data-test="1-Selphi-required"]').click();
  cy.get('[data-test="root_resourcesPath"]').type('randmomPath');
  cy.get('[data-test="modal-close-button"]').click();
  cy.get('[data-test="SelphID-widget-drag"]').click();
  cy.get('[data-test="2-SelphID-required"]').click();
  cy.get('[data-test="root_resourcesPath"]').type('randmomPath');
  cy.get('[data-test="modal-close-button"]').click();
  cy.get('[data-test="Video assistance-widget-drag"]').click();
  cy.get('[data-test="Video ID-widget-drag"]').click();
  cy.get('[data-test="Selphi Signature-widget-drag"]').click();
  cy.get('[data-test="5-Selphi Signature-required"]').click();
  cy.get('#root_resourcesPath').type('randmomPath');
  cy.get('[data-test="modal-close-button"]').click();
  cy.get('[data-test="Video ID Signature-widget-drag"]').click();
  cy.get('[data-test="QR capture-widget-drag"]').click();
  cy.get('[data-test="NFC-widget-drag"]').click();
  cy.get('[data-test="Phactura capture-widget-drag"]').click();
  cy.get('[data-test="External step-widget-drag"]').click();
  cy.get('[data-test="Phingers-widget-drag"]').click();
  cy.get('[data-test="studio-finish-button"]').click();
  this.steps.push('  When I add all SDK widgets to the flow');
});

When('I save the SDK flow', function () {
  cy.intercept('POST', '**/v1/graphql', (req) => {
    if (req.body.operationName === 'updateWidget') {
      expect(req.body).to.have.property('operationName', 'updateWidget');
    }
  }).as('updateWidget');
  cy.get('[data-test="save-button"]').click();
  cy.get('[data-test="name-flow"]').type('Test');
  cy.get('[data-test="data-test-submit-button"]').click();
  this.steps.push('  When I save the SDK flow');
});

Then('I validate via UI and API the SDK flow was sucessfully created', function () {
  cy.wait('@updateWidget');
  cy.get('[data-test="toast-message"]').should('be.visible');
  cy.contains('Flow created');
  this.steps.push('  Then I validate via UI and API the SDK flow was successfully created');
});
