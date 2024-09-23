app.post('/tags', function(req, res) {
    let newTag = {
        "id": tags.length,
        "tag": req.body.tag
    }
    tags.push(newTag);
    res.status(201).json(newTag);
});

app.get('/tags', function(req, res) {
    res.json({"tags": tags});
})

app.get('/tags/:id', function(req, res) {
    res.json(tags[req.params.id])
})

app.put('/tags/:id', function(req, res) {
    let id = req.params.id;
    let updated_tag = {
        "id": id,
        "tag": req.body.tag
    }
    tags[id] = updated_tag;
    res.json(updated_tag);
})

app.patch('/tags/:id', function(req, res) {
    let id = req.params.id;
    let updated_tag = {
        "id": id,
        "tag": req.body.tag
    }
    tags[id] = updated_tag;
    res.json(updated_tag);
})

app.delete('/tags/:id', function(req, res) {
    let id = req.params.id;
    let tag = tags[id];
    tags = tags.filter((tag) => tag.id != id)
    res.json(tag);
})

app.delete('/tags', function(req, res) {
    tags = [];
    res.json("Tags deleted");
})