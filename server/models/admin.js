const mongoose = require("mongoose");

const Schema = mongoose.Schema;  // create a schema object from mongoose 

const AdminSchema = new Schema({
    username: {                  // admin's username needs to be unique
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
        type: Buffer,               // profiel picture will be of type buffer to only store a URL
        required: false,            // admins need to have a profile picture with their real face
    },
});

module.exports = mongoose.model('Admin', AdminSchema);  // export the Admin schema to use in other scripts