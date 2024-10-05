var express = require("express");
var app = express.Router();

//import Mongoose model
const Admin = require("../../models/admin.js")

//-----------------------------------------------------------------POST-------------------------------------------------------------------------------//

app.post('/', async function (req, res, next) {
    var newAdmin = new Admin(req.body);

    try {
        await newAdmin.save();
        return res.status(201).json(newAdmin);
    } 
    catch (err) {
        return next(err);
    }
});

//-----------------------------------------------------------------GET-------------------------------------------------------------------------------//

app.get('/', async function (req, res, next) {
    try {
        var admins = await Admin.find();
        return res.json(admins);
    } 
    catch (err) {
        return next(err);
    }
});

app.get('/:username', async function (req, res, next) {
    var username = req.params.username;

    try {
        var admin = await Admin.findOne({ "username": username });
        if (admin == null) {
            return res.status(404).json({ "message": "Admin not found" });
        }

        return res.json(admin);
    } 
    catch (err) {
        return next(err);
    }
});

//-----------------------------------------------------------------PUT-------------------------------------------------------------------------------//

app.put('/:username', async function (req, res, next) {
    var username = req.params.username;
    var newAdmin = req.body;

    try {
        var admin = await Admin.findOneAndReplace(
            { "username": username },
            newAdmin,
            { returnNewDocument: true });

        if (admin == null) {
            return res.status(404).json({ "message": "Admin not found" });
        }

        return res.json(admin);
    } 
    catch (err) {
        return next(err);
    }
});

//-----------------------------------------------------------------PATCH-------------------------------------------------------------------------------//

app.patch('/:username', async function (req, res, next) {   //TODO: validate that the username is not attempted to be changed.
    var username = req.params.username;
    var updateAdmin = req.body;

    try {
        var admin = await Admin.findOneAndReplace(
            { "username": username },
            { $set: updateAdmin },
            { returnNewDocument: true });

        if (admin == null) {
            return res.status(404).json({ "message": "Admin not found" });
        }

        res.json(admin);
    } 
    catch (err) {
        return next(err);
    }
});

//-----------------------------------------------------------------DELETE-------------------------------------------------------------------------------//

app.delete('/', async function (req, res, next) {
    try {
        await Admin.collection.drop();
        return res.json({ "message": "Admins deleted" });    
    } 
    catch (err) {
        return next(err);
    }

});


app.delete('/:username', async function (req, res, next) {
    var username = req.params.username;

    try {
        var admin = await Admin.findOneAndDelete({ "username": username });
        if (admin == null) {
            return res.status(404).json({ "message": "User not found" });
        }

        return res.json(admin);
    } catch (err) {
        return next(err);
    }
});

//----------------------------------------------------------------------------------------------------------------------------------------------------//

module.exports = app;