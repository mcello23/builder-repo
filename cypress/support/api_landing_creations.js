import { v4 as uuidv4 } from 'uuid';

const stgDB_URL = Cypress.env('API_STAG_URL');
const stgDB_secret = Cypress.env('HASURA_ADMIN_SECRET');
const userId = Cypress.env('USER_ID_USER');

Cypress.Commands.add('api_createLandingEmpty', () => {
  const landingId = uuidv4();
  cy.request({
    method: 'POST',
    url: stgDB_URL,
    headers: {
      'x-hasura-admin-secret': stgDB_secret,
    },
    body: {
      query: `mutation MyMutation {
        insert_landings(objects: {
          name: "landing",
          published: false,
          status: draft,
          user_id: "${userId}",
          id: "${landingId}",
          tags: {
            data: [
              {
                tag: {
                  data: {
                    name: "DEV"
                  }
                }
              },
              {
                tag: {
                  data: {
                    name: "TEST"
                  }
                }
              },
              {
                tag: {
                  data: {
                    name: "QA"
                  }
                }
              }
            ]
          }
        }) {
          returning {
            name
            published
            id
            workflow_id
            status
          }
        }
      }
      `,
    },
    failOnStatusCode: false,
  }).then((response) => {
    if (response.status === 200) {
      if (response.body.errors) {
        cy.log('GraphQL Errors:', response.body.errors);
        assert.fail('GraphQL query failed');
      } else {
        cy.log('Landing created successfully:', response.body);
        expect(response.status).to.eq(200);
      }
    } else {
      cy.log('API request failed:', response);
      assert.fail(`API request failed with status code: ${response.status}`);
    }
  });
});

Cypress.Commands.add('api_ActivateOnboardingVideoRec', () => {
  cy.request({
    method: 'POST',
    url: stgDB_URL,
    headers: {
      'x-hasura-admin-secret': stgDB_secret,
    },
    body: {
      query: `mutation RestoreLanding {
        update_landings(
            where: {name: {_eq: "onb-vid-rec"}},
            _set: {deleted_at: null}
        ) {
            returning {
            name
            deleted_at
            }
        }
        }
        `,
    },
    failOnStatusCode: false,
  }).then((response) => {
    if (response.status === 200) {
      cy.log('Landing activated successfully:', response.body);
      expect(response.status).to.eq(200);
    } else {
      cy.log('API request failed:', response);
      assert.fail(`API request failed with status code: ${response.status}`);
    }
  });
});

Cypress.Commands.add('api_ActivateOnboarding', () => {
  cy.request({
    method: 'POST',
    url: stgDB_URL,
    headers: {
      'x-hasura-admin-secret': stgDB_secret,
    },
    body: {
      query: `mutation RestoreLanding {
        update_landings(
            where: {name: {_eq: "onboarding-only-v4"}},
            _set: {deleted_at: null}
        ) {
            returning {
            name
            deleted_at
            }
        }
        }
        `,
    },
    failOnStatusCode: false,
  }).then((response) => {
    if (response.status === 200) {
      cy.log('Landing activated successfully:', response.body);
      expect(response.status).to.eq(200);
    } else {
      cy.log('API request failed:', response);
      assert.fail(`API request failed with status code: ${response.status}`);
    }
  });
});

Cypress.Commands.add('api_Activate_and_Publish_Onboarding', () => {
  cy.request({
    method: 'POST',
    url: stgDB_URL,
    headers: {
      'x-hasura-admin-secret': stgDB_secret,
    },
    body: {
      query: `mutation RestoreLanding {
        update_landings(
            where: {name: {_eq: "onboarding-only-v4"}},
            _set: {deleted_at: null, published: false}
        ) {
            returning {
            name
            deleted_at
            published
            }
        }
        }
        `,
    },
    failOnStatusCode: false,
  }).then((response) => {
    if (response.status === 200) {
      cy.log('Landing activated and published successfully:', response.body);
      expect(response.status).to.eq(200);
    } else {
      cy.log('API request failed:', response);
      assert.fail(`API request failed with status code: ${response.status}`);
    }
  });
});

Cypress.Commands.add('api_ActivateRENIECForm', () => {
  cy.request({
    method: 'POST',
    url: stgDB_URL,
    headers: {
      'x-hasura-admin-secret': stgDB_secret,
    },
    body: {
      query: `mutation RestoreLanding {
        update_landings(
            where: {name: {_eq: "form-with-reniec-v4"}},
            _set: {deleted_at: null}
        ) {
            returning {
            name
            deleted_at
            }
        }
        }
        `,
    },
    failOnStatusCode: false,
  }).then((response) => {
    if (response.status === 200) {
      cy.log('Landing activated successfully:', response.body);
      expect(response.status).to.eq(200);
    } else {
      cy.log('API request failed:', response);
      assert.fail(`API request failed with status code: ${response.status}`);
    }
  });
});

