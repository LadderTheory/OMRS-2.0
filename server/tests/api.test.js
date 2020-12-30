const app = require("../../server");
const supertest = require("supertest");
const request = supertest(app);

describe('API test', () => {
  test("gets the test endpoint", async done => {
    const response = await request.get("/test")
    await expect(response.status).toBe(200);
    await expect(response.body.message).toBe("The backend is working");
    done()
  });
});