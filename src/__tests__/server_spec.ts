import request from "supertest";
import expressServer from "../server";

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
  it("responds to /graphql without authorization", (done) => {
    request(server)
      .get("/graphql")
      .expect(403, done);
  });
});
