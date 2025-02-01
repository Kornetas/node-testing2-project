const express = require("express");
const knex = require("./knex");
const app = express();
app.use(express.json());

app.post("/users", async (req, res) => {
  const [id] = await knex("users").insert(req.body);
  res.status(201).json({ id, ...req.body });
});

app.get("/users", async (req, res) => {
  const users = await knex("users").select("*");
  res.json(users);
});

if (process.env.NODE_ENV !== "test") {
  app.listen(3000, () => {
    console.log("server run in port 3000");
  });
}

module.exports = app;
