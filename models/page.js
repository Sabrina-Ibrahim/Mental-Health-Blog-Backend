//Import dependencies 
const mongoose = require('mongoose'); //db structure 
const { commentsSchema } = require('./comment');
//const { type } = require('os');

//Defining pages schema
const pagesSchema = new mongoose.Schema({
    titleName: { type: String, required: true },
    newsFeed: { type: [commentsSchema], default: [] },
});

//Create model with previously defined schema (doorway into our MongoDB Collection)
const Page = mongoose.model('Page', pagesSchema);



exports.Page = Page;