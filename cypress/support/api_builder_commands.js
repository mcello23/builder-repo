const accessToken = Cypress.env('HASURA_ADMIN_SECRET');
const userId = Cypress.env('USER_ID_USER');

Cypress.Commands.add('api_clearUserDB', () => {
  cy.request({
    method: 'POST',
    url: Cypress.env('API_STAG_URL'),
    headers: {
      'x-hasura-admin-secret': accessToken,
    },
    body: {
      query: `mutation MyMutation {
          delete_tags_mobile_sdks(where: {mobile_sdk: {user_id: {_eq: "${userId}"}}}) {
            returning {
              tag_id
            }
          }
          delete_tags_landings(where: {landing: {user_id: {_eq: "${userId}"}}}) {
            returning {
              tag_id
            }
          }
          delete_landings(where: {user_id: {_eq: "${userId}"}}) {
            returning {
              id
              name
            }
          }
          delete_landing_workflows(where: {user_id: {_eq: "${userId}"}}) {
            returning {
              user_id
              name
            }
          }
          delete_landing_modules(where: {user_id: {_eq: "${userId}"}}) {
            returning {
              user_id
              landing_id
            }
          }
          delete_landing_configurations(where: {user_id: {_eq: "${userId}"}}) {
            returning {
              id
            }
          }
          delete_landing_themes(where: {user_id: {_eq: "${userId}"}}) {
            returning {
              user_id
            }
          }
          delete_mobile_sdks(where: {user_id: {_eq: "${userId}"}}) {
            returning {
              id
            }
          }
          delete_mobile_sdks_configurations(where: {user_id: {_eq: "${userId}"}}) {
            returning {
              id
            }
          }
          delete_mobile_sdks_theme(where: {user_id: {_eq: "${userId}"}}) {
            returning {
              id
            }
          }
          delete_media(where: {user_id: {_eq: "${userId}"}}) {
            returning {
              id
              name
              user_id
            }
          }
          delete_tags(where: {name: {_is_null: false}}) {
            returning {
              name
            }
          }
          delete_user_clients(where: {user_id: {_eq: "${userId}"}}) {
            returning {
              user_id
            }
          }
          insert_user_clients(objects: {client_id: "543eb3df-4268-4d03-b95a-ddf8d4c04316", user_id: "${userId}"}) {
            returning {
              client_id
            }
          }
        }`,
    },
    failOnStatusCode: false,
  }).then((response) => {
    if (response.body.errors) {
      cy.log('GraphQL Errors:', response.body.errors);
    } else {
      expect(response.status).to.eq(200);
      cy.log('Operation is successul:', response.body);
    }
  });
});

Cypress.Commands.add('api_returnDEVTag', () => {
  cy.request({
    method: 'POST',
    url: Cypress.env('API_STAG_URL'),
    headers: {
      'x-hasura-admin-secret': accessToken,
    },
    body: {
      query: `query MyQuery {
        tags(where: {name: {_eq: "DEV"}}) {
          name
        }
      }
      `,
    },
  }).then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body.data.tags[0].name).to.eq('DEV');
    cy.log(response.body);
  });
});
