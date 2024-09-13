const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AdminSchema = new Schema({
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
        required: true,
    },
});

module.exports = mongoose.model('Admin', AdminSchema);