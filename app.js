const express = require("express");
const app = express();
const mongoose = require("mongoose");
const passport = require("passport");
const session = require('express-session');


const PORT = process.env.PORT || 5000;


// DB configuration
const db = require("./config/keys").MongoURI;

// Connect to Mongo
mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=> console.log("Connected to MongoDb..."))
    .catch((err)=> console.log(err));

    
// Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));


// Using the router
app.use("/api", require("./routes/index"));
app.use("/users", require("./routes/users"));


app.listen(PORT, ()=> {console.log("Server starting ...")});
 