//authorization - you can pass - ur id says ur 18 or 21 manipualte data u need this. 
const jwt = require('jsonwebtoken');
const config = require('config');

//Middleware - checks token is this right? you auth to manipulate data, if yes good to go
function auth(req, res, next) {

    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send('Access denied. No token provided.');
    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        req.user = decoded;
        return next();
    } catch (ex) {
        return res.status(400).send('Invalid token.');
    }
}



module.exports = auth;