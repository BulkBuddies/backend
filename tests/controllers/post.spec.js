import { app } from "../../server.js";
import request from "supertest";
import pool from "../../config/db/db.js";
afterAll(async () => {
  await pool.end();

  // Close the server instance after each test
});

describe("Operations on /post endpoints", () => {
  test("GET/ All posts", async () => {
    const { statusCode } = await request(app).get("/api/v1/post").send();

    expect(statusCode).toBe(200);
  });
});
