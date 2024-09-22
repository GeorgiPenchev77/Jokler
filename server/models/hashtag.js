/* 
  Hashtags will only store the information about their actual "tag".
  They will serve as connections between posts in order to implement
  a recommendation algorithm for users. 
*/

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const HashtagSchema = new Schema({

    tag: {
       type: String,
       required: true,
       unique: true, 
    },
    
    related_posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],

});

module.exports = mongoose.model('Hashtag', HashtagSchema); // export the Hashtag Schema to use in other scripts 