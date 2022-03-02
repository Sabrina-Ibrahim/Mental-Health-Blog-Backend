//Import dependencies 
const mongoose = require('mongoose'); //db structure 

//Defining comments schema
const commentsSchema = new mongoose.Schema({
    ownedBy: { type: String, required: true },
    text: { type: String, required: true, minlength: 1, maxlength: 1000 },
    posted: { type: Date, default: Date.now },
    likeCount: { type: Number, required: true, default: 0 },
    reply: { type: String, minlength: 1, maxlength: 1000 },
});

//Create model with previously defined schema (doorway into our MongoDB Collection)
const Comments = mongoose.model('Comments', commentsSchema);



exports.commentsSchema = commentsSchema;
exports.Comments = Comments;