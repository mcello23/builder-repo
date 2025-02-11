// API Mobile SDK creations commands
const stgDB_URL = Cypress.env('API_STAG_URL');
const stgDB_secret = Cypress.env('HASURA_ADMIN_SECRET');
const userId = Cypress.env('USER_ID_USER');

Cypress.Commands.add('api_createTestMobileSDK', () => {
  cy.request({
    method: 'POST',
    url: stgDB_URL,
    headers: {
      'x-hasura-admin-secret': stgDB_secret,
    },
    body: {
      query: `mutation MyMutation {
            insert_mobile_sdks(objects: {
                id: "876948d7-8e78-4746-a984-91aa74b71bf6",
                license: true,
                name: "qa-sdk",
                published: true,
                status: draft,
                user_id: "${userId}",
                tags: {
                data: [
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
                        name: "DEV"
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
                id
                license
                name
                published
                status
                user_id
                tags {
                    tag {
                    name
                    }
                }
                }
            }
            }
        `,
    },
  }).then((response) => {
    expect(response.status).to.eq(200);
    cy.log(response.body);
  });
});

Cypress.Commands.add('api_createFourSDKs_AllStatus', () => {
  cy.request({
    method: 'POST',
    url: stgDB_URL,
    headers: {
      'x-hasura-admin-secret': stgDB_secret,
    },
    body: {
      query: `mutation MyMutation {
          insert_mobile_sdks(objects: [
            {name: "banco-test", published: true, license: true, status: draft, user_id: "${userId}"},
            {name: "banco-test2", published: true, license: true, status: license_pending, user_id: "${userId}"},
            {name: "banco-test3", published: true, license: true, status: published, user_id: "${userId}"},
            {name: "banco-test4", published: true, license: true, status: to_be_published, user_id: "${userId}"}
          ]) {
            returning {
              license
              name
              published
              status
              user_id
            }
          }
        }
        `,
    },
  }).then((response) => {
    expect(response.status).to.eq(200);
    cy.log(response.body);
  });
});

Cypress.Commands.add('api_createSDK_EnableTracking_Automatic', () => {
  cy.request({
    method: 'POST',
    url: stgDB_URL,
    headers: {
      'x-hasura-admin-secret': stgDB_secret,
    },
    body: {
      query: `mutation MyMutation {
          insert_mobile_sdks(objects: {name: "banco-test", published: true, license: true, status: published, mobile_sdks_configuration: {data: {automatic: true, enableTracking: true, user_id: "${userId}"}}, user_id: "${userId}"}) {
            returning {
              user_id
              published
              name
              status
              license
            }
          }
        }
        `,
    },
  }).then((response) => {
    expect(response.status).to.eq(200);
    cy.log(response.body);
  });
});
