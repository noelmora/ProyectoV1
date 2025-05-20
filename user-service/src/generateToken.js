const jwt = require("jsonwebtoken");

const token = jwt.sign(
  { user: "admin", role: "admin" }, // payload
  "secret_key",
  { expiresIn: "1h" }
);

console.log(token);
