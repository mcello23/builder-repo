/// <reference types="cypress" />

const apiEndpoint = 'https://onb-reg-dropdown.landing.identity-platform.net/api/landing';
const apiKeyEmptyArray = 'uaDQOglR2i2jjbaIkppxolD7B8gLw28AxkXq9ned';

Cypress.Commands.add('api_UniqueUrlNegativeTime', () => {
  cy.request({
    method: 'POST',
    url: apiEndpoint,
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKeyEmptyArray,
    },
    body: {
      uniqueUrl: true,
      customerId: 'example',
      documentNumber: '1111111111S',
      time: '-0.05',
    },
  }).then((response) => {
    expect(response.body).to.have.property('status', true);
    const url = response.body.url;
    cy.log(url);
    cy.log(response.body);

    cy.request({
      url: url,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(404);
    });
  });
});

Cypress.Commands.add('api_UniqueUrlSecondsTime', () => {
  cy.request({
    method: 'POST',
    url: apiEndpoint,
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKeyEmptyArray,
    },
    body: {
      uniqueUrl: true,
      customerId: 'example',
      documentNumber: '1111111111S',
      time: '0.01',
    },
  }).then((response) => {
    expect(response.body).to.have.property('status', true);
    const url = response.body.url;
    cy.log(url);
    cy.log(response.body);

    cy.wait(1100);

    cy.request({
      url: url,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(404);
    });
  });
});

Cypress.Commands.add('api_UniqueUrlOneMinute', () => {
  cy.request({
    method: 'POST',
    url: apiEndpoint,
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKeyEmptyArray,
    },
    body: {
      uniqueUrl: true,
      customerId: 'example',
      documentNumber: '1111111111S',
      time: '1',
    },
  }).then((response) => {
    expect(response.body).to.have.property('status', true);
    const url = response.body.url;
    cy.log(url);
    cy.log(response.body);
    cy.request({
      url: url,
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });
});
