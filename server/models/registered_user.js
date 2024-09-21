/*
    The followers and following fields in this user schema will be arrays of the ID's 
    of each other user that follows/is followed. 
    Each User can have many posts that will be stored with the Post Id in a similar array.
*/

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const RegisteredUserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
    },
    profile_picture: {
        type: Buffer,
        required: false,
    },
    banner: {
        type: Buffer,
        required: false,
    },
    biography: {
        type: String,
        required: false,
        maxLength: 150,
    },
    followers: [{ type: Schema.Types.ObjectId, ref: "RegisteredUser" }],
    following: [{ type: Schema.Types.ObjectId, ref: "RegisteredUser" }],
    posts:     [{ type: Schema.Types.ObjectId, ref: "Post" }],
});

module.exports = mongoose.model('RegisteredUser', RegisteredUserSchema);