Cypress.Commands.add('api_ActivateOnboardingDocumentValidation', () => {
  cy.request({
    method: 'POST',
    url: stgDB_URL,
    headers: {
      'x-hasura-admin-secret': stgDB_secret,
    },
    body: {
      query: `mutation RestoreLanding {
        update_landings(
            where: {name: {_eq: "odvr"}},
            _set: {deleted_at: null}
        ) {
            returning {
            name
            deleted_at
            }
        }
        }
        `,
    },
    failOnStatusCode: false,
  }).then((response) => {
    if (response.status === 200) {
      cy.log('Landing activated successfully:', response.body);
      expect(response.status).to.eq(200);
    } else {
      cy.log('API request failed:', response);
      assert.fail(`API request failed with status code: ${response.status}`);
    }
  });
});

Cypress.Commands.add('api_ActivateOnbRENIEC', () => {
  cy.request({
    method: 'POST',
    url: stgDB_URL,
    headers: {
      'x-hasura-admin-secret': stgDB_secret,
    },
    body: {
      query: `mutation RestoreLanding {
        update_landings(
            where: {name: {_eq: "onb-reniec"}},
            _set: {deleted_at: null}
        ) {
            returning {
            name
            deleted_at
            }
        }
        }
        `,
    },
    failOnStatusCode: false,
  }).then((response) => {
    if (response.status === 200) {
      cy.log('Landing activated successfully:', response.body);
      expect(response.status).to.eq(200);
    } else {
      cy.log('API request failed:', response);
      assert.fail(`API request failed with status code: ${response.status}`);
    }
  });
});

Cypress.Commands.add('api_ActivateOnbResults', () => {
  cy.request({
    method: 'POST',
    url: stgDB_URL,
    headers: {
      'x-hasura-admin-secret': stgDB_secret,
    },
    body: {
      query: `mutation RestoreLanding {
        update_landings(
            where: {name: {_eq: "onb-results"}},
            _set: {deleted_at: null}
        ) {
            returning {
            name
            deleted_at
            }
        }
        }
        `,
    },
    failOnStatusCode: false,
  }).then((response) => {
    if (response.status === 200) {
      cy.log('Landing activated successfully:', response.body);
      expect(response.status).to.eq(200);
    } else {
      cy.log('API request failed:', response);
      assert.fail(`API request failed with status code: ${response.status}`);
    }
  });
});

Cypress.Commands.add('api_VidContracting', () => {
  cy.request({
    method: 'POST',
    url: stgDB_URL,
    headers: {
      'x-hasura-admin-secret': stgDB_secret,
    },
    body: {
      query: `mutation RestoreLanding {
        update_landings(
            where: {name: {_eq: "vid-contracting"}},
            _set: {deleted_at: null}
        ) {
            returning {
            name
            deleted_at
            }
        }
        }
        `,
    },
    failOnStatusCode: false,
  }).then((response) => {
    if (response.status === 200) {
      cy.log('Landing activated successfully:', response.body);
      expect(response.status).to.eq(200);
    } else {
      cy.log('API request failed:', response);
      assert.fail(`API request failed with status code: ${response.status}`);
    }
  });
});

Cypress.Commands.add('api_OWDVVR', () => {
  cy.request({
    method: 'POST',
    url: stgDB_URL,
    headers: {
      'x-hasura-admin-secret': stgDB_secret,
    },
    body: {
      query: `mutation RestoreLanding {
        update_landings(
            where: {name: {_eq: "owdvvr"}},
            _set: {deleted_at: null}
        ) {
            returning {
            name
            deleted_at
            }
        }
        }
        `,
    },
    failOnStatusCode: false,
  }).then((response) => {
    if (response.status === 200) {
      cy.log('Landing activated successfully:', response.body);
      expect(response.status).to.eq(200);
    } else {
      cy.log('API request failed:', response);
      assert.fail(`API request failed with status code: ${response.status}`);
    }
  });
});

