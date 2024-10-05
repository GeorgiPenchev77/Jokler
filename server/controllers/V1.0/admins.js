var express = require("express");
var app = express.Router();

//import Mongoose model
const Admin = require("../../models/admin.js")

//-----------------------------------------------------------------POST-------------------------------------------------------------------------------//

app.post('/', async function (req, res, next) {
    let newAdmin = new Admin(req.body);
    try {
        await newAdmin.save();
    } catch (err) {
        return next(err);
    }
    res.status(201).json(newAdmin);
});

//-----------------------------------------------------------------GET-------------------------------------------------------------------------------//

app.get('/', async function (req, res, next) {
    try {
        let admins = await Admin.find({});
        res.json(admins);
    } catch (err) {
        return next(err);
    }
});

app.get('/:username', async function (req, res, next) {
    let username = req.params.username;
    try {
        let admin = await Admin.findOne({ "username": username });
        if (admin == null) {
            return res.status(404).json({ "message": "Admin not found" });
        }
        res.json(admin);
    } catch (err) {
        return next(err);
    }
});

//-----------------------------------------------------------------PUT-------------------------------------------------------------------------------//

app.put('/:username', async function (req, res, next) {
    let username = req.params.username;
    let newAdmin = req.body;
    try {
        let admin = await Admin.findOneAndReplace(
            { "username": username },
            newAdmin,
            { returnNewDocument: true });
        if (admin == null) {
            return res.status(404).json({ "message": "Admin not found" });
        }
        res.json(admin);
    } catch (err) {
        return next(err);
    }
});

//-----------------------------------------------------------------PATCH-------------------------------------------------------------------------------//

app.patch('/:username', async function (req, res, next) {
    let username = req.params.username;
    let newAdmin = req.body;
    try {
        let admin = await Admin.findOneAndReplace(
            { "username": username },
            { $set: newAdmin },
            { returnNewDocument: true }
        );
        if (admin == null) {
            return res.status(404).json({ "message": "Admin not found" });
        }
        res.json(admin);
    } catch (err) {
        return next(err);
    }
});

//-----------------------------------------------------------------DELETE-------------------------------------------------------------------------------//

app.delete('/:username', async function (req, res, next) {
    let username = req.params.username;
    try {
        let admin = await Admin.findOneAndDelete({ "username": username });
        if (admin == null) {
            return res.status(404).json({ "message": "User not found" });
        }
        res.json(admin);
    } catch (err) {
        return next(err);
    }
});

app.delete('/', async function (req, res, next) {
    try {
        await Admin.collection.drop();
    } catch (err) {
        return next(err);
    }

    res.json({ "message": "Admins deleted" });
});

//----------------------------------------------------------------------------------------------------------------------------------------------------//

module.exports = app;