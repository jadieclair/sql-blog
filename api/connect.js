import mysql from "mysql";

export const db = mysql.createConnection({
  host: "localhost",
  user: "newUser",
  password: "password",
  database: "social",
});