Cypress.Commands.add('api_Auth', () => {
  cy.request({
    method: 'POST',
    url: stgDB_URL,
    headers: {
      'x-hasura-admin-secret': stgDB_secret,
    },
    body: {
      query: `mutation RestoreLanding {
        update_landings(
            where: {name: {_eq: "authentication"}},
            _set: {deleted_at: null}
        ) {
            returning {
            name
            deleted_at
            }
        }
        }
        `,
    },
    failOnStatusCode: false,
  }).then((response) => {
    if (response.status === 200) {
      cy.log('Landing activated successfully:', response.body);
      expect(response.status).to.eq(200);
    } else {
      cy.log('API request failed:', response);
      assert.fail(`API request failed with status code: ${response.status}`);
    }
  });
});

Cypress.Commands.add('api_ActivateForms', () => {
  cy.request({
    method: 'POST',
    url: stgDB_URL,
    headers: {
      'x-hasura-admin-secret': stgDB_secret,
    },
    body: {
      query: `mutation RestoreLanding {
        update_landings(
            where: {name: {_eq: "form-test-page"}},
            _set: {deleted_at: null, status: published}
        ) {
            returning {
            name
            deleted_at
            status
            }
        }
        }
        `,
    },
    failOnStatusCode: false,
  }).then((response) => {
    if (response.status === 200) {
      cy.log('Landing activated successfully:', response.body);
      expect(response.status).to.eq(200);
    } else {
      cy.log('API request failed:', response);
      assert.fail(`API request failed with status code: ${response.status}`);
    }
  });
});

Cypress.Commands.add('api_PreviewLanding', () => {
  cy.request({
    method: 'POST',
    url: stgDB_URL,
    headers: {
      'x-hasura-admin-secret': stgDB_secret,
    },
    body: {
      query: `mutation RestoreLanding {
        update_landings(
            where: {name: {_eq: "preview-landing"}},
            _set: {deleted_at: null}
        ) {
            returning {
            name
            deleted_at
            }
        }
        }
        `,
    },
    failOnStatusCode: false,
  }).then((response) => {
    if (response.status === 200) {
      cy.log('Landing activated successfully:', response.body);
      expect(response.status).to.eq(200);
    } else {
      cy.log('API request failed:', response);
      assert.fail(`API request failed with status code: ${response.status}`);
    }
  });
});

Cypress.Commands.add('api_regressionEmptyArray', () => {
  cy.request({
    method: 'POST',
    url: stgDB_URL,
    headers: {
      'x-hasura-admin-secret': stgDB_secret,
    },
    body: {
      query: `mutation RestoreLanding {
        update_landings(
            where: {name: {_eq: "onb-reg-remove"}},
            _set: {deleted_at: null}
        ) {
            returning {
            name
            deleted_at
            }
        }
        }
        `,
    },
    failOnStatusCode: false,
  }).then((response) => {
    if (response.status === 200) {
      cy.log('Landing activated successfully:', response.body);
      expect(response.status).to.eq(200);
    } else {
      cy.log('API request failed:', response);
      assert.fail(`API request failed with status code: ${response.status}`);
    }
  });
});

Cypress.Commands.add('api_regressionEmptyArrayDropdwon', () => {
  cy.request({
    method: 'POST',
    url: stgDB_URL,
    headers: {
      'x-hasura-admin-secret': stgDB_secret,
    },
    body: {
      query: `mutation RestoreLanding {
        update_landings(
            where: {name: {_eq: "onb-reg-dropdown"}},
            _set: {deleted_at: null, status: to_be_published}
        ) {
            returning {
            name
            deleted_at,
            status
            }
        }
        }
        `,
    },
    failOnStatusCode: false,
  }).then((response) => {
    if (response.status === 200) {
      cy.log('Landing activated successfully:', response.body);
      expect(response.status).to.eq(200);
    } else {
      cy.log('API request failed:', response);
      assert.fail(`API request failed with status code: ${response.status}`);
    }
  });
});

Cypress.Commands.add('api_deleteDraftLandings', () => {
  cy.request({
    method: 'POST',
    url: stgDB_URL,
    headers: {
      'x-hasura-admin-secret': stgDB_secret,
    },
    body: {
      query: `mutation RestoreLanding {
          delete_landings(where: {status: {_eq: draft}}) {
            returning {
              name
              id
            }
          }
          delete_landing_workflows(where: {name: {_eq: "Test"}}) {
            returning {
              name
            }
          }
        }
        `,
    },
    failOnStatusCode: false,
  }).then((response) => {
    if (response.status === 200) {
      cy.log('Draft landings deleted successfully:', response.body);
      expect(response.status).to.eq(200);
    } else {
      cy.log('API request failed:', response);
      assert.fail(`API request failed with status code: ${response.status}`);
    }
  });
});

