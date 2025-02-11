/// <reference types="cypress" />
import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';

Given("I login with a user with 'Mobile SDK Android' enabled on Central Services", function () {
  cy.api_CentralServices_createClientSDKAndroid_NoWidgets();
  cy.login('user');
  this.steps.push("Given I login with a user with 'Mobile SDK Android' enabled on Central Services");
});

When("I only see 'Mobile SDK' button on homepage, and validate the API call", function () {
  cy.intercept('POST', '**/v1/graphql', (req) => {
    if (req.body.operationName === 'getTypes') {
      expect(req.body).to.have.property('operationName', 'getTypes');
      req.reply((res) => {
        expect(res.body.data.types[0]).to.have.property('name', 'SDK-Mobile');
      });
    }
  }).as('getTypes');
  cy.get('[data-test="landing-type-SDK-Mobile"]').should('be.visible');
  cy.wait('@getTypes');
  this.steps.push("  When I only see 'Mobile SDK' button on homepage, and validate the API call");
});

When("I do not see the 'Landing' button in the UI", function () {
  cy.get('[data-test="landing-type-Landing"]').should('not.exist');
  this.steps.push("  When I do not see the 'Landing' button in the UI");
});

Then("I validate that 'Mobile SDK' and working on UI and API call by clicking on it", function () {
  cy.intercept('POST', '**/v1/graphql', (req) => {
    if (req.body.operationName === 'getTypes') {
      expect(req.body).to.have.property('operationName', 'getPlatforms');
      req.reply((res) => {
        expect(res.body.data.types[0]).to.have.property('name', 'ios');
        expect(res.body.data.types[1]).to.have.property('name', 'When');
        expect(res.body.data.types[2]).to.have.property('name', 'web');
      });
    }
  }).as('getTypes');
  cy.get('[data-test="landing-type-SDK-Mobile"]').click();
  cy.get('[data-test="bundleId"]').should('be.visible');
  cy.wait('@getTypes');
  this.steps.push("  Then I validate that 'Mobile SDK' and working on UI and API call by clicking on it");
});

Given("I login with a user with 'Landing' enabled on Central Services", function () {
  cy.api_CentralServices_createClientLanding_NoWidgets();
  cy.login('user');
  this.steps.push("Given I login with a user with 'Landing' enabled on Central Services");
});

When("I only see 'Landing' button on the homepage, and validate the API call", function () {
  cy.intercept('POST', '**/v1/graphql', (req) => {
    if (req.body.operationName === 'getTypes') {
      expect(req.body).to.have.property('operationName', 'getTypes');
      req.reply((res) => {
        expect(res.body.data.types[0]).to.have.property('name', 'Landing');
      });
    }
  }).as('getTypes');
  cy.get('[data-test="landing-type-Landing"]').should('be.visible');
  cy.wait('@getTypes');
  this.steps.push("  When I only see 'Landing' button on the homepage, and validate the API call");
});

When("I do not see the 'Mobile SDK' button in the UI", function () {
  cy.get('[data-test="landing-type-SDK-Mobile"]').should('not.exist');
  this.steps.push("  When I do not see the 'Mobile SDK' button in the UI");
});

Then("I validate that 'Landing' is working on UI and API call by clicking on it", function () {
  cy.intercept('POST', '**/v1/graphql', (req) => {
    if (req.body.operationName === 'getWorkflowsByTypeId') {
      expect(req.body).to.have.property('operationName', 'getWorkflowsByTypeId');
      req.reply((res) => {
        expect(res.body.data.workflows_types[0]).to.have.property('type_id', '96003a91-21e4-4072-93e9-c228dbca47bc');
        expect(res.body.data.workflows_types[0].workflow).to.have.property('name', 'Onboarding with VideoRecording');
      });
    }
  }).as('getWorkflowsByTypeId');
  cy.get('[data-test="landing-type-Landing"]').click();
  cy.get('[data-test="own-workflow-New flow"]').should('be.visible');
  cy.wait('@getWorkflowsByTypeId');
  this.steps.push("  Then I validate that 'Landing' is working on UI and API call by clicking on it");
});

Given("I login with a user with both 'Landing' and 'SDK' buttons enabled on Central Services", function () {
  cy.api_CentralServices_createClientLandingAndSDK_NoWidgets();
  cy.login('user');
  this.steps.push("Given I login with a user with both 'Landing' and 'SDK' buttons enabled on Central Services");
});

When('I should see both buttons on the homepage, and validate the API call', function () {
  cy.intercept('POST', '**/v1/graphql', (req) => {
    if (req.body.operationName === 'getTypes') {
      expect(req.body).to.have.property('operationName', 'getTypes');
      req.reply((res) => {
        expect(res.body.data.types[0]).to.have.property('name', 'Landing');
        expect(res.body.data.types[1]).to.have.property('name', 'SDK-Mobile');
      });
    }
  }).as('getTypes');
  cy.get('[data-test="landing-type-Landing"]').should('be.visible');
  cy.get('[data-test="landing-type-SDK-Mobile"]').should('be.visible');
  cy.wait('@getTypes');
  this.steps.push('  When I should see both buttons on the homepage, and validate the API call');
});

