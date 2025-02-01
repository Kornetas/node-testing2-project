const environment = process.env.NODE_ENV === "test" ? "test" : "development";
const knexConfig = require("./knexfile");



const config = knexConfig[environment];

if (!config) {
  throw new Error(
    `Knex configuration for environment '${environment}' not found!`
  );
}

const knex = require("knex")(config);
module.exports = knex;
