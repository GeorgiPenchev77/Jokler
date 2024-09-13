const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const HashtagSchema = new Schema({

    tag: {
       type: String,
       required: true,
       unique: true, 
    },

});

module.exports = mongoose.model('Hashtag', HashtagSchema);