Then("I validate the UI and API call of 'Mobile SDK' button by clicking on it", function () {
  cy.intercept('POST', '**/v1/graphql', (req) => {
    if (req.body.operationName === 'getTypes') {
      expect(req.body).to.have.property('operationName', 'getPlatforms');
      req.reply((res) => {
        expect(res.body.data.types[0]).to.have.property('name', 'ios');
        expect(res.body.data.types[1]).to.have.property('name', 'When');
        expect(res.body.data.types[2]).to.have.property('name', 'web');
      });
    }
  }).as('getTypes');
  cy.get('[data-test="landing-type-SDK-Mobile"]').click();
  cy.get('[data-test="bundleId"]').should('be.visible');
  cy.get('[data-test="header-logo"]').click();
  cy.wait('@getTypes');
  this.steps.push("  Then I validate the UI and API call of 'Mobile SDK' button by clicking on it");
});

Then("I validate the UI and API call of 'Landing' button by clicking on it", function () {
  cy.intercept('POST', '**/v1/graphql', (req) => {
    if (req.body.operationName === 'getWorkflowsByTypeId') {
      expect(req.body).to.have.property('operationName', 'getWorkflowsByTypeId');
      req.reply((res) => {
        expect(res.body.data.workflows_types[0]).to.have.property('type_id', '96003a91-21e4-4072-93e9-c228dbca47bc');
        expect(res.body.data.workflows_types[0].workflow).to.have.property('name', 'Onboarding with VideoRecording');
      });
    }
  }).as('getWorkflowsByTypeId');
  cy.get('[data-test="create-button"]').click();
  cy.get('[data-test="landing-type-Landing"]').click();
  cy.get('[data-test="own-workflow-New flow"]').should('be.visible');
  cy.wait('@getWorkflowsByTypeId');
  this.steps.push("  Then I validate the UI and API call of 'Landing' button by clicking on it");
});

When("I click on the 'Landing' button on the homepage, and create a new flow", function () {
  cy.intercept('POST', '**/v1/graphql', (req) => {
    if (req.body.operationName === 'getTypes') {
      expect(req.body).to.have.property('operationName', 'getTypes');
      req.reply((res) => {
        expect(res.body.data.types[0]).to.have.property('name', 'Landing');
      });
    }
  }).as('getTypes');
  cy.get('[data-test="landing-type-Landing"]').click();
  cy.get('[data-test="own-workflow-New flow"]').click();
  cy.wait('@getTypes');
  this.steps.push("  When I click on the 'Landing' button on the homepage, and create a new flow");
});

Then("I see that there are no 'Landing' widgets available in the UI and API call", function () {
  cy.intercept('POST', '**/v1/graphql', (req) => {
    if (req.body.operationName === 'getWidgets') {
      expect(req.body).to.have.property('operationName', 'getWidgets');
      req.reply((res) => {
        expect(res.body.data).to.have.property('widgets').that.is.an('array').that.is.empty;
      });
    }
  }).as('getWidgets');
  cy.get('[data-test="Selphi-widget-drag"]').should('not.exist');
  cy.get('[data-test="SelphID-widget-drag"]').should('not.exist');
  cy.get('[data-test="RENIEC-widget-drag"]').should('not.exist');
  cy.get('[data-test="Legal terms-widget-drag"]').should('not.exist');
  cy.get('[data-test="Video recording-widget-drag"]').should('not.exist');
  cy.wait('@getWidgets');
  this.steps.push("  Then I see that there are no 'Landing' widgets available in the UI and API call");
});

When("I click on the 'Mobile SDK' button on the homepage, and create a new flow", function () {
  cy.get('[data-test="landing-type-SDK-Mobile"]').click();
  cy.get('[data-test="bundleId"]').type('com.example.myapp');
  cy.get('[data-test="landing-platform-ios"]').click();
  cy.get('[data-test="own-workflow-New flow"]').click();
  this.steps.push("  When I click on the 'Mobile SDK' button on the homepage, and create a new flow");
});

Then("I see that there are no 'Mobile SDK' widgets available in the UI and API call", function () {
  cy.intercept('POST', '**/v1/graphql', (req) => {
    if (req.body.operationName === 'getWidgets') {
      expect(req.body).to.have.property('operationName', 'getWidgets');
      req.reply((res) => {
        expect(res.body.data).to.have.property('widgets').that.is.an('array').that.is.empty;
      });
    }
  }).as('getWidgets');
  cy.get('[data-test="Selphi-widget-drag"]').should('not.exist');
  cy.get('[data-test="SelphID-widget-drag"]').should('not.exist');
  cy.get('[data-test="RENIEC-widget-drag"]').should('not.exist');
  cy.get('[data-test="Legal terms-widget-drag"]').should('not.exist');
  cy.get('[data-test="Video recording-widget-drag"]').should('not.exist');
  cy.wait('@getWidgets');
  this.steps.push("  Then I see that there are no 'Mobile SDK' widgets available in the UI and API call");
});

