var express = require("express");
var app = express.Router();

//import Mongoose model
const Hashtag = require("../../models/hashtag")

app.post('/', async function(req, res, next) {
    let newHashtag = new Hashtag(req.body);
    try {
        await newHashtag.save();
    } catch (err) {
        return next(err);
    }
    res.status(201).json(newHashtag);
});

app.get('/', async function(req, res, next) {
    try{
        let tags = await Hashtag.find();
        res.json({"tags": tags});
    } catch (err) {
        return next(err);
    }
})

app.delete('/:tag', async function(req, res, next) {
    let tag = req.params.tag;

    try{
        let hashtag = await Hashtag.findOneAndDelete({"tag": tag});
        if (hashtag == null){
            return res.status(404).json({"message": "Tag not found"});
        }
        res.json(hashtag);
    } catch (err) {
        return next(err);
    }
})

app.delete('/', async function(req, res, next) {
    try{
        await Hashtag.collection.drop();
    } catch (err) {
        return next(err);
    }
    res.json({"message": "Tag deleted"});
})

module.exports = app;