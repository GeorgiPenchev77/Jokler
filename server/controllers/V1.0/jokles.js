var express = require("express");
var app = express.Router();

//import Mongoose model
const Jokle = require("../../models/jokle.js")

//-----------------------------------------------------------------GET-------------------------------------------------------------------------------//

app.get('/', async function (req, res, next) {
    try {
        var jokles = await Jokle.find();
        return res.json(jokles);
    } 
    catch (err) {
        return next(err);
    }
});

app.get('/:id', async function (req, res, next) {
    var id = req.params.id;

    try {
        var jokle = await Jokle.findById(id).populate("comments madeBy hashtags");
        if (jokle == null) {
            return res.status(404).json({ "message": "Jokle not found" });
        }

        return res.json(jokle);
    }
    catch (err) {
        return next(err);
    }
});

//-----------------------------------------------------------------PUT-------------------------------------------------------------------------------//

app.put('/:id', async function (req, res, next) {
    var id = req.params.id;
    try {
        let jokle = await Jokle.findByIdAndUpdate(
            id,
            req.body);
        if (jokle == null) {
            return res.status(404).json({ "message": "Jokle not found" })
        }
        res.json(jokle);
    } catch (err) {
        return next(err);
    }
});

//-----------------------------------------------------------------PATCH-------------------------------------------------------------------------------//

app.patch('/:id', async function (req, res, next) {
    var id = req.params.id;
    
    try {
        var jokle = await Jokle.findByIdAndUpdate(
            id,
            { $set: req.body },
            { returnNewDocument: true });
        
        if (jokle == null) {
            return res.status(404).json({ "message": "Jokle not found" });
        }
        
        return res.json(jokle);
    } 
    catch (err) {
        return next(err);
    }
});

//-----------------------------------------------------------------DELETE-------------------------------------------------------------------------------//

app.delete('/', async function (req, res, next) {
    try {
        await Jokle.collection.drop();
        return res.json({ "message": "Jokles deleted" });
    } 
    catch (err) {
        return next(err);
    }
});

app.delete('/:id', async function (req, res, next) {
    var id = req.params.id;

    try {
        var jokle = await Jokle.findByIdAndDelete(id);
        if (jokle == null) {
            return res.status(404).json({ "message": "Jokle not found" });
        }

        return res.json(jokle);
    } 
    catch (err) {
        return next(err);
    }
});

//-----------------------------------------------------------------------------------------------------------------------------------------------------//

module.exports = app;