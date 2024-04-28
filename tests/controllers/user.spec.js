import { app } from "../../server.js";
import request from "supertest";
import pool from "../../config/db/db.js";
import { APP_MOCK } from "../../config/constants.js";
afterAll(async () => {
  await pool.end();
});

describe("Operations on /user endpoints", () => {
  test("GET/ All users", async () => {
    const { statusCode } = await request(app).get("/api/v1/user").send();

    expect(statusCode).toBe(200);
  });
});
