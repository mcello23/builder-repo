import 'cypress-mochawesome-reporter/register';
import 'cypress-shadow-dom';
import './api_builder_commands';
import './api_centralservices_commands';
import './api_landing_commands';
import './api_landing_creations';
import './api_mobile_sdk_creations';
import './gui_commands';

afterEach(function () {
  cy.addTestContext({
    title: 'Executed Steps',
    value: this.steps ? this.steps.join('\n') : '',
  });
  this.steps = [];
  // eslint-disable-next-line
  cy.screenshot({ capture: 'runner' });
});

before(function () {
  cy.injectCustomStyles();
  this.steps = [];
});

beforeEach(function () {
  cy.api_clearUserDB();
  cy.api_deleteClientLicenses();

  const fixtures = [
    'auto_validations/landing_configurations',
    'auto_validations/landing_workflows',
    'auto_validations/media',
    'auto_validations/landing_themes',
    'auto_validations/landings',
    'auto_validations/landing_modules',
  ];

  fixtures.forEach((fixture) => {
    cy.fixture(fixture, { timeout: 10000 }).then((data) => {
      switch (fixture) {
        case 'auto_validations/landing_configurations':
          cy.insertConfigurationsLandingIntoHasura(data);
          break;
        case 'auto_validations/landing_workflows':
          cy.insertLandingWorkflowsIntoHasura(data);
          break;
        case 'auto_validations/media':
          cy.insertMediaIntoHasura(data);
          break;
        case 'auto_validations/landing_themes':
          cy.insertLandingThemesIntoHasura(data);
          break;
        case 'auto_validations/landings':
          cy.insertLandingIntoHasura(data);
          break;
        case 'auto_validations/landing_modules':
          cy.insertModulesLandingIntoHasura(data);
          break;
        default:
          cy.log(`Unknown fixture: ${fixture}`);
      }
    });
  });
});

after(function () {
  cy.api_clearUserDB();
});

Cypress.on('uncaught:exception', function (err) {
  if (
    err.message.includes('NEXT_NOT_FOUND') ||
    /hydrat/i.test(err.message) ||
    /Minified React error #418/.test(err.message) ||
    /Minified React error #423/.test(err.message)
  ) {
    return false;
  }
});

Cypress.automation('remote:debugger:protocol', {
  command: 'Network.setCacheDisabled',
  params: { cacheDisabled: true },
});