Cypress.Commands.add('api_ActivateOnboardingPublish', () => {
  cy.request({
    method: 'POST',
    url: stgDB_URL,
    headers: {
      'x-hasura-admin-secret': stgDB_secret,
    },
    body: {
      query: `mutation RestoreLanding {
          update_landings(where: {name: {_eq: "onboarding-only-v3"}}, _set: {deleted_at: null, published: true}) {
            returning {
              name
              deleted_at
              published
            }
          }
        }
        `,
    },
    failOnStatusCode: false,
  }).then((response) => {
    if (response.status === 200) {
      cy.log('Landing activated and published successfully:', response.body);
      expect(response.status).to.eq(200);
    } else {
      cy.log('API request failed:', response);
      assert.fail(`API request failed with status code: ${response.status}`);
    }
  });
});

Cypress.Commands.add('api_ActivateOnboardingQR', () => {
  cy.request({
    method: 'POST',
    url: stgDB_URL,
    headers: {
      'x-hasura-admin-secret': stgDB_secret,
    },
    body: {
      query: `mutation RestoreLanding {
        update_landings(
            where: {name: {_eq: "onboarding-qr-code"}},
            _set: {deleted_at: null}
        ) {
            returning {
            name
            deleted_at
            }
        }
        }
        `,
    },
    failOnStatusCode: false,
  }).then((response) => {
    if (response.status === 200) {
      cy.log('Landing activated successfully:', response.body);
      expect(response.status).to.eq(200);
    } else {
      cy.log('API request failed:', response);
      assert.fail(`API request failed with status code: ${response.status}`);
    }
  });
});

// Inesert data into Hasura through fixtures

Cypress.Commands.add('insertConfigurationsLandingIntoHasura', (data) => {
  cy.request({
    method: 'POST',
    url: stgDB_URL,
    headers: {
      'x-hasura-admin-secret': stgDB_secret,
    },
    body: {
      query: `
        mutation insertData($objects: [landing_configurations_insert_input!]!) {
          insert_landing_configurations(objects: $objects) {
            returning {
              id
            }
          }
        }
      `,
      variables: {
        objects: data,
      },
    },
    failOnStatusCode: false,
  }).then((response) => {
    if (response.status === 200) {
      cy.log('Configurations inserted successfully:', response.body);
      expect(response.status).to.eq(200);
    } else {
      cy.log('API request failed:', response);
      assert.fail(`API request failed with status code: ${response.status}`);
    }
  });
});

Cypress.Commands.add('insertModulesLandingIntoHasura', (data) => {
  cy.request({
    method: 'POST',
    url: stgDB_URL,
    headers: {
      'x-hasura-admin-secret': stgDB_secret,
    },
    body: {
      query: `
        mutation insertData($objects: [landing_modules_insert_input!]!) {
          insert_landing_modules(objects: $objects) {
            returning {
              id
            }
          }
        }
      `,
      variables: {
        objects: data,
      },
    },
    failOnStatusCode: false,
  }).then((response) => {
    if (response.status === 200) {
      cy.log('Modules inserted successfully:', response.body);
      expect(response.status).to.eq(200);
    } else {
      cy.log('API request failed:', response);
      assert.fail(`API request failed with status code: ${response.status}`);
    }
  });
});

Cypress.Commands.add('insertLandingIntoHasura', (data) => {
  cy.request({
    method: 'POST',
    url: stgDB_URL,
    headers: {
      'x-hasura-admin-secret': stgDB_secret,
    },
    body: {
      query: `
        mutation insertData($objects: [landings_insert_input!]!) {
          insert_landings(objects: $objects) {
            returning {
              id
            }
          }
        }
      `,
      variables: {
        objects: data,
      },
    },
    failOnStatusCode: false,
  }).then((response) => {
    if (response.status === 200) {
      cy.log('Landings inserted successfully:', response.body);
      expect(response.status).to.eq(200);
    } else {
      cy.log('API request failed:', response);
      assert.fail(`API request failed with status code: ${response.status}`);
    }
  });
});

Cypress.Commands.add('insertLandingWorkflowsIntoHasura', (data) => {
  cy.request({
    method: 'POST',
    url: stgDB_URL,
    headers: {
      'x-hasura-admin-secret': stgDB_secret,
    },
    body: {
      query: `
        mutation insertData($objects: [landing_workflows_insert_input!]!) {
          insert_landing_workflows(objects: $objects) {
            returning {
              id
            }
          }
        }
      `,
      variables: {
        objects: data,
      },
    },
    failOnStatusCode: false,
  }).then((response) => {
    if (response.status === 200) {
      cy.log('Workflows inserted successfully:', response.body);
      expect(response.status).to.eq(200);
    } else {
      cy.log('API request failed:', response);
      assert.fail(`API request failed with status code: ${response.status}`);
    }
  });
});

