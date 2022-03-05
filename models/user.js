//Import dependencies 
const mongoose = require('mongoose'); //db structure 
const config = require('config'); //secure variables 

//Defining user schema
const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true, minlength: 1, maxlength: 15 },
    lastName: { type: String, required: true, minlength: 1, maxlength: 15 },
    email: { type: String, unique: true, required: true, minlength: 5, maxlength: 255 },
    userName: { type: String, unique: true, required: true, minlength: 10, maxlength: 15 },
    //password: { type: String, required: true, minlength: 7, maxlength: 15 },

    dateModified: { type: Date, default: Date.now },
    myPosts: [{ type: mongoose.Types.ObjectId, ref: 'Comment' }] //only saving the array of comments made by their comment id. 
});

//Create model with previously defined schema (doorway into our MongoDB Collection)
const User = mongoose.model('User', userSchema);



// module.exports = User;
exports.User = User;