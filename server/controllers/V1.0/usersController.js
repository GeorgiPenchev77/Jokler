var express = require("express");
var app = express.Router();

//import Mongoose model
const RegisteredUser = require("../../models/registered_user");

app.post('/', async function(req, res, next) {
    let newUser = new RegisteredUser(req.body);
    try {
        await newUser.save();
    } catch (err) {
        return next(err);
    }
    res.status(201).json(newUser);
});

app.get('/', async function(req, res, next) {
    try{
        let users = await RegisteredUser.find();
        res.json({"users": users});
    } catch (err) {
        return next(err);
    }
})

app.get('/:username', async function(req, res, next) {
    let username = req.params.username;
    try {
        let user = await RegisteredUser.findOne({"username": username});
        if(user == null){
            return res.status(404).json({"message": "User not found"});
        }
        res.json(user);
    } catch (err) {
        return next(err);
    }
})

app.put('/:username', async function(req, res, next) {
    let username = req.params.username;
    let newUser = req.body;
    try {
        let user = await RegisteredUser.findOneAndReplace(
            {"username": username},
            newUser,
            {returnNewDocument: true});

        if (user == null){
            return res.status(404).json({"message": "User not found"});
        }
        res.json(user);
    } catch (err) {
        return next(err);
    }

})

app.patch('/:username', async function(req, res, next) {
    let username = req.params.username;
    let updateUser = req.body;
    //TODO: validate that the username is not attempted to be changed.
    try {
        let user = await RegisteredUser.findOneAndUpdate(
            {"username": username},
            {$set: updateUser},
            {returnNewDocument: true});

        if(user == null) {
            return res.status(404).json({"message": "User not found"});
        }
        res.json(user);
    } catch (err) {
        return next(err);
    }
})

app.delete('/:username', async function(req, res, next) {
    let username = req.params.username;

    try{
        let user = await RegisteredUser.findOneAndDelete(
            {"username": username});
        if (user == null){
            return res.status(404).json({"message": "User not found"});
        }
        res.json(user);
    } catch (err) {
        return next(err);
    }
})

app.delete('/', async function(req, res, next) {
    try{
        await RegisteredUser.collection.drop();
    } catch (err) {
        return next(err);
    }
    res.json({"message": "Users deleted"});
})

module.exports = app;