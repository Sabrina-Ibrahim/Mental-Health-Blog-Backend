//Import dependencies 
const mongoose = require('mongoose'); //db structure 

//Defining comments schema
const commentsSchema = new mongoose.Schema({
    ownedBy: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    text: { type: String, required: true, minlength: 1, maxlength: 1000 },
    posted: { type: Date, default: Date.now },
    likeCount: { type: Number, required: true, default: 0 },
    replies: [{ type: String, minlength: 1, maxlength: 1000 }],
    pageName: { type: String, minlength: 1 },
});

//validate comment - copy from user

//Create model with previously defined schema (doorway into our MongoDB Collection)
const Comments = mongoose.model('Comments', commentsSchema);



exports.commentsSchema = commentsSchema;
exports.Comments = Comments;


