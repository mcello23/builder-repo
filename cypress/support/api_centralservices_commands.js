// Central Services API Commands
const stgDB_URL = Cypress.env('API_STAG_URL');
const stgDB_secret = Cypress.env('HASURA_ADMIN_SECRET');
const stgDB_CSDB_URL = Cypress.env('HASURA_CS_STG_URL');
const stgDB_CSDB_secret = Cypress.env('HASURA_CS_STG_SECRET');
const userId = Cypress.env('USER_ID_USER');

Cypress.Commands.add('api_removeClient', () => {
  cy.request({
    method: 'POST',
    url: stgDB_CSDB_URL,
    headers: {
      'x-hasura-admin-secret': stgDB_CSDB_secret,
    },
    body: {
      query: `mutation MyMutation {
        delete_clients(where: {name: {_eq: "qa-test"}, platform: {_eq: true}, slug: {_eq: "qa-test"}}) {
          returning {
            id
            name
            platform
            slug
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

Cypress.Commands.add('api_seeClients', () => {
  cy.request({
    method: 'POST',
    url: stgDB_CSDB_URL,
    headers: {
      'x-hasura-admin-secret': stgDB_CSDB_secret,
    },
    body: {
      query: `query MyQuery {
          clients {
            id
            name
            slug
          }
        }
        `,
    },
  }).then((response) => {
    cy.log(response.body);
  });
});

Cypress.Commands.add('api_CentralServices_createClientSDKAndroid_NoWidgets', () => {
  cy.request({
    method: 'POST',
    url: stgDB_CSDB_URL,
    headers: {
      'x-hasura-admin-secret': stgDB_CSDB_secret,
    },
    body: {
      query: `mutation MyMutation {
          delete_clients(where: {slug: {_eq: "qa-test"}}) {
            returning {
              slug
            }
          }
          insert_clients_one(object: {name: "qa-test", slug: "qa-test", description: "", platform: true, id: "dc4f1d64-c6a8-41c9-b635-8b11a89f4a8e"}) {
            id
            name
            description
            created_at
            avatar
            active
            tenants_aggregate {
              aggregate {
                count
                __typename
              }
              __typename
            }
            users_aggregate {
              aggregate {
                count
                __typename
              }
              __typename
            }
            __typename
          }
          insert_tenants_one(object: {client_id: "dc4f1d64-c6a8-41c9-b635-8b11a89f4a8e", name: "demo", timezone: "", address: "", users_roles: {data: {role: "ADMIN", user: {data: {email: "testing-user@facephi.com", name: "testing-user@facephi.com", client_id: "dc4f1d64-c6a8-41c9-b635-8b11a89f4a8e"}}, role_id: "e0f0ccb6-cdee-4829-b529-6b0c9d8875e4"}}}) {
            name
            id
            address
            timezone
            tenantId: tenant_id
            __typename
            __typename
          }
          assignService2: insert_clients_services_one(object: {client_id: "dc4f1d64-c6a8-41c9-b635-8b11a89f4a8e", service_id: "ddd9dcfa-ba44-45d4-941c-ebb0f06b3f3b"}) {
            id
            service {
              id
              name
              clients_services_aggregate {
                aggregate {
                  count
                  __typename
                }
                __typename
              }
              __typename
            }
            __typename
          }
        }
      `,
    },
  }).then((response) => {
    expect(response.status).to.eq(200);
    cy.log(response.body);
  });

  cy.request({
    method: 'POST',
    url: stgDB_URL,
    headers: {
      'x-hasura-admin-secret': stgDB_secret,
    },
    body: {
      query: `mutation DeleteAndInsertClients {
        insert_user_clients(objects: {client_id: "dc4f1d64-c6a8-41c9-b635-8b11a89f4a8e", user_id: "${userId}"}) {
          returning {
            client_id
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

Cypress.Commands.add('api_CentralSercvices_createClientSDKiOSAndroid_AllWidgets', () => {
  cy.request({
    method: 'POST',
    url: stgDB_CSDB_URL,
    headers: {
      'x-hasura-admin-secret': stgDB_CSDB_secret,
    },
    body: {
      query: `mutation MyMutation {
        delete_clients(where: {slug: {_eq: "qa-test"}}) {
            returning {
              slug
            }
          }
        insert_clients_one(object: {name: "qa-test", slug: "qa-test", description: "", platform: true, id: "dc4f1d64-c6a8-41c9-b635-8b11a89f4a8e"}) {
          id
          name
          description
          created_at
          avatar
          active
          tenants_aggregate {
            aggregate {
              count
              __typename
            }
            __typename
          }
          users_aggregate {
            aggregate {
              count
              __typename
            }
            __typename
          }
          __typename
        }
        insert_tenants_one(object: {client_id: "dc4f1d64-c6a8-41c9-b635-8b11a89f4a8e", name: "demo", timezone: "", address: "", users_roles: {data: {role: "ADMIN", user: {data: {email: "testing-user@facephi.com", name: "testing-user@facephi.com", client_id: "dc4f1d64-c6a8-41c9-b635-8b11a89f4a8e"}}, role_id: "e0f0ccb6-cdee-4829-b529-6b0c9d8875e4"}}}) {
          name
          id
          address
          timezone
          tenantId: tenant_id
          __typename
          __typename
        }
        assignService2: insert_clients_services_one(object: {client_id: "dc4f1d64-c6a8-41c9-b635-8b11a89f4a8e", service_id: "8f88bc71-33e6-41ce-aa91-f7744c928218"}) {
          id
          service {
            id
            name
            clients_services_aggregate {
              aggregate {
                count
                __typename
              }
              __typename
            }
            __typename
          }
          __typename
        }
      }
      `,
    },
  }).then((response) => {
    expect(response.status).to.eq(200);
    cy.log(response.body);
    let id = response.body.data.assignService2.id;
    cy.log(id);

    cy.request({
      // Adding all widgets here
      method: 'POST',
      url: stgDB_CSDB_URL,
      headers: {
        'x-hasura-admin-secret': stgDB_CSDB_secret,
      },
      body: {
        query: `mutation {
          deleteClientComponentsService: delete_clients_components_services(where: {service_id: {_eq: "${id}"}}) {
            affected_rows
            __typename
          }
          insertClientsComponentsServices: insert_clients_components_services(objects: [
            {service_id: "${id}", component_id: "b83224ad-fab1-45d8-a9da-364ecb317ab8"},
            {service_id: "${id}", component_id: "b83224ad-fab1-45d8-a9da-364ecb317ab9"},
            {service_id: "${id}", component_id: "b83224ad-fab1-45d8-a9da-364ecb317ac1"},
            {service_id: "${id}", component_id: "b83224ad-fab1-45d8-a9da-364ecb317ac2"},
            {service_id: "${id}", component_id: "b83224ad-fab1-45d8-a9da-364ecb317ac4"},
            {service_id: "${id}", component_id: "b83224ad-fab1-45d8-a9da-364ecb317ac5"},
            {service_id: "${id}", component_id: "b83224ad-fab1-45d8-a9da-364ecb317ac6"},
            {service_id: "${id}", component_id: "b83224ad-fab1-45d8-a9da-364ecb317ab5"},
            {service_id: "${id}", component_id: "b83224ad-fab1-45d8-a9da-364ecb317ab6"},
            {service_id: "${id}", component_id: "b83224ad-fab1-45d8-a9da-364ecb317ab7"},
            {service_id: "${id}", component_id: "b83224ad-fab1-45d8-a9da-364ecb317bc1"},
            {service_id: "${id}", component_id: "b83224ad-fab1-45d8-a9da-364ecb317ac7"},
            {service_id: "${id}", component_id: "b83224ad-fab1-45d8-a9da-364ecb317ad7"},
            {service_id: "${id}", component_id: "b83224ad-fab1-45d8-a9da-364ecb317ad8"},
            {service_id: "${id}", component_id: "b83224ad-fab1-45d8-a9da-364ecb317dc1"},
            {service_id: "${id}", component_id: "b83224ad-fab1-45d8-a9da-364ecb317dc2"},
            {service_id: "${id}", component_id: "b83224ad-fab1-45d8-a9da-364ecb317dc3"},
            {service_id: "${id}", component_id: "b83224ad-fab1-45d8-a9da-364ecb317dc4"},
            {service_id: "${id}", component_id: "b83224ad-fab1-45d8-a9da-364ecb317dc5"},
            {service_id: "${id}", component_id: "b83224ad-fab1-45d8-a9da-364ecb317dc6"}
          ]) {
            affected_rows
            returning {
              service_id
              component_id
              __typename
            }
            __typename
          }
        }
        `,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      cy.log(response.body);
    });
  });

  cy.request({
    method: 'POST',
    url: stgDB_URL,
    headers: {
      'x-hasura-admin-secret': stgDB_secret,
    },
    body: {
      query: `mutation DeleteAndInsertClients {
        insert_user_clients(objects: {client_id: "dc4f1d64-c6a8-41c9-b635-8b11a89f4a8e", user_id: "${userId}"}) {
          returning {
            client_id
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

Cypress.Commands.add('api_CentralServices_createClientLanding_NoWidgets', () => {
  cy.request({
    method: 'POST',
    url: stgDB_CSDB_URL,
    headers: {
      'x-hasura-admin-secret': stgDB_CSDB_secret,
    },
    body: {
      query: `mutation MyMutation {
          delete_clients(where: {slug: {_eq: "qa-test"}}) {
            returning {
              slug
            }
          }
        insert_clients_one(object: {name: "qa-test", slug: "qa-test", description: "", platform: true, id: "dc4f1d64-c6a8-41c9-b635-8b11a89f4a8e"}) {
          id
          name
          description
          created_at
          avatar
          active
          tenants_aggregate {
            aggregate {
              count
              __typename
            }
            __typename
          }
          users_aggregate {
            aggregate {
              count
              __typename
            }
            __typename
          }
          __typename
        }
        insert_tenants_one(object: {client_id: "dc4f1d64-c6a8-41c9-b635-8b11a89f4a8e", name: "demo", timezone: "", address: "", users_roles: {data: {role: "ADMIN", user: {data: {email: "testing-user@facephi.com", name: "testing-user@facephi.com", client_id: "dc4f1d64-c6a8-41c9-b635-8b11a89f4a8e"}}, role_id: "e0f0ccb6-cdee-4829-b529-6b0c9d8875e4"}}}) {
          name
          id
          address
          timezone
          tenantId: tenant_id
          __typename
          __typename
        }
        assignService: insert_clients_services_one(object: {client_id: "dc4f1d64-c6a8-41c9-b635-8b11a89f4a8e", service_id: "fcc22a8e-f6c2-4078-ad4b-de6c6d8334b0"}) {
          id
          service {
            id
            name
            clients_services_aggregate {
              aggregate {
                count
                __typename
              }
              __typename
            }
            __typename
          }
          __typename
        }
      }
      `,
    },
  }).then((response) => {
    expect(response.status).to.eq(200);
    cy.log(response.body);
  });

  cy.request({
    method: 'POST',
    url: stgDB_URL,
    headers: {
      'x-hasura-admin-secret': stgDB_secret,
    },
    body: {
      query: `mutation DeleteAndInsertClients {
        insert_user_clients(objects: {client_id: "dc4f1d64-c6a8-41c9-b635-8b11a89f4a8e", user_id: "${userId}"}) {
          returning {
            client_id
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

Cypress.Commands.add('api_CentralServices_createClientLandingAndSDK_NoWidgets', () => {
  cy.request({
    method: 'POST',
    url: stgDB_CSDB_URL,
    headers: {
      'x-hasura-admin-secret': stgDB_CSDB_secret,
    },
    body: {
      query: `mutation MyMutation {
          delete_clients(where: {slug: {_eq: "qa-test"}}) {
            returning {
              slug
            }
          }
        insert_clients_one(object: {name: "qa-test", slug: "qa-test", description: "", platform: true, id: "dc4f1d64-c6a8-41c9-b635-8b11a89f4a8e"}) {
          id
          name
          description
          created_at
          avatar
          active
          tenants_aggregate {
            aggregate {
              count
              __typename
            }
            __typename
          }
          users_aggregate {
            aggregate {
              count
              __typename
            }
            __typename
          }
          __typename
        }
        insert_tenants_one(object: {client_id: "dc4f1d64-c6a8-41c9-b635-8b11a89f4a8e", name: "demo", timezone: "", address: "", users_roles: {data: {role: "ADMIN", user: {data: {email: "testing-user@facephi.com", name: "testing-user@facephi.com", client_id: "dc4f1d64-c6a8-41c9-b635-8b11a89f4a8e"}}, role_id: "e0f0ccb6-cdee-4829-b529-6b0c9d8875e4"}}}) {
          name
          id
          address
          timezone
          tenantId: tenant_id
          __typename
          __typename
        }
        assignService: insert_clients_services_one(object: {client_id: "dc4f1d64-c6a8-41c9-b635-8b11a89f4a8e", service_id: "fcc22a8e-f6c2-4078-ad4b-de6c6d8334b0"}) {
          id
          service {
            id
            name
            clients_services_aggregate {
              aggregate {
                count
                __typename
              }
              __typename
            }
            __typename
          }
          __typename
        }
        assignService2: insert_clients_services_one(object: {client_id: "dc4f1d64-c6a8-41c9-b635-8b11a89f4a8e", service_id: "ddd9dcfa-ba44-45d4-941c-ebb0f06b3f3b"}) {
          id
          service {
            id
            name
            clients_services_aggregate {
              aggregate {
                count
                __typename
              }
              __typename
            }
            __typename
          }
          __typename
        }
      }
      `,
    },
  }).then((response) => {
    expect(response.status).to.eq(200);
    cy.log(response.body);

    cy.request({
      method: 'POST',
      url: stgDB_URL,
      headers: {
        'x-hasura-admin-secret': stgDB_secret,
      },
      body: {
        query: `mutation CreateUser {
        insert_user_clients(objects: {client_id: "dc4f1d64-c6a8-41c9-b635-8b11a89f4a8e", user_id: "${userId}"}) {
          returning {
            client_id
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
});

Cypress.Commands.add('api_CentralServices_createClientLanding_AllWidgets', () => {
  // Adds 'Landing' and 'SDK Web' services to CS
  cy.request({
    method: 'POST',
    url: stgDB_CSDB_URL,
    headers: {
      'x-hasura-admin-secret': stgDB_CSDB_secret,
    },
    body: {
      query: `mutation {
          delete_clients(where: {slug: {_eq: "qa-test"}}) {
            returning {
              slug
            }
          }
        insert_clients_one(object: {name: "qa-test", slug: "qa-test", description: "", platform: true, id: "dc4f1d64-c6a8-41c9-b635-8b11a89f4a8e"}) {
          id
          name
          description
          created_at
          avatar
          active
          tenants_aggregate {
            aggregate {
              count
              __typename
            }
            __typename
          }
          users_aggregate {
            aggregate {
              count
              __typename
            }
            __typename
          }
          __typename
        }
        insert_tenants_one(object: {client_id: "dc4f1d64-c6a8-41c9-b635-8b11a89f4a8e", name: "demo", timezone: "", address: "", users_roles: {data: {role: "ADMIN", user: {data: {email: "testing-user@facephi.com", name: "testing-user@facephi.com", client_id: "dc4f1d64-c6a8-41c9-b635-8b11a89f4a8e"}}, role_id: "e0f0ccb6-cdee-4829-b529-6b0c9d8875e4"}}}) {
          name
          id
          address
          timezone
          tenantId: tenant_id
          __typename
          __typename
        }
        assignService: insert_clients_services_one(object: {client_id: "dc4f1d64-c6a8-41c9-b635-8b11a89f4a8e", service_id: "fcc22a8e-f6c2-4078-ad4b-de6c6d8334b0"}) {
          id
          service {
            id
            name
            clients_services_aggregate {
              aggregate {
                count
                __typename
              }
              __typename
            }
            __typename
          }
          __typename
        }
        assignService2: insert_clients_services_one(object: {client_id: "dc4f1d64-c6a8-41c9-b635-8b11a89f4a8e", service_id: "8f88bc71-33e6-41ce-aa91-f7744c928219"}) {
          id
          service {
            id
            name
            clients_services_aggregate {
              aggregate {
                count
                __typename
              }
              __typename
            }
            __typename
          }
          __typename
        }
      }
      `,
    },
  }).then((response) => {
    expect(response.status).to.eq(200);
    cy.log(response.body);
    let id = response.body.data.assignService.id;
    cy.log(id);

    cy.request({
      // Adding all widgets here
      // cb7 refers to 'legal terms' widget which is not visible atm due to error in CS
      method: 'POST',
      url: stgDB_CSDB_URL,
      headers: {
        'x-hasura-admin-secret': stgDB_CSDB_secret,
      },
      body: {
        query: `mutation {
          deleteClientComponentsService: delete_clients_components_services(where: {service_id: {_eq: "${id}"}}) {
            affected_rows
            __typename
          }
          insertClientsComponentsServices: insert_clients_components_services(objects: [
            {service_id: "${id}", component_id: "b83224ad-fab1-45d8-a9da-364ecb317cb1"},
            {service_id: "${id}", component_id: "b83224ad-fab1-45d8-a9da-364ecb317cb2"},
            {service_id: "${id}", component_id: "b83224ad-fab1-45d8-a9da-364ecb317cb3"},
            {service_id: "${id}", component_id: "b83224ad-fab1-45d8-a9da-364ecb317cb4"},
            {service_id: "${id}", component_id: "b83224ad-fab1-45d8-a9da-364ecb317cb5"},
            {service_id: "${id}", component_id: "b83224ad-fab1-45d8-a9da-364ecb317dc6"},
            {service_id: "${id}", component_id: "b83224ad-fab1-45d8-a9da-364ecb317cb7"},
            {service_id: "${id}", component_id: "b83224ad-fab1-45d8-a9da-364ecb317cb8"},
            {service_id: "${id}", component_id: "b83224ad-fab1-45d8-a9da-364ecb317cb9"},
            {service_id: "${id}", component_id: "b83224ad-fab1-45d8-a9da-364ecb317cc1"}
          ]) {
            affected_rows
            returning {
              service_id
              component_id
              __typename
            }
            __typename
          }
        }
        `,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      cy.log(response.body);
    });
  });

  cy.request({
    method: 'POST',
    url: stgDB_URL,
    headers: {
      'x-hasura-admin-secret': stgDB_secret,
    },
    body: {
      query: `mutation InsertClientUser {
        insert_user_clients(objects: {client_id: "dc4f1d64-c6a8-41c9-b635-8b11a89f4a8e", user_id: "${userId}"}) {
          returning {
            client_id
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

Cypress.Commands.add('api_deleteClientLicenses', () => {
  cy.request({
    method: 'POST',
    url: stgDB_CSDB_URL,
    headers: {
      'x-hasura-admin-secret': stgDB_CSDB_secret,
    },
    body: {
      query: `mutation MyMutation {
        delete_licenses(where: {client_id: {_eq: "543eb3df-4268-4d03-b95a-ddf8d4c04316"}, name: {_eq: "banco-test"}}) {
          returning {
            license
            client_id
            name
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

Cypress.Commands.add('api_deleteSDKLicenses', () => {
  cy.request({
    method: 'POST',
    url: stgDB_CSDB_URL,
    headers: {
      'x-hasura-admin-secret': stgDB_CSDB_secret,
    },
    body: {
      query: `mutation MyMutation {
        delete_licenses(where: {name: {_eq: "sdk-test"}}) {
          returning {
            client_id
            id
            license
            name
            apikey
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
