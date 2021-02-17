import request from "supertest";

import App from "app";

const app = new App();

beforeAll(async () => {
  await app.init();
});

describe("GET /api/v1/hello - a simple API endpoint", () => {
  it("Hello API Request", async () => {
    const result = await request(app.instance).get("/api/v1/hello");
    expect(result.body).toEqual({ text: "hello" });
    expect(result.status).toEqual(200);
  });
});
