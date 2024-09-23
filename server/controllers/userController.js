app.post('/users', function(req, res) {
    let newUser = {
        "id": users.length,
        "username": req.body.username,
        "password": req.body.password
    }
    users.push(newUser);
    res.status(201).json(newUser);
});

app.get('/users', function(req, res) {
    res.json({"users": users});
})

app.get('/users/:id', function(req, res) {
    res.json(users[req.params.id])
})

app.put('/users/:id', function(req, res) {
    let id = req.params.id;
    let updated_user = {
        "id": id,
        "username": req.body.username,
        "password": req.body.password
    }
    users[id] = updated_user;
    res.json(updated_user);
})

app.patch('/users/:id', function(req, res) {
    let id = req.params.id;
    let user = users[id];
    let updated_user = {
        "id": id,
        "username": req.body.username || user.username,
        "password": req.body.password || user.password
    }
    users[id] = updated_user;
    res.json(updated_user);
})

app.delete('/users/:id', function(req, res) {
    let id = req.params.id;
    let user = users[id];
    users = users.filter((user) => user.id != id)
    res.json(user);
})

app.delete('/users', function(req, res) {
    users = [];
    res.json("Users deleted");
})
