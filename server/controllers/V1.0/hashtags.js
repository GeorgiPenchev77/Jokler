var express = require("express");
var app = express.Router();

//import Mongoose model
const Hashtag = require("../../models/hashtag.js")

//-----------------------------------------------------------------POST-------------------------------------------------------------------------------//

app.post('/', async function (req, res, next) {
    var newHashtag = new Hashtag(req.body);
    
    try {
        await newHashtag.save();
        res.status(201).json(newHashtag);
    } 
    catch (err) {
        return next(err);
    }
});

//-----------------------------------------------------------------GET-------------------------------------------------------------------------------//

app.get('/', async function (req, res, next) {
    try {
        var tags = await Hashtag.find({});
        return res.json(tags);
    } 
    catch (err) {
        return next(err);
    }
});

//get all posts that include a certain hashtag
app.get('/:tag', async function (req, res, next) {
    var tag = req.params.tag;
    try {
        var hashtag = await Hashtag.findOne({ "tag": tag }).populate("related_posts").exec(); //populate the array so we get objects instead of only ids
        if (tag == null) {
            return res.status(404).json({ message: "Hashtag not found" });
        }

        return res.json(tag);
    }
    catch (err) {
        return next(err);
    }
});

//-----------------------------------------------------------------DELETE-------------------------------------------------------------------------------//

app.delete('/', async function (req, res, next) {
    try {
        await Hashtag.collection.drop();
        return res.json({ "message": "Tags deleted" });
    } 
    catch (err) {
        return next(err);
    }
    
});

app.delete('/:tag', async function (req, res, next) {
    var tag = req.params.tag;

    try {
        var hashtag = await Hashtag.findOneAndDelete({ "tag": tag });
        if (hashtag == null) {
            return res.status(404).json({ "message": "Tag not found" });
        }

        return res.json(hashtag);
    } 
    catch (err) {
        return next(err);
    }
});

//-----------------------------------------------------------------------------------------------------------------------------------------------------//

module.exports = app;