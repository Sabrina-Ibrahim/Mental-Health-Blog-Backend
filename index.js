//Database connection and express imports
const connectDB = require('./startup/db');
const express = require('express');
const app = express();

//Connect to the database
connectDB();

//Route Imports
const users = require('./routes/users');
const comments = require('./routes/comments');
const pages = require('./routes/pages');


//Run App initilization middleware
app.use(express.json());
app.use('/api/users', users);
app.use('/api/comments', comments);
app.use('/api/pages', pages);


//Back-End Listener
const port = process.env.PORT || 5002;
app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
});