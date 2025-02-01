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
  });
});
