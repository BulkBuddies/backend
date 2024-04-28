import { app } from "../../server.js";
import request from "supertest";
import pool from "../../config/db/db.js";
afterAll(async () => {
  await pool.end();

  // Close the server instance after each test
});

describe("Operations on /region endpoints", () => {
  test("GET/ All regions", async () => {
    const { statusCode } = await request(app).get("/api/v1/region").send();

    expect(statusCode).toBe(200);
  });
});