Given("I login with a user with 'Landing and Widgets' enabled on Central Services", function () {
  cy.api_CentralServices_createClientLanding_AllWidgets();
  cy.login('user');
  this.steps.push("Given I login with a user with 'Landing and Widgets' enabled on Central Services");
});

Then("I see that all 'Landing' widgets are available in the UI and API call", function () {
  cy.intercept('POST', '**/v1/graphql', (req) => {
    if (req.body.operationName === 'getWidgets') {
      req.reply((res) => {
        const expectedWidgets = [
          'DOCUMENT_VALIDATION',
          'RESULTS',
          'VIDEO_RECORDING',
          'SELPHI_WIDGET',
          'RENIEC',
          'FORM_WIDGET',
          'SELPHID_WIDGET',
          'VIDEO_CONTRACTING',
        ];
        const widgetNames = res.body.data.widgets.map((widget) => widget.name);
        expectedWidgets.forEach((widget) => {
          expect(widgetNames).to.include(widget);
        });
      });
    }
  }).as('getWidgets');
  cy.get('[data-test="Selphi-widget-drag"]').should('exist');
  cy.get('[data-test="SelphID-widget-drag"]').should('exist');
  cy.get('[data-test="Video recording-widget-drag"]').should('exist');
  cy.get('[data-test="Video contracting-widget-drag"]').should('exist');
  cy.get('[data-test="Document validation-widget-drag"]').should('exist');
  cy.get('[data-test="RENIEC-widget-drag"]').should('exist');
  cy.get('[data-test="Results-widget-drag"]').should('exist');
  cy.get('[data-test="Form-widget-drag"]').should('exist');
  cy.wait('@getWidgets');
  this.steps.push("  Then I see that all 'Landing' widgets are available in the UI and API call");
});

Given("I login with a user with 'Mobile SDK and Widgets' enabled on Central Services", function () {
  cy.api_CentralSercvices_createClientSDKiOSAndroid_AllWidgets();
  cy.login('user');
  this.steps.push("Given I login with a user with 'Mobile SDK and Widgets' enabled on Central Services");
});

When("I click on the 'Mobile SDK iOS' button on the homepage, and create a new flow", function () {
  cy.get('[data-test="landing-type-SDK-Mobile"]').click();
  cy.get('[data-test="bundleId"]').type('com.example.myapp');
  cy.get('[data-test="landing-platform-ios"]').click();
  cy.get('[data-test="own-workflow-New flow"]').click();
  this.steps.push("  When I click on the 'Mobile SDK iOS' button on the homepage, and create a new flow");
});

Then("I see that all 'Mobile SDK' widgets are available in the UI and API call", function () {
  cy.intercept('POST', '**/v1/graphql', (req) => {
    if (req.body.operationName === 'getWidgets') {
      req.reply((res) => {
        const expectedWidgets = [
          'SELPHID_COMPONENT',
          'SELPHI_COMPONENT',
          'NFC_COMPONENT',
          'PHINGERS_COMPONENT',
          'VIDEO_CALL_COMPONENT',
          'VIDEO_ID_COMPONENT',
          'VOICE_COMPONENT',
          'QR_CAPTURE_COMPONENT',
          'PHACTURA_CAPTURE_COMPONENT',
          'EXTERNAL_STEP',
          'SELPHI_SIGNATURE_COMPONENT',
          'VIDEO_ID_SIGNATURE_COMPONENT',
        ];
        const widgetNames = res.body.data.widgets.map((widget) => widget.name);
        expectedWidgets.forEach((widget) => {
          expect(widgetNames).to.include(widget);
        });
      });
    }
  }).as('getWidgets');
  cy.get('[data-test="Selphi-widget-drag"]').should('exist');
  cy.get('[data-test="SelphID-widget-drag"]').should('exist');
  cy.get('[data-test="Video assistance-widget-drag"]').should('exist');
  cy.get('[data-test="Video ID-widget-drag"]').should('exist');
  cy.get('[data-test="Selphi Signature-widget-drag"]').should('exist');
  cy.get('[data-test="Video ID Signature-widget-drag"]').should('exist');
  cy.get('[data-test="QR capture-widget-drag"]').should('exist');
  cy.get('[data-test="NFC-widget-drag"]').should('exist');
  cy.get('[data-test="Phactura capture-widget-drag"]').should('exist');
  cy.get('[data-test="Voice-widget-drag"]').should('exist');
  cy.get('[data-test="Phingers-widget-drag"]').should('exist');
  cy.get('[data-test="External step-widget-drag"]').should('exist');
  cy.wait('@getWidgets');
  this.steps.push("  Then I see that all 'Mobile SDK' widgets are available in the UI and API call");
});

When("I click on the 'Mobile SDK Android' button on the homepage, and create a new flow", function () {
  cy.get('[data-test="landing-type-SDK-Mobile"]').click();
  cy.get('[data-test="bundleId"]').type('com.example.myapp');
  cy.get('[data-test="landing-platform-When"]').click();
  cy.get('[data-test="own-workflow-New flow"]').click();
  this.steps.push("  When I click on the 'Mobile SDK Android' button on the homepage, and create a new flow");
});
