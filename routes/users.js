const express = require('express');
const { User } = require('../models/user');
const router = express.Router();
const { Page } = require('../models/page');
const { response } = require('express');
//const { Comments } = require('../models/comment');


//GET User's Personal Posts 
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


//GET All Users Posts on pages
router.get('/:pageId', async (req, res) => {
    try {
        const page = await Page.findById(req.params.pageId);

        return res.send(page);
    } catch (err) {
        return res.status(500).send(`Internal Server Error: ${err}`);
    }
});

//POST - Register New User 
router.post('/', async (req, res) => {
    try {
        const user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            userName: req.body.userName,
            //password: '',
        });
        await user.save();

        return res
            .send(user);

    } catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});





module.exports = router; 