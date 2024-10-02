var express = require("express");
var app = express.Router();

//import Mongoose model
const Jokle = require("../../models/jokler")
const RegisteredUser = require("../../models/registered_user")

//create post
app.post('/:username/', async function(req, res, next) {
    try {
    const user = await RegisteredUser.findOne({"username": req.params.username});
    const newJokle = new Jokle(req.body);
    
    if(user == null){
        return res.status(404).json({message: "User not found"});
    }

    newJokle.madeBy = user._id; // Link the "madeBy" relationship to the User Id of the creator
    await newJokle.save();

    user.posts.push(newJokle._id); // Link the Post Id to the User's array of posts
    await user.save();

    return res.status(201).json({message: "Post created successfully", newJokle});

    } catch(error) {
        return res.status(500).json({ message: "Error creating post", error });
    }
});

//create comment
app.post('/:username/createComment/:postId', async function(req, res, next){
    try{
    const user = await RegisteredUser.findOne({"username": req.params.username});
    const newComment = new Jokle(req.body);
    const jokle =  await Jokle.findById(req.params.postId);
    
    if(user == null){
        return res.status(404).json({message: "User not found"});
    }
    if(jokle == null){
        return res.status(404).json({message: "Post not found"});
    }
    
    newComment.madeBy = user._id; // Link the "madeBy" field for the comment to the userId of the creator
    await newComment.save();

    user.posts.push(newComment._id);
    await user.save();

    jokle.comments.push(newComment._id);
    await jokle.save();

    return res.status(201).json({message: "Comment created successfully", newComment});
    }
    catch(error){
        return res.status(500).json({ message: "Error creating post", error });
    }
    
});

//get all posts
app.get('/', async function(req, res, next) {
    try{
        let jokles = await Jokle.find({});
        res.json(jokles);
    } catch(err) {
        return next(err);
    }
})

//get a specific post
app.get('/:id', async function(req, res, next) {
    let id = req.params.id;
    try {
        let jokle = await Jokle.findById(id);
        if (jokle == null) {
            return res.status(404).json({"message": "Jokle not found"});
        }
        res.json(jokle);
    } 
    catch (err) {
        return next(err);
    }
})

//get all comments for a post
app.get('/:id/getComments', async function(req,res, next){
    try{
        const jokle = await Jokle.findById(req.params.id).populate('comments');
        if (jokle == null){
            return res.status(404).json({"message": "Jokle not found"});
        }
        return res.json(jokle.comments);
    }
    catch (error){
        return next(err);
    } 
})

//update post
app.put('/:id', async function(req, res, next) {
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

//update specific part of post
app.patch('/:id', async function(req, res, next) {
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

//delete all comments for a post
app.delete('/:id/deleteComments', async function(req, res, next) {
    try{
        const jokle = await Jokle.findById(req.params.id);
        
        if(jokle == null){
            return res.status(404).json({"message": "Jokle not found"});
        }
        
        jokle.comments = [];
        await jokle.save();

        return res.status(200).json({"messsage": "All comments deleted", jokle});
    }
    catch(err){
        return next(err);
    }
});

//delete post
app.delete('/:id', async function(req, res, next) {
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

//delete all posts
app.delete('/', async function(req, res, next) {
    try{
        await Jokle.collection.drop();
    } catch(err) {
        return next(err);
    }
    res.json("Jokles deleted");
})

module.exports = app;