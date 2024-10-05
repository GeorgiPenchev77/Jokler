var express = require("express");
var app = express.Router();

//import Mongoose model
const Hashtag = require("../../models/hashtag.js")

//-----------------------------------------------------------------POST-------------------------------------------------------------------------------//

app.post('/', async function (req, res, next) {
    let newHashtag = new Hashtag(req.body);
    try {
        await newHashtag.save();
    } catch (err) {
        return next(err);
    }
    res.status(201).json(newHashtag);
});

//-----------------------------------------------------------------GET-------------------------------------------------------------------------------//

app.get('/', async function (req, res, next) {
    try {
        let tags = await Hashtag.find({});
        res.json(tags);
    } catch (err) {
        return next(err);
    }
});

//get all posts that include a certain hashtag
app.get('/:tag/getRelatedPosts', async function (req, res, next) {
    try {
        const tag = await Hashtag.findOne({ "tag": req.params.tag }).populate("related_posts"); //populate the array so we get objects instead of only ids

        if (tag == null) {
            return res.status(404).json({ message: "Hashtag not found" });
        }

        return res.status(200).json(tag.related_posts);
    }
    catch (error) {
        return res.status(500).json({ message: "Error retrieving related posts", error});
    }
});

//-----------------------------------------------------------------DELETE-------------------------------------------------------------------------------//

app.delete('/', async function (req, res, next) {
    try {
        await Hashtag.collection.drop();
    } catch (err) {
        return next(err);
    }
    res.json({ "message": "Tag deleted" });
});

app.delete('/:tag', async function (req, res, next) {
    let tag = req.params.tag;

    try {
        let hashtag = await Hashtag.findOneAndDelete({ "tag": tag });
        if (hashtag == null) {
            return res.status(404).json({ "message": "Tag not found" });
        }
        res.json(hashtag);
    } catch (err) {
        return next(err);
    }
});

//-----------------------------------------------------------------------------------------------------------------------------------------------------//

module.exports = app;