//Database connection and express imports
const connectDB = require('./startup/db');
const express = require('express');
const app = express();

//Connect to the database
connectDB();

//Route Imports
const users = require('./routes/users');


//Run App initilization middleware
app.use(express.json());
app.use('/api/users', users);


//Back-End Listener
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
});