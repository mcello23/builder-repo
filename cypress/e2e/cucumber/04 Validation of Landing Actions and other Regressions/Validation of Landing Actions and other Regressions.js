/// <reference types="cypress" />
import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';
import { faker } from '@faker-js/faker';

let landingName = faker.lorem.word(8);

const previewUrl = 'https://landing.identity-platform.net/?client=a97164f3-21ce-496f-b4ee-c60f60bf4745&preview=true';
const thisIsAPreviewText = /This is a preview|Esto es una previsualización|Esta é uma prévia/;
const hasntPublishedText = /Hasn't published this landing yet.|Aún no has publicado esta landing.|Ainda não publicou esta landing./;
const connectivitySettingsText = /The connectivity settings you have set will not work|La configuración de conectividad que haya puesto no funcionará|As configurações de conectividade que você definiu não funcionarão./;
const backButtonText = /Back|Volver|Voltar/;
const builderHasuraURL = 'https://builder.identity-platform.net/v1/graphql';

Given('I login creating Onboarding QR Landing via API', function () {
  cy.api_ActivateOnboardingQR();
  cy.login('user');
  this.steps.push('Given I login creating Onboarding QR Landing via API');
});

When('I visit the QR Landing', function () {
  cy.intercept('POST', builderHasuraURL, (req) => {
    if (req.body.operationName === 'getLandings') {
      expect(req.body).to.have.property('operationName', 'getLandings');
      req.reply((res) => {
        expect(res.body.data.landings[0].configuration).to.have.property('qr', true);
      });
    }
  }).as('getLandings');
  cy.stubCamera_OpenLanding();
  this.steps.push('  When I play the Landing');
});

Then('I should see the QR code in the UI and the API response', function () {
  cy.wait('@getLandings');
  cy.get('.UI--c-dhzjXW-ikuHZjz-css > .hydrated')
    .shadow()
    .find('facephi-qr-widget')
    .within(() => {
      cy.get('.fs-l.fw-600').invoke('text').should('eq', 'We want to confirm your identity');
      cy.contains('We want to confirm your identity').should('be.visible');
      cy.contains('We recommend using your mobile device for this process. For this you must scan this QR:').should(
        'be.visible',
      );
      cy.contains('Continue on this device')
        .should('be.visible')
        .should('have.prop', 'tagName')
        .should('equal', 'BUTTON');
      cy.get('.content-qr').should('be.visible'); // QR code container
    });

  this.steps.push('  Then I should see the QR code in the UI and the API response');
});

Given('I login creating a Landing via API', function () {
  cy.api_ActivateForms();
  cy.login('user');
  this.steps.push('Given I login creating a Landing via API');
});

const generateRandomString = (length) => Array.from({ length }, () => Math.random().toString(36)[2]).join('');

const baseUrl = 'https://form-test-page.landing.identity-platform.net/';
const querySelector = `${generateRandomString(8)}`;
const newUrl = `${baseUrl}?querySelector=${querySelector}`;

When('I add the random Query Selector to the Landing URL', function () {
  cy.intercept('POST', 'https://form-test-page.landing.identity-platform.net/api/start').as('publishItem');
  cy.visit(newUrl);
  this.steps.push('  When I add the Query Selector to the Landing URL');
});

Then('I should validate the Query Selector in the UI and API response', function () {
  cy.wait('@publishItem').then((interception) => {
    const response = interception.response.body;

    if (response.operationId && response.sessionId) {
      expect(response).to.have.property('operationId');
      expect(response).to.have.property('sessionId');
      cy.log('API Response: Success with operationId and sessionId');
    } else if (response.status === true && response.message === 'Server error') {
      expect(response.status).to.eq(true);
      expect(response.message).to.eq('Server error');
      cy.log('API Response: Server error');
    } else {
      cy.log('API Response: Unexpected response', response);
      assert.fail('Unexpected API response');
    }
  });
  cy.url().should('eq', newUrl);
  this.steps.push('  Then I should validate the Query Selector in the UI and API response');
});

Given('I login creating a Preview Landing via API', function () {
  cy.api_PreviewLanding();
  cy.login('user');
  this.steps.push('Given I login creating a Preview Landing via API');
});

Then('I should validate the preview URL and messages on the top of the landing', function () {
  cy.url().should('eq', previewUrl);
  cy.contains(thisIsAPreviewText).should('be.visible');
  cy.contains(hasntPublishedText).should('be.visible');
  cy.contains(connectivitySettingsText).should('be.visible');
  cy.get('button[type="button"]').should('be.enabled');
  cy.get('button[type="button"]').contains(backButtonText).should('be.visible');
  this.steps.push('  Then I should validate the preview URL and messages on the top of the landing');
});

Given('I login creating a unpublished Landing via API', function () {
  cy.api_regressionEmptyArrayDropdwon();
  cy.login('user');
  this.steps.push('Given I login creating a unpublished Landing via API');
});

