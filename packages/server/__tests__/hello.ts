import App from "../src/app";
import request from "supertest";

const app = new App();

beforeAll(async () => {
  await app.init();
  app.start();
});

afterAll(async () => {
  app.stop();
});

describe("GET /api/v1/hello - a simple api endpoint", () => {
  it("Hello API Request", async () => {
    const result = await request(app.instance).get("/api/v1/hello");
    expect(result.body).toEqual({ text: "hello" });
    expect(result.status).toEqual(200);
  });
});
