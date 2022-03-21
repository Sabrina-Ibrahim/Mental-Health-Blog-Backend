//Import dependencies 
const mongoose = require('mongoose'); //db structure 
const config = require('config'); //secure variables 
const { commentSchema } = require('./comment');
const Joi = require('joi');
const jwt = require('jsonwebtoken');

//Defining user schema
const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true, minlength: 1, maxlength: 20 },
    lastName: { type: String, required: true, minlength: 1, maxlength: 15 },
    email: { type: String, unique: true, required: true, minlength: 5, maxlength: 255 },
    userName: { type: String, unique: true, required: true, minlength: 1, maxlength: 15 },
    password: { type: String, required: true, minlength: 5, maxlength: 1024 },

    dateModified: { type: Date, default: Date.now },
    myPosts: [{ type: commentSchema, default: [] }], //Array of objects. //only saving the array of comments made by their comment id. 
    image: { type: String, default: '' },
});

function validateUser(user) {
    const schema = Joi.object({
        firstName: Joi.string().min(5).max(50).required(),
        lastName: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        userName: Joi.string().min(1).max(15),
        password: Joi.string().min(5).max(1024).required(),
    });
    return schema.validate(user);
}

userSchema.methods.generateAuthToken = function () {
    return jwt.sign({ _id: this._id, firstName: this.firstName, lastName: this.lastName, email: this.email, image: this.image, myPosts: this.myPosts }, config.get('jwtSecret'));
}

//Create model with previously defined schema (doorway into our MongoDB Collection)
const User = mongoose.model('User', userSchema);

exports.userSchema = userSchema;
exports.User = User;
exports.validateUser = validateUser;

