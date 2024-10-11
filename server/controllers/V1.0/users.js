var express = require("express");
var app = express.Router();

//import Mongoose model
const RegisteredUser = require("../../models/user.js");
const Jokle = require("../../models/jokle.js");
const Hashtag = require("../../models/hashtag.js");


//utility function to find all hashtags in a String
function extractHashtags(content) {
    // Use a regular expression to find all words that start with '#'
    const hashtags = content.match(/#[\w]+/g);

    // Return an array of hashtags without the '#' symbol
    if (hashtags) {
        return hashtags.map(tag => tag.substring(1)); // Remove the '#' symbol from each hashtag
    }
    return [];
}

//-----------------------------------------------------------------POST-------------------------------------------------------------------------------//

//create a user
app.post('/', async function (req, res, next) {
    let newUser = new RegisteredUser(req.body);

    try {
        await newUser.save();
        return res.status(201).json(newUser);
    } 
    catch (err) {
        return next(err);
    }
});

//user creates a new post
app.post('/:username/posts', async function (req, res, next) {
    let newJokle = new Jokle(req.body);
    let username = req.params.username;
    try {
        let user = await RegisteredUser.findOne({ "username": username });

        if (user == null) {
            return res.status(404).json({ "message": "User not found" });
        }

        const hashtagsArray = extractHashtags(newJokle.content);

        for (let tag of hashtagsArray) {    // Save hashtags and update their related_posts array

            let hashtag = await Hashtag.findOne({ tag: tag });  // Try to find the hashtag in the database

            if (hashtag) {  // If the hashtag exists, add the post to its related_posts array if not already added

                if (!hashtag.related_posts.includes(newJokle._id)) {
                    hashtag.related_posts.push(newJokle._id);
                    await hashtag.save();
                }
            } else {     // If the hashtag does not exist, create it and add the post ID to related_posts

                hashtag = new Hashtag({
                    tag: tag,
                    related_posts: [newJokle._id]
                });
                await hashtag.save();
            }

            newJokle.hashtags.push(hashtag._id);     // Add the hashtag to the post's hashtags array
        }

        newJokle.madeBy = user._id; // Link the "madeBy" relationship to the User Id of the creator
        newJokle.type = "post"; // Set the type to post for frontend use
        await newJokle.save();

        user.posts.push(newJokle._id); // Link the Post Id to the User's array of posts
        await user.save();

        return res.status(201).json({ "message": "Post created successfully", newJokle });
    } 
    catch (err) {
        return next(err);
    }
});

//user creates comment
app.post('/:username/posts/:id', async function (req, res, next) {
    let username = req.params.username;
    let newJokle = new Jokle(req.body);
    let jokleId = req.params.id;
    try {
        let user = await RegisteredUser.findOne({ "username": username });
        let jokle = await Jokle.findById(jokleId);

        if (user == null) {
            return res.status(404).json({ message: "User not found" });
        }
        if (jokle == null) {
            return res.status(404).json({ message: "Post not found" });
        }

        const hashtagsArray = extractHashtags(newJokle.content);

        // Save hashtags and update their related_posts array
        for (let tag of hashtagsArray) {
            // Try to find the hashtag in the database
            let hashtag = await Hashtag.findOne({ tag: tag });

            if (hashtag) {
                // If the hashtag exists, add the post to its related_posts array if not already added
                if (!hashtag.related_posts.includes(newJokle._id)) {
                    hashtag.related_posts.push(newJokle._id);
                    await hashtag.save();
                }
            } else {
                // If the hashtag does not exist, create it and add the post ID to related_posts
                hashtag = new Hashtag({
                    tag: tag,
                    related_posts: [newJokle._id]
                });
                await hashtag.save();
            }

            // Add the hashtag to the post's hashtags array
            newJokle.hashtags.push(hashtag._id);
        }

        newJokle.madeBy = user._id; // Link the "madeBy" field for the comment to the userId of the creator
        newJokle.type = "comment"; // Set the type to comment for frontend use
        await newJokle.save();

        user.posts.push(newJokle._id);
        await user.save();

        jokle.comments.push(newJokle._id);
        await jokle.save();

        return res.status(201).json({ message: "Comment created successfully", newJokle });
    }
    catch (err) {
        return next(err);
    }
});

//-----------------------------------------------------------------GET-------------------------------------------------------------------------------//

app.get('/', async function (req, res, next) {
    try {
        let users = await RegisteredUser.find();
        return res.json(users);
    }
    catch (err) {
        return next(err);
    }
});

app.get('/:username', async function (req, res, next) {
    let username = req.params.username;

    try {
        let user = await RegisteredUser.findOne({ "username": username }).populate("followers following").exec();
        if (user == null) {
            return res.status(404).json({ "message": "User not found" });
        }

        return res.json(user);
    } 
    catch (err) {
        return next(err);
    }
});

app.get('/:username/posts', async function (req, res, next) {
    let username = req.params.username;

    try {
        let user = await RegisteredUser.findOne({ "username": username });
        if (user == null) {
            return res.status(404).json({ "message": "User not found" });
        }

        let jokles = await Jokle.find({"madeBy": user._id});

        return res.json(jokles);
    } 
    catch (err) {
        return next(err);
    }
});

app.get('/:username/posts/:id', async function (req, res, next) {
    let username = req.params.username;
    let id = req.params.id;

    try {
        let user = await RegisteredUser.findOne({ "username": username });
        if (user == null) {
            return res.status(404).json({ "message": "User not found" });
        }

        let jokle = await Jokle.findById(id);

        return res.json(jokle);
    } 
    catch (err) {
        return next(err);
    }
});

//-----------------------------------------------------------------PUT-------------------------------------------------------------------------------//

app.put('/:username', async function (req, res, next) {
    let username = req.params.username;
    let newUser = req.body;
    
    try {
        let user = await RegisteredUser.findOneAndReplace(
            { "username": username },
            newUser,
            { returnNewDocument: true });

        if (user == null) {
            return res.status(404).json({ "message": "User not found" });
        }

        return res.json(user);
    } 
    catch (err) {
        return next(err);
    }

});

//-----------------------------------------------------------------PATCH-------------------------------------------------------------------------------//

app.patch('/:username', async function (req, res, next) {   //TODO: validate that the username is not attempted to be changed.
    let username = req.params.username;
    let updateUser = req.body;
    
    try {
        let user = await RegisteredUser.findOneAndUpdate(
            { "username": username },
            { $set: updateUser },
            { returnNewDocument: true });

        if (user == null) {
            return res.status(404).json({ "message": "User not found" });
        }

        return res.json(user);
    } 
    catch (err) {
        return next(err);
    }
});

//-----------------------------------------------------------------DELETE-------------------------------------------------------------------------------//

app.delete('/', async function (req, res, next) {
    try {
        await RegisteredUser.collection.drop();
        return res.json({ "message": "Users deleted" });
    } 
    catch (err) {
        return next(err);
    }

});

app.delete('/:username', async function (req, res, next) {
    let username = req.params.username;

    try {
        let user = await RegisteredUser.findOneAndDelete({ "username": username });
        if (user == null) {
            return res.status(404).json({ "message": "User not found" });
        }

        return res.json(user);
    } 
    catch (err) {
        return next(err);
    }
});

app.delete('/:username/posts', async function (req, res, next) {
    let username = req.params.username;

    try {
        let user = await RegisteredUser.findOne({ "username": username });
        if (user == null) {
            return res.status(404).json({ "message": "User not found" });
        }

        let jokles = await Jokle.deleteMany({"madeBy": user._id});

        return res.json(jokles);
    } 
    catch (err) {
        return next(err);
    }
});

app.delete('/:username/posts/:id', async function (req, res, next) {
    let username = req.params.username;
    let id = req.params.id;

    try {
        let user = await RegisteredUser.findOne({ "username": username });
        if (user == null) {
            return res.status(404).json({ "message": "User not found" });
        }

        let jokle = await Jokle.findByIdAndDelete(id);

        return res.json(jokle);
    } 
    catch (err) {
        return next(err);
    }
});

//------------------------------------------------------------------------------------------------------------------------------------------------------//

module.exports = app;