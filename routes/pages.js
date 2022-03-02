//const User = require('../models/page');
const express = require('express');
const router = express.Router();
const { Comment } = require('../models/comment');
const { Page } = require('../models/page');

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

//Endpoint and handlers
//Get comments onto pages




module.exports = router; 