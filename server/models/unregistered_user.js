const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UnregisteredUserSchema = new Schema({
    valuableInformation: String,
});

module.exports = mongoose.model('UnregisteredUser', UnregisteredUserSchema);
