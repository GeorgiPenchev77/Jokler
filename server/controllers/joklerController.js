app.post('/posts', function(req, res) {
    let newPost = {
        "id": posts.length,
        "type": req.body.type,
        "content": req.body.content,
        "image": req.body.image,
        "date": req.body.date,
        "dislikes": req.body.dislies,
        "madeBy": req.body.madeBy
    }
    posts.push(newPost);
    res.status(201).json(newPost);
});

app.get('/posts', function(req, res) {
    res.json({"posts": posts});
})

app.get('/posts/:id', function(req, res) {
    res.json(posts[req.params.id])
})

app.put('/posts/:id', function(req, res) {
    let id = req.params.id;
    let updated_post = {
        "id": id,
        "type": req.body.type,
        "content": req.body.content,
    }
    posts[id] = updated_post;
    res.json(updated_post);
})

app.patch('/posts/:id', function(req, res) {
    let id = req.params.id;
    let post = posts[id];
    let updated_post = {
        "id": id,
        "type": req.body.type || post.type,
        "content": req.body.content || post.content
    }
    posts[id] = updated_post;
    res.json(updated_post);
})

app.delete('/posts/:id', function(req, res) {
    let id = req.params.id;
    let post = posts[id];
    posts = posts.filter((post) => post.id != id)
    res.json(post);
})

app.delete('/posts', function(req, res) {
    posts = [];
    res.json("Posts deleted");
})