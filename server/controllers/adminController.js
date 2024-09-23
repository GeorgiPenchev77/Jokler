app.post('/admins', function(req, res) {
    let newAdmin = {
        "id": admins.length,
        "username": req.body.username,
        "password": req.body.password
    }
    admins.push(newAdmin);
    res.status(201).json(newAdmin);
});

app.get('/admins', function(req, res) {
    res.json({"admins": admins});
})

app.get('/admins/:id', function(req, res) {
    res.json(admins[req.params.id])
})

app.put('/admins/:id', function(req, res) {
    let id = req.params.id;
    let updated_admin = {
        "id": id,
        "username": req.body.username,
        "password": req.body.password
    }
    admins[id] = updated_admin;
    res.json(updated_admin);
})

app.patch('/admins/:id', function(req, res) {
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

app.delete('/admins/:id', function(req, res) {
    let id = req.params.id;
    let admin = admins[id];
    admins = admins.filter((admin) => admin.id != id)
    res.json(admin);
})

app.delete('/admins', function(req, res) {
    admins = [];
    res.json("Admins deleted");
})