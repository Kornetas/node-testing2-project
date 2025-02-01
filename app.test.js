const request = require("supertest");
const knex = require("./knex");
const app = require("./app");

describe("Users API test", () => {
  beforeAll(async () => {
    await knex.migrate.latest();
  });

  afterAll(async () => {
    await knex.migrate.rollback({}, true);
    await knex.destroy();
  });

  let createUserID;

  test("create new user", async () => {
    const newUser = {
      name: "gargamix",
      email: "wlote@k.com",
    };
    const response = await request(app).post("/users").send(newUser);

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.name).toBe(newUser.name);
    expect(response.body.email).toBe(newUser.email);

    createUserID = response.body.id;
  });

  test("retrieves all users", async () => {
    const response = await request(app).get("/users");

    expect(response.statusCode).toBe(200);

    expect(Array.isArray(response.body)).toBe(true);

    const users = response.body;

    const found = users.some((u) => u.id === createUserID);
    expect(found).toBeTruthy();
  });
});
