var express = require("express");
var app = express.Router();

let tags = [];

app.post('/', function(req, res) {
    let newTag = {
        "id": tags.length,
        "tag": req.body.tag
    }
    tags.push(newTag);
    res.status(201).json(newTag);
});

app.get('/', function(req, res) {
    res.json({"tags": tags});
})

app.get('/:id', function(req, res) {
    res.json(tags[req.params.id])
})

app.put('/:id', function(req, res) {
    let id = req.params.id;
    let updated_tag = {
        "id": id,
        "tag": req.body.tag
    }
    tags[id] = updated_tag;
    res.json(updated_tag);
})

app.patch('/:id', function(req, res) {
    let id = req.params.id;
    let updated_tag = {
        "id": id,
        "tag": req.body.tag
    }
    tags[id] = updated_tag;
    res.json(updated_tag);
})

app.delete('/:id', function(req, res) {
    let id = req.params.id;
    let tag = tags[id];
    tags = tags.filter((tag) => tag.id != id)
    res.json(tag);
})

app.delete('/', function(req, res) {
    tags = [];
    res.json("Tags deleted");
})

module.exports = app;