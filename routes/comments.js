//const User = require('../models/comment');
const { Router } = require('express');
const express = require('express');
const router = express.Router();
const { Comments, commentsSchema } = require('../models/comment');
const { User } = require('../models/user');
const auth = require('../middleware/auth');

//create new comment
router.post('/:userId', auth, async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) return res.status(400).send(`The user id "${req.params.userId}" does not exist.`);

        const comment = new Comment({
            text: req.body.text,
            ownedBy: req.params.userId,
            pageName: req.body.pageName,
        })
        user.myPosts.push(comment)

        await user.save();
        return res.send(user);
    }
    catch (err) {
        return res.status(500).send(`Internal Server Error: ${err}`)
    }
});

//create a reply
router.put('/:userId/myPosts/:commentId/reply', auth, async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) return res.status(400).send(`The user id "${req.params.userId}" does not exist.`);

        const comment = await user.myPosts.id(req.params.commentId)
        if (!comment) return res.status(400).send(`The comment id "${req.params.commentId}" does not exist.`);

        comment.replies.push(req.body.text)
        await user.save();
        return res.send(user);
    }
    catch (err) {
        return res.status(500).send(`Internal Server Error: ${err}`)
    }
})

//PUT - Like a comment 
router.put('/:userId/myPosts/:commentId/like', auth, async (req, res) => {
    try {

        const user = await User.findById(req.params.userId);
        if (!user) return res.status(400).send(`The user id "${req.params.userId}" does not exist.`);

        const comment = await user.myPosts.id(req.params.commentId)
        if (!comment) return res.status(400).send(`The comment id "${req.params.commentId}" does not exist.`);

        comment.likeCount += 1

        await user.save();

        return res.send(comment);
    }
    catch (err) {
        return res.status(500).send(`Internal Server Error: ${err}`);
    }
});


//PUT - Reply to a users comment 
router.post('/:userId/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);

        const comment = await Comment.findById(req.params.id);
        if (!comment) {
            return res.status(400).send(`The user with comment ${req.params.userId} does not exist.`);
        }

        const reply = new Comments({
            text: req.body.text,
            replies: req.body.text
        });

        comment.replies.push(reply);

        await user.save();
        return res.send(user);
    }
    catch (err) {
        return res.status(500).send(`Internal Server Error: ${err}`)
    }
});


//DELETE - Single user post by id
router.delete('/:userId/myPosts/:commentId', async (req, res) => {
    try {

        const user = await User.findById(req.params.userId);
        if (!user) return res.status(400).send(`The user id "${req.params.userId}" does not exist.`);

        const comment = await user.myPosts.id(req.params.commentId)
        if (!comment) return res.status(400).send(`The comment id "${req.params.commentId}" does not exist.`);

        await comment.remove()
        await user.save();
        return res.send(comment);
    }
    catch (err) {
        return res.status(500).send(`Internal Server Error: ${err}`);
    };

});


module.exports = router; 