var express = require('express');
var mongoose = require('mongoose');
var morgan = require('morgan');
var path = require('path');
var cors = require('cors');
var history = require('connect-history-api-fallback');


// Variables
var mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/JoklerDB';
var port = process.env.PORT || 3001;

// Connect to MongoDB
mongoose.connect(mongoURI).catch(function(err) {
    console.error(`Failed to connect to MongoDB with URI: ${mongoURI}`);
    console.error(err.stack);
    process.exit(1);
}).then(function() {
    console.log(`Connected to MongoDB with URI: ${mongoURI}`); // mistake when forward porting
});

// Create Express app
var app = express();
// Parse requests of content-type 'application/json'
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// HTTP request logger
app.use(morgan('dev'));
// Enable cross-origin resource sharing for frontend must be registered before api
app.options('*', cors());
app.use(cors());


let users = [];
let posts = [];
let admins = [];

// Import routes
app.get('/api', function(req, res) {
    res.json({'message': 'Welcome to your DIT342 backend ExpressJS project!'});
});

//#region Users

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

//#endregion

//#region Post

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
        "content": req.body.content
    }
    posts[id] = updated_post;
    res.json(updated_post);
})

app.patch('/posts/:id', function(req, res) {
    let id = req.params.id;
    let post = posts[id];
    let updated_post = {
        "id": id,
        "content": req.body.content
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

//#endregion

//#region Admin

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
    let updated_admins = {
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

//#endregion

// Catch all non-error handler for api (i.e., 404 Not Found)
app.use('/api/*', function (req, res) {
    res.status(404).json({ 'message': 'Not Found' });
});

// Configuration for serving frontend in production mode
// Support Vuejs HTML 5 history mode
app.use(history());
// Serve static assets
var root = path.normalize(__dirname + '/..');
var client = path.join(root, 'client', 'dist');
app.use(express.static(client));

// Error handler (i.e., when exception is thrown) must be registered last
var env = app.get('env');
// eslint-disable-next-line no-unused-vars
app.use(function(err, req, res, next) {
    console.error(err.stack);
    var err_res = {
        'message': err.message,
        'error': {}
    };
    if (env === 'development') {
        // Return sensitive stack trace only in dev mode
        err_res['error'] = err.stack;
    }
    res.status(err.status || 500);
    res.json(err_res);
});

app.listen(port, function(err) {
    if (err) throw err;
    console.log(`Express server listening on port ${port}, in ${env} mode`);
    console.log(`Backend: http://localhost:${port}/api/`);
    console.log(`Frontend (production): http://localhost:${port}/`);
});

module.exports = app;
