var express = require('express');
var app = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local');

const RegisteredUser = require("./models/user.js");

passport.use(new LocalStrategy( async function (username, password, done) {
    try{
        let user = await RegisteredUser.findOne({ "username": username })
        if(!user){
            return done(null, false, { "message" : "Incorrect username of password" });
        }
        if(user.password !== password){
            return done(null, false, { "message" : 'Incorrect username or password' });
        }
        return done(null, user);
    }
    catch(err){
        return done(err);
    }
}));

passport.serializeUser( function (user, done) {
    done(null, user);
});

passport.deserializeUser( function (user, done) {
    done(null, user);
})


app.post('/login/password',(req, res, next) =>{
    passport.authenticate('local', (err, user, info) =>{
        if(err){
            return next(err);
        }
        if(!user){
            return res.status(404).json({message: info.message});
        }
        return res.status(200).json({success: true, username: user.username});
    })(req, res, next);
});

module.exports = app;
