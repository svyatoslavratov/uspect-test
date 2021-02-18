import request from "supertest";

import App from "app";

const app = new App();

beforeAll(async () => {
  await app.init();
});

describe("GET /api/v1/test - a simple API endpoint", () => {
  it("Hello API Request", async () => {
    const result = await request(app.instance).get("/api/v1/test");
    expect(result.body).toEqual({ message: "test route" });
    expect(result.status).toEqual(200);
  });
});
