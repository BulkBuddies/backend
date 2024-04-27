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

  test("DELETE/ usuario que no existe retorna 400", async () => {
    const userId = "924ae3a7-11ec-4ef4-80dd-cea7f9c78df9";
    const response = await request(app).delete(`/user/${userId}`).send();

    expect(response.statusCode).toBe(400);
  });

  test(`GET / se obtiene el objeto products que contiene 
  todos los productos en un array`, async () => {
    const response = await request(app).get("/product").send();
    expect(response.body.products).toEqual(expect.any(Array));
  });

  test("POST / crear un usuario", async () => {
    const user = {
      first_name: "John",
      last_name: "Doe",
      email: "johndoe@example.com",
      username: "johndoe",
      password: "password123",
    };

    
    const response = await request(app).post("/register").send(user);

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ message: "Usuario registrado con éxito" });
  });
});
