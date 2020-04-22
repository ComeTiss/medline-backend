import request from "supertest";
import expressServer from "../server";

/**
 * Test Exppress server endpoints & terminate server.
 */

describe("loading express", () => {
  const server = expressServer;
  after((done) => {
    server.close(done);
  });
  it("responds to /", (done) => {
    request(server)
      .get("/")
      .expect(404, done);
  });
  it("responds to /signup with invalid requet", (done) => {
    request(server)
      .post("/signup")
      .expect(401, done);
  });
  it("responds to /login with invalid credentials", (done) => {
    request(server)
      .post("/login")
      .expect(403, done);
  });
  it("responds to /graphql without authorization", (done) => {
    request(server)
      .post("/graphql")
      .expect(403, done);
  });
});
