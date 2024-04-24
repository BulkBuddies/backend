import { app, client } from "../../server";
import request from "supertest";
import pool from "../../config/db/db";

afterAll(async () => {
  await pool.end();
  await client.quit();
  // Close the server instance after each test
});


describe("Operations on /user endpoints", () => {
  test("GET/ All users", async () => {
    const { statusCode } = await request(app).get("/user").send();

    expect(statusCode).toBe(200);
  });

  test("DELETE/ user by id returns 204", async () => {
    const userId = "924ae3a7-11ec-4ef4-80dd-cea7f9c78df9";
    const response = await request(app).delete(`/user/${userId}`).send();

    expect(response.statusCode).toBe(204);
  });
});