Cypress.Commands.add('insertLandingThemesIntoHasura', (data) => {
  cy.request({
    method: 'POST',
    url: stgDB_URL,
    headers: {
      'x-hasura-admin-secret': stgDB_secret,
    },
    body: {
      query: `
        mutation insertData($objects: [landing_themes_insert_input!]!) {
          insert_landing_themes(objects: $objects) {
            returning {
              id
            }
          }
        }
      `,
      variables: {
        objects: data,
      },
    },
    failOnStatusCode: false,
  }).then((response) => {
    if (response.status === 200) {
      cy.log('Themes inserted successfully:', response.body);
      expect(response.status).to.eq(200);
    } else {
      cy.log('API request failed:', response);
      assert.fail(`API request failed with status code: ${response.status}`);
    }
  });
});

Cypress.Commands.add('insertMediaIntoHasura', (data) => {
  cy.request({
    method: 'POST',
    url: stgDB_URL,
    headers: {
      'x-hasura-admin-secret': stgDB_secret,
    },
    body: {
      query: `
        mutation insertData($objects: [media_insert_input!]!) {
          insert_media(objects: $objects) {
            returning {
              id
            }
          }
        }
      `,
      variables: {
        objects: data,
      },
    },
    failOnStatusCode: false,
  }).then((response) => {
    if (response.status === 200) {
      cy.log('Media inserted successfully:', response.body);
      expect(response.status).to.eq(200);
    } else {
      cy.log('API request failed:', response);
      assert.fail(`API request failed with status code: ${response.status}`);
    }
  });
});

Cypress.Commands.add('api_createFourLandings_AllStatus', () => {
  cy.request({
    method: 'POST',
    url: stgDB_URL,
    headers: {
      'x-hasura-admin-secret': stgDB_secret,
    },
    body: {
      query: `mutation MyMutation {
            insert_landings(objects: [
              {name: "banco-test", published: true, status: draft, user_id: "${userId}"},
              {name: "banco-test2", published: true, status: license_pending, user_id: "${userId}"},
              {name: "banco-test3", published: true, status: published, user_id: "${userId}"},
              {name: "banco-test4", published: true, status: to_be_published, user_id: "${userId}"}
            ]) {
              returning {
                name
                published
                status
                user_id
              }
            }
          }
        `,
    },
    failOnStatusCode: false,
  }).then((response) => {
    if (response.status === 200) {
      cy.log('Landings created successfully:', response.body);
      expect(response.status).to.eq(200);
    } else {
      cy.log('API request failed:', response);
      assert.fail(`API request failed with status code: ${response.status}`);
    }
  });
});

Cypress.Commands.add('api_ActivateOnboardingPublish', () => {
  cy.request({
    method: 'POST',
    url: stgDB_URL,
    headers: {
      'x-hasura-admin-secret': stgDB_secret,
    },
    body: {
      query: `mutation RestoreLanding {
          update_landings(where: {name: {_eq: "onboarding-only-v3"}}, _set: {deleted_at: null, published: true}) {
            returning {
              name
              deleted_at
              published
            }
          }
        }
        `,
    },
    failOnStatusCode: false,
  }).then((response) => {
    if (response.status === 200) {
      cy.log('Landing activated and published successfully:', response.body);
      expect(response.status).to.eq(200);
    } else {
      cy.log('API request failed:', response);
      assert.fail(`API request failed with status code: ${response.status}`);
    }
  });
});

Cypress.Commands.add('api_ActivateOnboardingQR', () => {
  cy.request({
    method: 'POST',
    url: stgDB_URL,
    headers: {
      'x-hasura-admin-secret': stgDB_secret,
    },
    body: {
      query: `mutation RestoreLanding {
        update_landings(
            where: {name: {_eq: "onboarding-qr-code"}},
            _set: {deleted_at: null}
        ) {
            returning {
            name
            deleted_at
            }
        }
        }
        `,
    },
    failOnStatusCode: false,
  }).then((response) => {
    if (response.status === 200) {
      cy.log('Landing activated successfully:', response.body);
      expect(response.status).to.eq(200);
    } else {
      cy.log('API request failed:', response);
      assert.fail(`API request failed with status code: ${response.status}`);
    }
  });
});
