const express = require('express');
const { User, validateUser } = require('../models/user');
const router = express.Router();
const { Comment, validateComment } = require('../models/comment');
const { response } = require('express');
const bcrypt = require('bcrypt');

//register (create) user, send JWT (scramble)
router.post('/', async (req, res) => {
    try {
        const { error } = validateUser(req.body);
        if (error) return res.status(400).send(error.details[0].message);
        let user = await User.findOne({ email: req.body.email });
        if (user) return res.status(400).send('User already registered.');

        const salt = await bcrypt.genSalt(10);
        user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            userName: req.body.userName,
            password: await bcrypt.hash(req.body.password, salt),
        });
        await user.save();
        const token = user.generateAuthToken();
        return res
            .header('x-auth-token', token)
            .header('access-control-expose-headers', 'x-auth-token')
            .send(user);
    } catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

//GET all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();

        return res.send(users);
    }
    catch (err) {
        return res.status(500).send(`Internal Server Error: ${err}`);
    }
})

//GET one user
router.get('/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);

        return res.send(user);
    }
    catch (err) {
        return res.status(500).send(`Internal Server Error: ${err}`);
    }
})

//GET User Comments (posts) 
router.get('/:userId/myPosts', async (req, res) => {
    try {
        let user = await User.findOne({ _id: req.params.userId }).populate('myPosts');
        let myPosts = user.myPosts

        return res.send(myPosts);
    }
    catch (err) {
        return res.status(500).send(`Internal Server Error: ${err}`);
    }
})

//GET All Users Posts
router.get('/', async (req, res) => {
    try {
        const comment = await Comment.find().sort({ postedOn: -1 });
        return res.send(comment);
    }
    catch (err) {
        return res.status(500).send(`Internal Server Error: ${err}`);
    };
});



module.exports = router; 