//const User = require('../models/page');
const express = require('express');
const router = express.Router();
const { Comments } = require('../models/comment');
const { Page } = require('../models/page');
const { User } = require('../models/user');

router.post('/newpage', async (req, res) => {
    try {
        const page = new Page({
            titleName: req.body.titleName
        })
        await page.save();
        return res.send(page);
    }
    catch (err) {
        return res.status(500).send(`Internal Server Error: ${err}`);
    }
});

//Find a user by ID, return the user to the frontend, save user ID to a comment (ownedby). 
//Find a page that has been created, take saved comment (ownedby) and save to that page. 
//Create a comment (similiar to const page), save user ID to that comment (ownedby).
//Create a comment, save comment to page, and user. 
router.post('/:userId/:pageId/newsfeed', async (req, res) => {
    try {
        const comment = new Comments({
            text: req.body.text,
            ownedBy: req.params.userId,
            pageName: req.params.pageId,
        })
        await comment.save();

        const page = await Page.findByIdAndUpdate(req.params.pageId, { $push: { newsfeed: comment._id } }, { new: true });
        if (!page) return res.status(400).send(`The page id "${req.params.pageId}" does not exist.`);

        await page.save();

        const user = await User.findByIdAndUpdate(req.params.userId, { $push: { myPosts: comment._id } }, { new: true });
        if (!page) return res.status(400).send(`The page id "${req.params.userId}" does not exist.`);

        await user.save();

        return res.send(page);
    }
    catch (err) {
        return res.status(500).send(`Internal Server Error: ${err}`);
    }
})

//DELETE - Single user post by id
router.delete('/delete/:pageId/:userId/:commentId', async (req, res) => {
    try {
        const page = await Page.findById(req.params.pageId);
        if (!page) return res.status(400).send(`The user with id "${req.params.pageId}" comment does not exist.`);

        let Usercomment = page.newsfeed.id(req.params.commentId);
        if (!Usercomment) return res.status(400).send(`The comment with id "${req.params.commentId}" does not exist.`);

        Usercomment = await Usercomment.remove();

        await page.save();
        return res.send(page);
    }
    catch (err) {
        return res.status(500).send(`Internal Server Error: ${err}`);
    };
})


//Endpoint and handlers





module.exports = router; 