var express = require("express");
var app = express.Router();

app.post('/admins', async function(req, res, next) {
    let newAdmin = new Admin(req.body);
    try {
        await newAdmin.save();
    } catch (err) {
        return next(err);
    }
    res.status(201).json(newAdmin);
});

app.get('/admins', async function(req, res, next) {
    try{
        let admins = await Admin.find({});
        res.json(admins);
    } catch (err) {
        return next(err);
    }
})

app.get('/admins/:username', async function(req, res, next) {
    let username = req.params.username;
    try{
        let admin = await Admin.findOne({"username": username});
        if(admin == null){
            return res.status(404).json({"message": "Admin not found"});
        }
        res.json(admin);
    } catch (err) {
        return next(err);
    }
})

app.put('/admins/:username', async function(req, res, next) {
    let username = req.params.username;
    let newAdmin = req.body;
    try{
        let admin = await Admin.findOneAndReplace(
            {"username": username},
            newAdmin,
            {returnNewDocument: true});
        if(admin == null){
            return res.status(404).json({"message": "Admin not found"});
        }
        res.json(admin);
    } catch(err) {
        return next(err);
    }
})

app.patch('/admins/:username', async function(req, res, next) {
    let username = req.params.username;
    let newAdmin = req.body;
    try{
        let admin = await Admin.findOneAndReplace(
            {"username": username},
            {$set: newAdmin},
            {returnNewDocument: true}
        );
        if (admin == null){
            return res.status(404).json({"message": "Admin not found"});
        }
        res.json(admin);
    } catch (err) {
        return next(err);
    }
})

app.delete('/admins/:username', async function(req, res, next) {
    let username = req.params.username;
    try {
        let admin = await Admin.findOneAndDelete({"username": username});
        if (admin == null){
            return res.status(404).json({"message": "User not found"});
        }
        res.json(admin);
    } catch (err) {
        return next(err);
    }
})

app.delete('/admins', async function(req, res, next) {
    try{
        await Admin.collection.drop();
    } catch (err) {
        return next(err);
    }

    res.json({"message": "Admins deleted"});
})

module.exports = app;