/// <reference types="cypress" />
import { Given, Then } from '@badeball/cypress-cucumber-preprocessor';

const trailURL = 'https://api.landing.identity-platform.net/trail/event';

Given('I login creating Onboarding with Video Recording Landing via API', function () {
  cy.api_ActivateOnboardingVideoRec();
  cy.login('user');
  this.steps.push('Given I login creating Onboarding with Video Recording Landing via API');
});

Then('I should see that OVR landing has specific properties', function () {
  cy.intercept('POST', trailURL, (req) => {
    if (req.body.operationName === 'ONBAORDING') {
      expect(req.body).to.have.property('operationName', 'ONBAORDING');
    }
  }).as('ONBAORDING');
  cy.get('#__NEXT_DATA__').should('contain', '"country":["AL"]').and('contain', '"documentType":"IDCard"');
  cy.wait('@ONBAORDING');
  this.steps.push('  Then I should see that OVR landing has specific properties');
});

Given('I login creating Onboarding Landing via API', function () {
  cy.api_ActivateOnboarding();
  cy.login('user');
  this.steps.push('Given I login creating Onboarding Landing via API');
});

Then('I should see that Onboarding landing has specific properties', function () {
  cy.intercept('POST', trailURL, (req) => {
    if (req.body.operationName === 'ONBAORDING') {
      expect(req.body).to.have.property('operationName', 'ONBAORDING');
    }
  }).as('ONBAORDING');
  cy.get('#__NEXT_DATA__').should('contain', '"country":["CH"]').and('contain', '"documentType":"Passport"');
  cy.wait('@ONBAORDING');
  this.steps.push('  Then I should see that Onboarding landing has specific properties');
});

Given('I login creating Form With RENIEC via API', function () {
  cy.api_ActivateRENIECForm();
  cy.login('user');
  this.steps.push('Given I login creating Form With RENIEC via API');
});

Then('I should see that Form With RENIEC landing has specific properties', function () {
  cy.intercept('POST', trailURL, (req) => {
    if (req.body.operationName === 'ONBAORDING') {
      expect(req.body).to.have.property('operationName', 'ONBAORDING');
    }
  }).as('ONBAORDING');

  cy.get('facephi-sdk-provider')
    .shadow()
    .find('form')
    .within(() => {
      cy.contains('RENIEC Form').should('be.visible');
      cy.contains('Please fill in to proceed').should('be.visible');
      cy.contains('DNI').should('be.visible');
      cy.contains('Submit').should('be.visible');
    });
  cy.get('#__NEXT_DATA__').should('contain', '"k1_token":"123"').and('contain', '"user":"abc"');
  cy.wait('@ONBAORDING');
  this.steps.push('  Then I should see that Form With RENIEC landing has specific properties');
});

Given('I login creating Onboarding Document Validation Results via API', function () {
  cy.api_ActivateOnboardingDocumentValidation();
  cy.login('user');
  this.steps.push('Given I login creating Onboarding Document Validation Results via API');
});

Then('I should see that ODV landing has specific properties', function () {
  cy.intercept('POST', trailURL, (req) => {
    if (req.body.operationName === 'ONBAORDING') {
      expect(req.body).to.have.property('operationName', 'ONBAORDING');
    }
  }).as('ONBAORDING');
  cy.get('#__NEXT_DATA__').should('contain', '"documentMode":2').and('contain', '"imageFormat":"image/png"');
  cy.wait('@ONBAORDING');
  this.steps.push('  Then I should see that ODV landing has specific properties');
});

Given('I login creating Onboarding with Reniec via API', function () {
  cy.api_ActivateOnbRENIEC();
  cy.login('user');
  this.steps.push('Given I login creating Onboarding with Reniec via API');
});

Then('I should see that OWR landing has specific properties', function () {
  cy.intercept('POST', trailURL, (req) => {
    if (req.body.operationName === 'ONBAORDING') {
      expect(req.body).to.have.property('operationName', 'ONBAORDING');
    }
  }).as('ONBAORDING');
  cy.get('#__NEXT_DATA__')
    .should('contain', '"user":"testuser"')
    .and('contain', '"k1_token":"250786"')
    .and('contain', '"customKey":"document"');
  cy.wait('@ONBAORDING');
  this.steps.push('  Then I should see that OWR landing has specific properties');
});

Given('I login creating Onboarding with Results via API', function () {
  cy.api_ActivateOnbResults();
  cy.login('user');
  this.steps.push('Given I login creating Onboarding with Results via API');
});

Then('I should see that Onboarding With Results landing has specific properties', function () {
  cy.intercept('POST', trailURL, (req) => {
    if (req.body.operationName === 'ONBAORDING') {
      expect(req.body).to.have.property('operationName', 'ONBAORDING');
    }
  }).as('ONBAORDING');
  cy.get('#__NEXT_DATA__')
    .should('contain', '"timeout":10000')
    .and('contain', '"tutorial":false')
    .and('contain', '"imageFormat":"image/jpg"');
  cy.wait('@ONBAORDING');
  this.steps.push('  Then I should see that Onboarding With Results landing has specific properties');
});

Given('I login creating Video Contracting via API', function () {
  cy.api_VidContracting();
  cy.login('user');
  this.steps.push('Given I login creating Video Contracting via API');
});

Then('I should see that Video Contracting landing has specific properties', function () {
  cy.intercept('POST', trailURL, (req) => {
    if (req.body.operationName === 'ONBAORDING') {
      expect(req.body).to.have.property('operationName', 'ONBAORDING');
    }
  }).as('ONBAORDING');
  cy.get('#__NEXT_DATA__')
    .should('contain', '"apiKey":"JWxn6MRh8ZLuTHyTRlVFFfl7yzDo9iSqxuxtPz7c"')
    .and('contain', '"sdkApiKey":"CyeCHmLir6laY8tLSpoPMYCGOtpcvZgNW5RPBaC1"');
  cy.wait('@ONBAORDING');
  this.steps.push('  Then I should see that Video Contracting landing has specific properties');
});

Given('I login creating OWDVVR Landing via API', function () {
  cy.api_OWDVVR();
  cy.login('user');
  this.steps.push('Given I login creating OWDVVR Landing via API');
});

Then('I should see that OWDVVR landing has specific properties', function () {
  cy.intercept('POST', trailURL, (req) => {
    if (req.body.operationName === 'ONBAORDING') {
      expect(req.body).to.have.property('operationName', 'ONBAORDING');
    }
  }).as('ONBAORDING');
  cy.get('#__NEXT_DATA__').should('contain', '"widgetName":"DOCUMENT_VALIDATION"');
  cy.wait('@ONBAORDING');
  this.steps.push('  Then I should see that OWDVVR landing has specific properties');
});

Given('I login creating Authentication Landing via API', function () {
  cy.api_Auth();
  cy.login('user');
  this.steps.push('Given I login creating Authentication Landing via API');
});

Then('I should see that Authentication landing has specific properties', function () {
  cy.intercept('POST', trailURL, (req) => {
    if (req.body.operationName === 'ONBAORDING') {
      expect(req.body).to.have.property('operationName', 'ONBAORDING');
      const configuration = req.body.data.configuration.general;
      expect(configuration).to.have.property('liveness', true);
      expect(configuration).to.have.property('enableLiveness', true);
      expect(configuration).to.have.property('enableMatching', false);
    }
  }).as('ONBAORDING');
  cy.wait('@ONBAORDING');
  this.steps.push('  Then I should see that Authentication landing has specific properties');
});
