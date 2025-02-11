/// <reference types="cypress" />
import { Given, Then } from '@badeball/cypress-cucumber-preprocessor';

Given('I login to Builder with a specific Landing Published via API', function () {
  cy.api_regressionEmptyArrayDropdwon();
  cy.wait(500);
  cy.login('user');
  this.steps.push('Given I login to Builder with a specific Landing Published via API');
});

Then('I validate my Landing URL is unique and time validity is negative', function () {
  cy.api_UniqueUrlNegativeTime();
  this.steps.push('  Then I validate my Landing URL is unique and time validity is negative');
});

Then('I validate my Landing URL is unique and time validity is 1 second', function () {
  cy.api_UniqueUrlSecondsTime();
  this.steps.push('  Then I validate my Landing URL is unique and time validity is 1 second');
});

Then('I validate my Landing URL is unique and time validity is 1 minute', function () {
  cy.api_UniqueUrlOneMinute();
  this.steps.push('  Then I validate my Landing URL is unique and time validity is 1 minute');
});
