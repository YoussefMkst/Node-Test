// Taken from: https://github.com/l0609890/pern-jwt-tutorial/tree/master/server


const jwt = require("jsonwebtoken");
require("dotenv").config();

// Generates a JWT based on the user id
function jwtGenerator(user_id) {
  const payload = {
    user: {
      id: user_id
    }
  };
  
  return jwt.sign(payload, process.env.jwtSecret, { expiresIn: "1h" });
}

module.exports = jwtGenerator;