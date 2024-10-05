var express = require("express");
var app = express.Router();

//import Mongoose model
const Jokle = require("../../models/jokler")

//-----------------------------------------------------------------GET-------------------------------------------------------------------------------//

app.get('/', async function (req, res, next) {
    try {
        let jokles = await Jokle.find({});
        res.json(jokles);
    } catch (err) {
        return next(err);
    }
});

app.get('/:id', async function (req, res, next) {
    let id = req.params.id;
    try {
        let jokle = await Jokle.findById(id);
        if (jokle == null) {
            return res.status(404).json({ "message": "Jokle not found" });
        }
        res.json(jokle);
    }
    catch (err) {
        return next(err);
    }
});

//get all comments for a post
app.get('/:id/getComments', async function (req, res, next) {
    try {
        const jokle = await Jokle.findById(req.params.id).populate('comments');
        if (jokle == null) {
            return res.status(404).json({ "message": "Jokle not found" });
        }
        return res.json(jokle.comments);
    }
    catch (error) {
        return next(err);
    }
});

//get all hashtags for a post
app.get('/:id/getHashtags', async function (req, res, next) {
    try {
        const jokle = await Jokle.findById(req.params.id).populate('hashtags');
        if (jokle == null) {
            return res.status(404).json({ "message": "Jokle not found" });
        }
        return res.json(jokle.hashtags);
    }
    catch (error) {
        return next(err);
    }
});

//-----------------------------------------------------------------PUT-------------------------------------------------------------------------------//

app.put('/:id', async function (req, res, next) {
    let id = req.params.id;
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
    let id = req.params.id;
    try {
        let jokle = await Jokle.findByIdAndUpdate(
            id,
            { $set: req.body },
            { returnNewDocument: true });
        if (jokle == null) {
            return res.status(404).json({ "message": "Jokle not found" });
        }
        res.json(jokle);
    } catch (err) {
        return next(err);
    }
});

//-----------------------------------------------------------------DELETE-------------------------------------------------------------------------------//

//delete all comments for a post
app.delete('/:id/deleteComments', async function (req, res, next) {
    try {
        const jokle = await Jokle.findById(req.params.id);

        if (jokle == null) {
            return res.status(404).json({ "message": "Jokle not found" });
        }

        jokle.comments = [];
        await jokle.save();

        return res.status(200).json({ "messsage": "All comments deleted", jokle });
    }
    catch (err) {
        return next(err);
    }
});

app.delete('/:id', async function (req, res, next) {
    let id = req.params.id;
    try {
        let jokle = await Jokle.findByIdAndDelete(id);
        if (jokle == null) {
            return res.status(404).json({ "message": "Jokle not found" });
        }
        res.json(jokle);
    } catch (err) {
        return next(err);
    }
});

app.delete('/', async function (req, res, next) {
    try {
        await Jokle.collection.drop();
    } catch (err) {
        return next(err);
    }
    res.json("Jokles deleted");
});

//-----------------------------------------------------------------------------------------------------------------------------------------------------//

module.exports = app;