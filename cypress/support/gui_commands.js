import 'cypress-file-upload';

Cypress.Commands.add('loginWithRole', function (role = 'user') {
  const userPassword = Cypress.env('LOGIN_PASSWORD');
  const email = `testing-${role}@facephi.com`;

  cy.session(
    role,
    () => {
      cy.visit('/');
      cy.get('[data-test="email"]').type(email);
      cy.get('[type="password"]').type(`${userPassword}{enter}`, {
        log: false,
      });
      cy.location('pathname', { timeout: 10000 }).should('eq', '/en');
    },
    {
      cacheAcrossSpecs: true,
    },
  );
});

Cypress.Commands.add('login', function (role) {
  cy.loginWithRole(role);
  cy.visitAndSkipTutorial();
});

Cypress.Commands.add('visitAndSkipTutorial', function () {
  cy.intercept('POST', '**/v1/graphql', (req) => {
    if (req.body.operationName === 'getUserInfo') {
      expect(req.body).to.have.property('operationName', 'getUserInfo');
    }
  }).as('getUserInfo');
  cy.visit('/');
  cy.get('[data-test="header-logo"]').click();
  cy.wait('@getUserInfo').then(({ response }) => {
    expect(response.body.data.userInfo.given_name).to.eq('testing');
  });
});

Cypress.Commands.add('stubCamera_OpenLanding', function () {
  cy.fixture('camera_stub/camera_stub').then((stubData) => {
    cy.intercept('POST', 'https://api.landing.identity-platform.net/trail/event', {
      statusCode: 200,
      body: stubData,
    }).as('postEvent');
  });

  cy.get('[data-test="Landing"]').click();
  cy.get('[data-test="option-menu-test"]').click();
  cy.get('[data-test="option-preview"]').click();

  cy.window().then((win) => {
    if (!win.navigator.mediaDevices) {
      win.navigator.mediaDevices = {};
    }

    cy.stub(win.navigator.mediaDevices, 'getUserMedia').callsFake(() => {
      return Promise.resolve({
        getTracks: () => [],
        getVideoTracks: () => [
          {
            stop: () => {},
            getSettings: () => ({
              deviceId: 'ebbf9e76acdc721a7284032d0e412fb6966937adb24974a91b868a148f32bd64',
            }),
          },
        ],
      });
    });
  });
});

Cypress.Commands.add('injectCustomStyles', function () {
  const app = window.top;
  if (!app.document.head.querySelector('[data-hide-command-log-request]')) {
    const style = app.document.createElement('style');
    style.innerHTML = `
      .command-name-request,
      .command-name-xhr,
      .command-name-page-load,
      .command-name-new-url,
      .command-name-page-load-start,
      .command-name-page-load-end {
        display: none;
      }
      .command-method::before {
        content: none !important;
        background-color: red;
      }
      .command-method { 
        background-color: #6262e49e; 
        color: white; 
        border-radius: 3px;
        padding: 3px 5px;
      }
      .command-method span { 
        color: white;
      }
    `;
    style.setAttribute('data-hide-command-log-request', '');
    app.document.head.appendChild(style);
  }
});

Cypress.Commands.add('createSDKTemplate', function () {
  cy.get('[data-test="landing-type-SDK-Mobile"]').click();
  cy.get('[data-test="bundleId"]').type('com.facephi.sdkmobile');
  cy.get('[data-test="landing-platform-android"]').click();
  cy.get('[data-test="landing-workflow-onboarding"]').click();
  cy.get('[data-test="1-SelphID-required"]').click();
  cy.get('[data-test="root_resourcesPath"]').type('ab');
  cy.get('[data-test="modal-close-button"]').click();
  cy.get('[data-test="2-Selphi-required"]').click();
  cy.get('[data-test="root_resourcesPath"]').type('ab');
  cy.get('[data-test="modal-close-button"]').click();
  cy.get('[data-test="save-button"]').click();
  cy.get('[data-test="name-flow"]').type('abc');
  cy.get('[data-test="data-test-submit-button"]').click();
  cy.get('[data-test="toast-message"]').should('be.visible');
});

Cypress.Commands.add('createSDKwithWidgets', function () {
  cy.get('[data-test="landing-type-SDK-Mobile"]').click();
  cy.get('[data-test="bundleId"]').type('com.facephi.sdkmobile');
  cy.get('[data-test="landing-platform-android"]').click();
  cy.get('[data-test="own-workflow-New flow"]').click();
  cy.get('[data-test="Selphi-widget-drag"]').click();
  cy.get('[data-test="SelphID-widget-drag"]').click();
  cy.get('[data-test="1-Selphi-required"]').click();
  cy.get('[data-test="root_resourcesPath"]').type('ab');
  cy.get('[data-test="modal-close-button"]').click();
  cy.get('[data-test="2-SelphID-required"]').click();
  cy.get('[data-test="root_resourcesPath"]').type('ab');
  cy.get('[data-test="modal-close-button"]').click();
  cy.get('[data-test="studio-finish-button"]').click();
  cy.get('[data-test="save-button"]').click();
  cy.get('[data-test="name-flow"]').type('abc');
  cy.get('[data-test="data-test-submit-button"]').click();
  cy.get('[data-test="toast-message"]').should('be.visible');
});

Cypress.Commands.add('createSDKwithWidgetsNewFlow', function () {
  cy.get('[data-test="landing-type-SDK-Mobile"]').click();
  cy.get('[data-test="bundleId"]').type('com.facephi.sdkmobile');
  cy.get('[data-test="landing-platform-android"]').click();
  cy.get('[data-test="own-workflow-New flow"]').click();
});

Cypress.Commands.add('searchMultipleSDKTag', function () {
  cy.get('[data-test="header-logo"]').click({ force: true });
  cy.get('[data-test="SDK-Mobile"]').click();
  cy.get('[data-test="tags"]').eq(0).click();
  cy.get('[data-test="option-TEST"]').click();
  cy.get('[data-test="SDK-Mobile"]').click();
  cy.get('[data-test="tags"]').eq(0).click();
  cy.get('[data-test="option-DEV"]').click();
  cy.get('[data-test="SDK-Mobile"]').click();
});
