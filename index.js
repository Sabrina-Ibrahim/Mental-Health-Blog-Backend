//Database connection and express imports
const connectDB = require('./startup/db');
const express = require('express');
const app = express();
const auth = require('./routes/auth');
const cors = require('cors');

//Connect to the database
connectDB();

//Route Imports
const users = require('./routes/users');
const comments = require('./routes/comments');


//Run App initilization middleware
app.use(express.json());
app.use(cors());
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/comments', comments);


//Back-End Listener
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
});