var express = require("express");
var app = express.Router();

//import Mongoose model
const RegisteredUser = require("../../models/registered_user");

app.post('/', async function(req, res, next) {
    let newUser = new RegisteredUser(req.body);
    try {
        await newUser.save();
    } catch (err) {
        return next(err);
    }
    res.status(201).json(newUser);
});

app.get('/', async function(req, res, next) {
    try{
        let users = await RegisteredUser.find();
        res.json({"users": users});
    } catch (err) {
        return next(err);
    }
})

app.get('/:username', async function(req, res, next) {
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

app.put('/:username', async function(req, res, next) {
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

app.patch('/:username', async function(req, res, next) {
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

app.delete('/:username', async function(req, res, next) {
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

app.delete('/', async function(req, res, next) {
    try{
        await RegisteredUser.collection.drop();
    } catch (err) {
        return next(err);
    }
    res.json({"message": "Users deleted"});
})

// Follow a user
exports.followUser = async (req, res) => {
    try{
        const user = await RegisteredUser.findById(req.params.username);
        const followUser = await RegisteredUser.findById(req.params.followUsername);
        
        if (user == null || followUser == null){
            return res.status(404).json({"message": "User not found"});
    }

        if (!user.followers.includes(followUser.username)){
            user.followers.push(followUser.username);
            await user.save();
        }
    

    return res.status(200).json({message: "User followed successfully", user});
    }
    catch (error){
        return res.status(500).json({ message: "Error following user", error});
    }
};

// Unfollow a user
exports.unfollowUser = async (req, res) => {
    try{
        const user = await RegisteredUser.findById(req.params.username);
        const unfollowUser = await RegisteredUser.findById(req.params.unfollowUsername);
        
        if (user == null || unfollowUser == null){
            return res.status(404).json({"message": "User not found"});
    }

    user.followers = user.followers.filter(followerUsername => followerUsername.toString() !== unfollowUser.username.toString());
    await user.save();


    return res.status(200).json({message: "User unfollowed successfully", user});
    }
    catch (error){
        return res.status(500).json({ message: "Error unfollowing user", error});
    }
};

exports.getFollowers = async (req, res) => {
    try{
        const user = await RegisteredUser.findById(req.params.username).populate('followers');
        
        if(!user){
            return res.status(404).json({ message: 'User not found'});
        }

        return res.status(200).json(user.followers);
    }
    catch (error){
        return res.status(500).json({ message: "Error retrieving followers", error});
    }
};

exports.getFollowing = async (req, res) => {
    try{
        const user = await RegisteredUser.findById(req.params.username).populate('following');
        
        if(!user){
            return res.status(404).json({ message: 'User not found'});
        }

        return res.status(200).json(user.following);
    }
    catch (error){
        return res.status(500).json({ message: "Error retrieving following", error});
    }
};



module.exports = app;