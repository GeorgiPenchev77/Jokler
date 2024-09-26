/* 
  Hashtags will store the information about their actual "tag".
  They will serve as connections between posts in order to implement
  a recommendation algorithm for users. 
*/
/*
  The many-to-many relationship between posts and hashtags will be implemented with the reference model,
  introducing an attribute in both of the entities that store object IDs in arrays. This way we will be able to make the connection between
  the posts related to a hashtag and the hashtags used in a post. This solution is more apporpriate than creating a separate collection for
  the relationship as in our case, we do not need to store any extra information about these relationships.
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