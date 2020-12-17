const app = require("../../server");
const supertest = require("supertest");
const request = supertest(app);
import * as KeycloakMock from "keycloak-node-mock";



// all requests to `https://myserver.com/auth` will now be
// intercepted and replied to


// create a user and a token for it
// const user = keycloak.database.createUser({
//   name: "test",
//   email: "hello@hello.com", // username will be email
//   credentials: [{
//     value: "mypassword",
//   }],
// });

// console.log(user.profile, user.credentials);

// const token = keycloak.createBearerToken(user.profile.id);

// get active mock without a reference


// clear user database
//mock.instance.database.clear();

// find user profile
//const sameUser = mock.instance.database.findUserByID(user.profile.id);

// de-activate the mock


describe('API test', function () {
  // beforeAll(async () => {
  //   const response = await request.get("https://keycloak.sst.k8s.afcentcloud.us/auth/realms/omrs/protocol/openid-connect/token")
  //     .send({
  //       "grant_type": "password",
  //       "client_id": "omrs-fe",
  //       "username": "sst-test",
  //       "password": "password"
  //     })
  // })

  test("gets the test endpoint", async done => {
    const keycloak = await KeycloakMock.createMockInstance({
      authServerURL: "https://keycloak.sst.k8s.afcentcloud.us/auth",
      realm: "omrs",
      credentials: {
        secret: process.env.KC_TOKEN
      },
      clientId: 'omrs-be',
      bearerOnly: true
    });
    const mock = KeycloakMock.activateMock(keycloak);
    const sameMock = KeycloakMock.getMock("https://keycloak.sst.k8s.afcentcloud.us/auth");
    const response = await request.get("/private/feedback")

    expect(response.status).toBe(200);
    //expect(response.body.message).toBe("The backend is working");
    done();
    
  });
  KeycloakMock.deactivateMock(sameMock);
});