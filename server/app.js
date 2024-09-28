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
let tags = [];

//import Mongoose models
const RegisteredUser = require("./models/registered_user");
const Admin = require("./models/admin")
const Jokle = require("./models/jokle")
const Hashtag = require("./models/hashtag")



// Import routes
app.get('/api', function(req, res) {
    res.json({'message': 'Welcome to your DIT342 backend ExpressJS project!'});
});

var usersController = require('./controllers/V1.0/usersController');
var postController = require('./controllers/V1.0/joklersController')
var adminController = require('./controllers/V1.0/adminsController')
var tagController = require('./controllers/V1.0/tagsController')

app.use('/users', usersController);
app.use('/posts', postController)
app.use('/admins', adminController)
app.use('/tags', tagController)
//#region Users

app.post('/users', async function(req, res, next) {
    let newUser = new RegisteredUser(req.body);
    try {
        await newUser.save();
    } catch (err) {
        return next(err);
    }
    res.status(201).json(newUser);
});

app.get('/users', async function(req, res, next) {
    try{
        let users = await RegisteredUser.find();
        res.json({"users": users});
    } catch (err) {
        return next(err);
    }
})

app.get('/users/:username', async function(req, res, next) {
    let username = req.params.username;
    try {
        let user = await RegisteredUser.findOne({"username": username});
        if(user == null){
            return res.status(404).json({"message": "User not found"});
        }
        res.json(user);
    } catch (err) {
        return next(err);
    }
})

app.put('/users/:username', async function(req, res, next) {
    let username = req.params.username;
    let newUser = req.body;
    try {
        let user = await RegisteredUser.findOneAndReplace(
            {"username": username},
            newUser,
            {returnNewDocument: true});

        if (user == null){
            return res.status(404).json({"message": "User not found"});
        }
        res.json(user);
    } catch (err) {
        return next(err);
    }

})

app.patch('/users/:username', async function(req, res, next) {
    let username = req.params.username;
    let updateUser = req.body;
    //TODO: validate that the username is not attempted to be changed.
    try {
        let user = await RegisteredUser.findOneAndUpdate(
            {"username": username},
            {$set: updateUser},
            {returnNewDocument: true});

        if(user == null) {
            return res.status(404).json({"message": "User not found"});
        }
        res.json(user);
    } catch (err) {
        return next(err);
    }
})

app.delete('/users/:username', async function(req, res, next) {
    let username = req.params.username;

    try{
        let user = await RegisteredUser.findOneAndDelete(
            {"username": username});
        if (user == null){
            return res.status(404).json({"message": "User not found"});
        }
        res.json(user);
    } catch (err) {
        return next(err);
    }
})

app.delete('/users', async function(req, res, next) {
    try{
        await RegisteredUser.collection.drop();
    } catch (err) {
        return next(err);
    }
    res.json({"message": "Users deleted"});
})

//#endregion

//#region Post

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

//#endregion

//#region Admin

app.post('/admins', async function(req, res, next) {
    let newAdmin = new Admin(req.body);
    try {
        await newAdmin.save();
    } catch (err) {
        return next(err);
    }
    res.status(201).json(newAdmin);
});

app.get('/admins', async function(req, res, next) {
    try{
        let admins = await Admin.find({});
        res.json(admins);
    } catch (err) {
        return next(err);
    }
})

app.get('/admins/:username', async function(req, res, next) {
    let username = req.params.username;
    try{
        let admin = await Admin.findOne({"username": username});
        if(admin == null){
            return res.status(404).json({"message": "Admin not found"});
        }
        res.json(admin);
    } catch (err) {
        return next(err);
    }
})

app.put('/admins/:username', async function(req, res, next) {
    let username = req.params.username;
    let newAdmin = req.body;
    try{
        let admin = await Admin.findOneAndReplace(
            {"username": username},
            newAdmin,
            {returnNewDocument: true});
        if(admin == null){
            return res.status(404).json({"message": "Admin not found"});
        }
        res.json(admin);
    } catch(err) {
        return next(err);
    }
})

app.patch('/admins/:username', async function(req, res, next) {
    let username = req.params.username;
    let newAdmin = req.body;
    try{
        let admin = await Admin.findOneAndReplace(
            {"username": username},
            {$set: newAdmin},
            {returnNewDocument: true}
        );
        if (admin == null){
            return res.status(404).json({"message": "Admin not found"});
        }
        res.json(admin);
    } catch (err) {
        return next(err);
    }
})

app.delete('/admins/:username', async function(req, res, next) {
    let username = req.params.username;
    try {
        let admin = await Admin.findOneAndDelete({"username": username});
        if (admin == null){
            return res.status(404).json({"message": "User not found"});
        }
        res.json(admin);
    } catch (err) {
        return next(err);
    }
})

app.delete('/admins', async function(req, res, next) {
    try{
        await Admin.collection.drop();
    } catch (err) {
        return next(err);
    }

    res.json({"message": "Admins deleted"});
})

//#endregion

//#region Tags

app.post('/tags', async function(req, res, next) {
    let newHashtag = new Hashtag(req.body);
    try {
        await newHashtag.save();
    } catch (err) {
        return next(err);
    }
    res.status(201).json(newHashtag);
});

app.get('/tags', async function(req, res, next) {
    try{
        let tags = await Hashtag.find();
        res.json({"tags": tags});
    } catch (err) {
        return next(err);
    }
})

app.delete('/tags/:tag', async function(req, res, next) {
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

app.delete('/tags', async function(req, res, next) {
    try{
        await Hashtag.collection.drop();
    } catch (err) {
        return next(err);
    }
    res.json({"message": "Tag deleted"});
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
