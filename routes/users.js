const express = require('express');
const { User } = require('../models/user');
const router = express.Router();

//GET User's Personal Posts
// router.get('/api/users', async (req, res) => {
//     try {
//         const comments = await Comments.find({ ownedBy: req.params.name })
//         if (!userName) return res.status(400).send(`The username with id "${req.params.name} does not exist.`)

//         return res.send(comments);
//     }
//     catch (err) {
//         return res.status(500).send(`Internal Server Error: ${err}`);
//     }
// });

//GET All Users Posts
// router.get('/', async (req, res) => {
//     try {
//         const users = await User.find();

//         return res.send(users);
//     } catch (err) {
//         return res.status(500).send(`Internal Server Error: ${err}`);
//     }
// });

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