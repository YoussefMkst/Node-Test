// Taken from: https://github.com/l0609890/pern-jwt-tutorial/blob/master/server/middleware/authorize.js

const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
    // Get token from header
    const token = req.header("Authorization");

    // Check if the JWT was not supplied
    if (!token) {
        res.status(403).json({ msg: "authorization denied" });
    }

    console.log("-----TOKEN IS-----");
    console.log(token);

    // Verify token
    jwt.verify(token.split(' ')[1], process.env.jwtSecret, (err, decoded)=>{
        if (err){
            console.log(err);
            res.status(401).json({ msg: "Token is not valid" });
        }
        // No error
        req.user = decoded.user;
        next()
    });
    
};