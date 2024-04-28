import { app } from "../../server.js";
import request from "supertest";
import pool from "../../config/db/db.js";
import { APP_MOCK } from "../../config/constants.js";
afterAll(async () => {
  await pool.end();

  // Close the server instance after each test
});

describe("Operations on /auth endpoints", () => {
  test("POST / crear un usuario", async () => {
    const user = {
      first_name: "John",
      last_name: "Doe",
      email: "johndoe@example.com",
      username: "johndoe",
      password: "password123",
    };
    const response = await request(APP_MOCK)
      .post("/api/v1/register")
      .send(user);

    expect(response.statusCode).toBe(201);
  });
});
