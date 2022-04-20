const supertest = require("supertest");

const createServer = require("../scripts/server");
const server = createServer();

describe("server", () => {
  test("server launches", async () => {
    await supertest(server)
      .get("/")
      .then(response => {
        expect(response.statusCode).toBe(200);
      });
  });
});
