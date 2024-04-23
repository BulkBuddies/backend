import { app, client } from "../../server";
import request from "supertest";
import pool from "../../config/db/db";

afterEach(async () => {
  await pool.end();
  await client.quit();
  // Close the server instance after each test
});

describe("Operations on /user endpoints", () => {
  test("GET/ All users", async () => {
    const { statusCode } = await request(app).get("/user").send();

    expect(statusCode).toBe(200);
  });
});
