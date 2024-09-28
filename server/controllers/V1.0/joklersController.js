var express = require("express");
var app = express.Router();

app.post('/posts', async function(req, res, next) {
    let newJokle = new Jokle(req.body);
    try {
        await newJokle.save();
    } catch(err) {
        return next(err);
    }
    res.status(201).json(newJokle);
});

app.get('/posts', async function(req, res, next) {
    try{
        let jokles = await Jokle.find({});
        res.json(jokles);
    } catch(err) {
        return next(err);
    }
})

app.get('/posts/:id', async function(req, res, next) {
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

app.put('/posts/:id', async function(req, res, next) {
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

app.patch('/posts/:id', async function(req, res, next) {
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

app.delete('/posts/:id', async function(req, res, next) {
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

app.delete('/posts', async function(req, res, next) {
    try{
        await Jokle.collection.drop();
    } catch(err) {
        return next(err);
    }
    res.json("Jokles deleted");
})

module.exports = app;