When('I publish the Landing', function () {
  cy.intercept('POST', builderHasuraURL, (req) => {
    if (req.body.operationName === 'publishItem') {
      expect(req.body).to.have.property('operationName', 'publishItem');
      req.reply((res) => {
        expect(res.body.data.landing).to.have.property('published', true);
      });
    }
  }).as('publishItem');
  cy.get('[data-test="option-menu-test"]').click();
  cy.contains('Publish').click();
  cy.wait('@publishItem');
  this.steps.push('  When I publish the Landing');
});

Then('I should see the Landing published and warning in the UI and the API response', function () {
  cy.contains('Published');
  cy.contains('Important! Keep in mind');
  cy.contains(
    'The publication of a landing page is not immediate, it depends on the propagation of the DNS in the different ISPs of the world. Keep this in mind and relax with a coffee while the URL is not visible',
  );
  this.steps.push('  Then I should see the Landing published and warning in the UI and the API response');
});

Given('I login creating a published Landing via API', function () {
  cy.api_regressionEmptyArray();
  cy.login('user');
  this.steps.push('Given I login creating a published Landing via API');
});

When('I unpublish the Landing', function () {
  cy.intercept('POST', builderHasuraURL, (req) => {
    if (req.body.operationName === 'publishItem') {
      expect(req.body).to.have.property('operationName', 'publishItem');
      req.reply((res) => {
        expect(res.body.data.landing).to.have.property('published', false);
      });
    }
  }).as('publishItem');
  cy.get('[data-test="option-menu-test"]').click();
  cy.contains('Unpublish').click();
  cy.get('[data-test="data-test-submit-button"]').click();
  cy.wait('@publishItem');
  this.steps.push('  When I unpublish the Landing');
});

Then('I should see the Landing unpublished in the UI and the API response', function () {
  cy.contains('To be published');
  this.steps.push('  Then I should see the Landing unpublished in the UI and the API response');
});

When('I duplicate the Landing', function () {
  cy.intercept('POST', builderHasuraURL, (req) => {
    if (req.body.operationName === 'duplicateLanding') {
      req.alias = 'duplicateLanding';
      expect(req.body).to.have.property('operationName', 'duplicateLanding');
      req.continue((res) => {
        expect(res.body.data.cloneItem).to.have.property('id');
      });
    }
  }).as('duplicateLanding');

  cy.get('[data-test="option-menu-test"]').click();
  cy.get('[data-test="option-duplicate"]').click();
  cy.get('[data-test="name-domain"]').type(landingName);
  cy.get('[data-test="data-test-submit-button"]').click();
  this.steps.push('  When I duplicate the Landing');
});

Then('I should see the duplicated Landing in the UI and validate the API response', function () {
  cy.get('[data-test="toast-message"]').should('have.text', 'Duplicate landing');
  cy.contains(landingName).should('be.visible');
  cy.contains('To be published').should('be.visible');
  cy.contains('Published').should('be.visible');
  cy.wait('@duplicateLanding').then((interception) => {
    expect(interception.response.statusCode).to.eq(200);
  });
  this.steps.push('  Then I should see the duplicated Landing in the UI and validate the API response');
});

When('I delete the Landing', function () {
  cy.intercept('POST', builderHasuraURL, (req) => {
    if (req.body.operationName === 'deleteLanding') {
      expect(req.body).to.have.property('operationName', 'deleteLanding');
      req.reply((res) => {
        expect(res.body.data.landing).to.have.property('id');
      });
    }
  }).as('deleteLanding');
  cy.get('[data-test="option-menu-test"]').click();
  cy.get('[data-test="option-delete"]').click();
  cy.get('[data-test="data-test-submit-button"]').click();
  cy.wait('@deleteLanding').its('response.statusCode').should('eq', 200);
  this.steps.push('  When I delete the Landing');
});

Then('I should see the Landing was sucessfully deleted in the UI and the API response', function () {
  cy.get('[data-test="toast-message"]').should('have.text', 'Delete landing');
  this.steps.push('  Then I should see the Landing was sucessfully deleted in the UI and the API response');
});

// Regression tests
Given('I login with a Landing with dropdown country from SelphID via API', function () {
  cy.api_regressionEmptyArrayDropdwon();
  cy.login('user');
  this.steps.push('Given I login with a Landing with dropdown country from SelphID via API');
});

Given('I login with a Landing adding and removing a country from SelphID via API', function () {
  cy.api_regressionEmptyArray();
  cy.login('user');
  this.steps.push('Given I login with a Landing adding and removing a country from SelphID via API');
});

Then('I check the Landing does not have an array undefined in the country property in the HTML code', function () {
  cy.intercept('POST', 'https://api.landing.identity-platform.net/trail/event', (req) => {
    if (req.body.operationName === 'ONBAORDING') {
      expect(req.body).to.have.property('operationName', 'ONBAORDING');
    }
  }).as('ONBAORDING');
  cy.get('#__NEXT_DATA__').should('not.have.attr', '"specificdata"');
  cy.wait('@ONBAORDING');
  this.steps.push(
    '  Then I check the Landing does not have an array undefined in the country property in the HTML code',
  );
});
