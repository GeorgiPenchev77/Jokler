var express = require("express");
var app = express.Router();

//import Mongoose model
const RegisteredUser = require("../../models/registered_user");

//-----------------------------------------------------------------POST-------------------------------------------------------------------------------//

//create User
app.post('/', async function (req, res, next) {
    let newUser = new RegisteredUser(req.body);
    try {
        await newUser.save();
    } catch (err) {
        return next(err);
    }
    res.status(201).json(newUser);
});

//follow a user
app.post('/:username/follow/:followUsername', async function (req, res, next) {
    try {
        const user = await RegisteredUser.findOne({ "username": req.params.username });
        const userToBeFollowed = await RegisteredUser.findOne({ "username": req.params.followUsername });

        if (user == null || userToBeFollowed == null) {
            return res.status(404).json({ "message": "User not found" });
        }

        if (!(userToBeFollowed.followers.includes(user._id) && user.following.includes(userToBeFollowed._id))) {
            userToBeFollowed.followers.push(user._id);
            await userToBeFollowed.save();
            user.following.push(userToBeFollowed._id);
            await user.save();
        }


        return res.status(200).json({ message: "User followed successfully", user, userToBeFollowed });
    }
    catch (error) {
        return res.status(500).json({ message: "Error following user", error });
    }
});

//unfollow a user
app.post('/:username/unfollow/:unfollowUsername', async function (req, res, next) {
    try {
        const user = await RegisteredUser.findOne({ "username": req.params.username });
        const userToBeUnfollowed = await RegisteredUser.findOne({ "username": req.params.unfollowUsername });

        if (user == null || userToBeUnfollowed == null) {
            return res.status(404).json({ "message": "User not found" });
        }

        if (userToBeUnfollowed.followers.includes(user._id) && user.following.includes(userToBeUnfollowed._id)) {
            userToBeUnfollowed.followers.pull(user._id);
            await userToBeUnfollowed.save();
            user.following.pull(userToBeUnfollowed._id);
            await user.save();
        }


        return res.status(200).json({ message: "User unfollowed successfully", user, userToBeUnfollowed });
    }
    catch (error) {
        return res.status(500).json({ message: "Error unfollowing user", error });
    }
});

//-----------------------------------------------------------------GET-------------------------------------------------------------------------------//


app.get('/', async function (req, res, next) {
    try {
        let users = await RegisteredUser.find();
        res.json({ "users": users });
    } catch (err) {
        return next(err);
    }
});


app.get('/:username', async function (req, res, next) {
    let username = req.params.username;
    try {
        let user = await RegisteredUser.findOne({ "username": username });
        if (user == null) {
            return res.status(404).json({ "message": "User not found" });
        }
        res.json(user);
    } catch (err) {
        return next(err);
    }
});

//get followers of user
app.get('/:username/getFollowers', async function (req, res, next) {
    try {
        const user = await RegisteredUser.findOne({ "username": req.params.username }).populate('followers'); // "populate" the field that has an array so it returns objects instead of only ids

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json(user.followers);
    }
    catch (error) {
        return res.status(500).json({ message: "Error retrieving followers", error });
    }
});

//get following of user
app.get('/:username/getFollowing', async function (req, res, next) {
    try {
        const user = await RegisteredUser.findOne({ "username": req.params.username }).populate('following'); // "populate" the field that has an array so it returns objects instead of only ids

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json(user.following);
    }
    catch (error) {
        return res.status(500).json({ message: "Error retrieving following", error });
    }
});

//get posts of user
app.get('/:username/getPosts', async function (req, res, next) {
    try {
        const user = await RegisteredUser.findOne({ "username": req.params.username }).populate('posts'); // "populate" the field that has an array so it returns objects instead of only ids

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json(user.posts);
    }
    catch (error) {
        return res.status(500).json({ message: "Error retrieving posts", error });
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
        res.json(user);
    } catch (err) {
        return next(err);
    }

});

//-----------------------------------------------------------------PATCH-------------------------------------------------------------------------------//

app.patch('/:username', async function (req, res, next) {
    let username = req.params.username;
    let updateUser = req.body;
    //TODO: validate that the username is not attempted to be changed.
    try {
        let user = await RegisteredUser.findOneAndUpdate(
            { "username": username },
            { $set: updateUser },
            { returnNewDocument: true });

        if (user == null) {
            return res.status(404).json({ "message": "User not found" });
        }
        res.json(user);
    } catch (err) {
        return next(err);
    }
});

//-----------------------------------------------------------------DELETE-------------------------------------------------------------------------------//

app.delete('/', async function (req, res, next) {
    try {
        await RegisteredUser.collection.drop();
    } catch (err) {
        return next(err);
    }
    res.json({ "message": "Users deleted" });
});

app.delete('/:username', async function (req, res, next) {
    let username = req.params.username;

    try {
        let user = await RegisteredUser.findOneAndDelete(
            { "username": username });
        if (user == null) {
            return res.status(404).json({ "message": "User not found" });
        }
        res.json(user);
    } catch (err) {
        return next(err);
    }
});

//------------------------------------------------------------------------------------------------------------------------------------------------------//

module.exports = app;