var express = require("express");
var app = express.Router();

let admins = [];

app.post('/', function(req, res) {
    let newAdmin = {
        "id": admins.length,
        "username": req.body.username,
        "password": req.body.password
    }
    admins.push(newAdmin);
    res.status(201).json(newAdmin);
});

app.get('/', function(req, res) {
    res.json({"admins": admins});
})

app.get('/:id', function(req, res) {
    res.json(admins[req.params.id])
})

app.put('/:id', function(req, res) {
    let id = req.params.id;
    let updated_admin = {
        "id": id,
        "username": req.body.username,
        "password": req.body.password
    }
    admins[id] = updated_admin;
    res.json(updated_admin);
})

app.patch('/:id', function(req, res) {
    let id = req.params.id;
    let admin = admins[id];
    let updated_admin = {
        "id": id,
        "username": req.body.username || admin.username,
        "password": req.body.password || admin.password
    }
    admins[id] = updated_admin;
    res.json(updated_admin);
})

app.delete('/:id', function(req, res) {
    let id = req.params.id;
    let admin = admins[id];
    admins = admins.filter((admin) => admin.id != id)
    res.json(admin);
})

app.delete('/', function(req, res) {
    admins = [];
    res.json("Admins deleted");
})

module.exports = app;