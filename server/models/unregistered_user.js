const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UnregisteredUserSchema = new Schema({
    valuableInformation: URL,
});

module.exports = mongoose.model('UnregisteredUser', UnregisteredUserSchema);
