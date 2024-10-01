var express = require("express");
var app = express.Router();

//import Mongoose model
const Jokle = require("../../models/jokler")
const RegisteredUser = require("../../models/registered_user")

app.post('/:username/createPost', async function(req, res, next) {
    try {
    const user = await RegisteredUser.findOne({"username": req.params.username});
    const newJokle = new Jokle(req.body);
    
    if(user == null){
        return res.status(404).json({message: "User not found"});
    }

    newJokle.madeBy = user._id; // Link the "madeBy" relationship to the User Id of the creator
    await newJokle.save();

    user.posts.push(newJokle._id); // Link the Post Id to the User's array of posts
    await user.save();

    } catch(err) {
        return next(err);
    }
    res.status(201).json(newJokle);
});

app.get('/', async function(req, res, next) {
    try{
        let jokles = await Jokle.find({});
        res.json(jokles);
    } catch(err) {
        return next(err);
    }
})

app.get('/:id', async function(req, res, next) {
    let id = req.params.id;
    try {
        let jokle = await Jokle.findById(id);
        if (jokle == null) {
            return res.status(404).json({"message": "Jokle not found"});
        }
        res.json(jokle);
    } catch (err) {
        return next(err);
    }
})

app.put('/:id', async function(req, res, next) {
    let id = req.params.id;
    try {
        let jokle = await Jokle.findByIdAndUpdate(
            id,
            req.body);
        if (jokle == null) {
            return res.status(404).json({"message": "Jokle not found"})
        }
        res.json(jokle);
    } catch(err) {
        return next(err);
    }
})

app.patch('/:id', async function(req, res, next) {
    let id = req.params.id;
    try{
        let jokle = await Jokle.findByIdAndUpdate(
            id,
            {$set: req.body},
            {returnNewDocument: true});
        if(jokle == null){
            return res.status(404).json({"message": "Jokle not found"});
        }
        res.json(jokle);
    } catch(err) {
        return next(err);
    }

})

app.delete('/:id', async function(req, res, next) {
    let id = req.params.id;
    try {
        let jokle = await Jokle.findByIdAndDelete(id);
        if(jokle == null) {
            return res.status(404).json({"message": "Jokle not found"});
        }
        res.json(jokle);
    } catch(err) {
        return next(err);
    }

})

app.delete('/', async function(req, res, next) {
    try{
        await Jokle.collection.drop();
    } catch(err) {
        return next(err);
    }
    res.json("Jokles deleted");
})


app.post('/:username/create/')

module.exports = app;