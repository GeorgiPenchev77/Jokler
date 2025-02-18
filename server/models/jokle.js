/*
  All images that will be in different posts will need to be stored locally or on a cloud server
  and the only thing we will be storing in our database is the URL of the image.
  Because of this we will be using multer to retrieve the images in the controller 
  => in client we will fetch the images with the url. This will work similary in all schemas
*/
/*
  See "hashtag.js" for an explanation on the solution to the many-to-many relationship between posts and hashtags.
*/

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PostSchema = new Schema({
    type: {
        type: String,
        enum: ["post", "comment"],
        required: true
    },
    content: {
        type: String,
        required: true,
    },
    image: {
        type: Buffer,
        required: false,
    },
    date: {
        type: Date,
        default: Date.now,
    },     
    dislikes: {
        type: Number,
        default: 0,
    },    
    rejokles: {
        type: Number,
        default: 0,
    },
    comments: [{ type: Schema.Types.ObjectId, ref: "Post"}],
    madeBy: { type: Schema.Types.ObjectId, ref: "RegisteredUser" },
    hashtags: [{ type: Schema.Types.ObjectId, ref: "Hashtag" }],
});

module.exports = mongoose.model('Post', PostSchema);  // export the Post schema to use in other scripts