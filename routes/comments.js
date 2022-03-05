//const User = require('../models/comment');
const express = require('express');
const router = express.Router();
const { Comments } = require('../models/comment')

//PUT - Like a comment post (like count)
router.put('/like/:id', async (req, res) => {
    try {
        const page = await Comments.findByIdAndUpdate(req.params.id, { $inc: { likeCount: 1 } }, { new: true });

        await page.save();

        return res.send(page);
    }
    catch (err) {
        return res.status(500).send(`Internal Server Error: ${err}`);
    }
});


module.exports = router; 