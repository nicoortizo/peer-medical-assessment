
const express = require('express');
const User = require('../models/user');
const auth = require('../middlewares/auth');
const userHandler = require('../domain/user-handler')

const router = new express.Router();

router.post('/users',auth, async (req, res) => {
    try {
        user = await userHandler.createUser(req.body);
        return res.status(201).send({user});
    } catch(err) {
        return res.status(400).send(err);
    }
});

router.get('/users',auth, async (req, res) => {

    try {
        const users = await User.find({});
        if(!users)
            return res.status(404).send();

        res.send(users);
    }
    catch (error){
        return res.status(500);
    }
});

router.get('/users/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const user = await User.findById(id);
        if(!user)
            return res.status(404).send();

        res.send(user);
    }
    catch (error){
        return res.status(500);
    }
});

module.exports = router;