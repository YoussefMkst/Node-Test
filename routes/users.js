const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwtGenerator = require("../utils/jwtGenerator");

// Importing the User model
const User = require("../models/User");


// Register handler
router.post("/register", (req, res)=>{

    // Extracting relevant info from the request body
    const {name, email, password} = req.body;
    
    // Checking the DB for a potential match
    User.findOne({ email : email})
    .then((user)=>{
        // If user exists
        if (user){
            console.log("user duplicated");
            res.send("user duplicated " + user);
        } else{
            const newUser = new User({
                name : name,
                email: email,
                password: password
            });

            // Encrypting the password
            bcrypt.genSalt(10, (err, salt)=>{
                bcrypt.hash(newUser.password, salt, (err, hash)=>{
                    if (err) throw err;
                    // Set password to hashed
                    newUser.password = hash;
                    // Saving the user
                    newUser.save()
                        .then(user =>{
                            console.log("User Saved");
                            console.log(user);
                        })
                        .catch(err => console.log(err));
                });
            });

            // Issuing the token
            const jwtToken = jwtGenerator(newUser._id);

            console.log("-------------- NEW USER ------------");
            res.json({ jwtToken });
        }
    }).catch(err => console.log(err));
});


// Login handler
router.post("/login", (req, res) =>{
    const {email, password} = req.body;
    console.log(req.body);

    // Cheking the DB
    User.findOne({ email : email})
    .then((user)=>{
        if(!user){
            console.log("Invalid email");
            res.send("Invalid email... ");
        } else {
            // Valid email => Check the password
            bcrypt.compare(password, user.password, (err, result) => {
                // Hnadeling the error
                if (err) console.log(err);

                // Checking the comparison result
                // Case 1: password is incorrect
                if (!result){
                    console.log("WRONG PASSWORD");
                    res.send("Wrong password");
                }
                // case 2: Right password => send a JWT
                else{
                    const jwtToken = jwtGenerator(user._id);
                    console.log("-------------- USER LOGGED IN ------------");
                    res.json({ jwtToken });
                }
            });
        }
    })
    .catch((err)=> console.log(err));
});

module.exports = router;