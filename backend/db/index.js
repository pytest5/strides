const pg = require("pg");

const { Pool, Client } = pg;

const connectionString = process.env.POSTGRESQL_URI;

const pool = new Pool({
  connectionString,
});

pool.on("connect", (client) => console.log("connected to pg db"));

const query = (text, params, callback) => {
  const res = pool.query(text, params, callback);
  console.log(
    `Executing: ${text} Params: ${params?.join(", ") || "n.a."} Rows: ${
      res.rowCount || "n.a."
    }`
  );
  return res;
};

module.exports = { query };
