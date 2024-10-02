var express = require("express");
var app = express.Router();

//import Mongoose model
const Jokle = require("../../models/jokler")
const RegisteredUser = require("../../models/registered_user")
const Hashtag = require("../../models/hashtag.js")

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

//create post with a user and hashtags
app.post('/:username', async function (req, res, next) {
    try {
        const user = await RegisteredUser.findOne({ "username": req.params.username });
        const newJokle = new Jokle(req.body);

        if (user == null) {
            return res.status(404).json({ message: "User not found" });
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

        newJokle.madeBy = user._id; // Link the "madeBy" relationship to the User Id of the creator
        await newJokle.save();

        user.posts.push(newJokle._id); // Link the Post Id to the User's array of posts
        await user.save();

        return res.status(201).json({ message: "Post created successfully", newJokle });

    } catch (error) {
        return res.status(500).json({ message: "Error creating post", error });
    }
});

//create comment
app.post('/:username/createComment/:postId', async function (req, res, next) {
    try {
        const user = await RegisteredUser.findOne({ "username": req.params.username });
        const newJokle = new Jokle(req.body);
        const jokle = await Jokle.findById(req.params.postId);

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
        await newJokle.save();

        user.posts.push(newJokle._id);
        await user.save();

        jokle.comments.push(newJokle._id);
        await jokle.save();

        return res.status(201).json({ message: "Comment created successfully", newJokle });
    }
    catch (error) {
        return res.status(500).json({ message: "Error creating post", error });
    }
});

//-----------------------------------------------------------------GET-------------------------------------------------------------------------------//

app.get('/', async function (req, res, next) {
    try {
        let jokles = await Jokle.find({});
        res.json(jokles);
    } catch (err) {
        return next(err);
    }
});

app.get('/:id', async function (req, res, next) {
    let id = req.params.id;
    try {
        let jokle = await Jokle.findById(id);
        if (jokle == null) {
            return res.status(404).json({ "message": "Jokle not found" });
        }
        res.json(jokle);
    }
    catch (err) {
        return next(err);
    }
});

//get all comments for a post
app.get('/:id/getComments', async function (req, res, next) {
    try {
        const jokle = await Jokle.findById(req.params.id).populate('comments');
        if (jokle == null) {
            return res.status(404).json({ "message": "Jokle not found" });
        }
        return res.json(jokle.comments);
    }
    catch (error) {
        return next(err);
    }
});

//get all hashtags for a post
app.get('/:id/getHashtags', async function (req, res, next) {
    try {
        const jokle = await Jokle.findById(req.params.id).populate('hashtags');
        if (jokle == null) {
            return res.status(404).json({ "message": "Jokle not found" });
        }
        return res.json(jokle.hashtags);
    }
    catch (error) {
        return next(err);
    }
});

//-----------------------------------------------------------------PUT-------------------------------------------------------------------------------//

app.put('/:id', async function (req, res, next) {
    let id = req.params.id;
    try {
        let jokle = await Jokle.findByIdAndUpdate(
            id,
            req.body);
        if (jokle == null) {
            return res.status(404).json({ "message": "Jokle not found" })
        }
        res.json(jokle);
    } catch (err) {
        return next(err);
    }
});

//-----------------------------------------------------------------PATCH-------------------------------------------------------------------------------//

app.patch('/:id', async function (req, res, next) {
    let id = req.params.id;
    try {
        let jokle = await Jokle.findByIdAndUpdate(
            id,
            { $set: req.body },
            { returnNewDocument: true });
        if (jokle == null) {
            return res.status(404).json({ "message": "Jokle not found" });
        }
        res.json(jokle);
    } catch (err) {
        return next(err);
    }
});

//-----------------------------------------------------------------DELETE-------------------------------------------------------------------------------//

//delete all comments for a post
app.delete('/:id/deleteComments', async function (req, res, next) {
    try {
        const jokle = await Jokle.findById(req.params.id);

        if (jokle == null) {
            return res.status(404).json({ "message": "Jokle not found" });
        }

        jokle.comments = [];
        await jokle.save();

        return res.status(200).json({ "messsage": "All comments deleted", jokle });
    }
    catch (err) {
        return next(err);
    }
});

app.delete('/:id', async function (req, res, next) {
    let id = req.params.id;
    try {
        let jokle = await Jokle.findByIdAndDelete(id);
        if (jokle == null) {
            return res.status(404).json({ "message": "Jokle not found" });
        }
        res.json(jokle);
    } catch (err) {
        return next(err);
    }
});

app.delete('/', async function (req, res, next) {
    try {
        await Jokle.collection.drop();
    } catch (err) {
        return next(err);
    }
    res.json("Jokles deleted");
});

//-----------------------------------------------------------------------------------------------------------------------------------------------------//

module.exports = app;