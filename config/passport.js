const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// User model
const User = require("../models/User");

// Exports
module.exports = function (passport){
    passport.use(
        new LocalStrategy({usernameField : 'email'}, (email, password, done) => {
            // Match user
            User.findOne({ email : email})
                .then( (user) => {
                    if (!user){
                        // User not matched
                        return done(null, false, {message: 'Email not registered..'});
                    }

                    // User/email matched => checking the password
                    bcrypt.compare(password, user.password, (err, isMatch)=>{
                        if (err) throw(err);
                        // If the password matches
                        if(isMatch){
                            return done(null, user);
                        } else {
                            return done(null, false, {message : 'Password not matched..'});
                        }
                    });
                })
                .catch(err => console.log(err));
        })
    );

    passport.serializeUser((user, done) => {
        done(null, user.id);
      });
    
      passport.deserializeUser( (id, done) => {
        User.findById(id, (err, user)=> {
          done(err, user);
        });
      });


};