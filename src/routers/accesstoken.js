const jwt = require('jsonwebtoken');
const express = require('express');
const {jwtsecret} = require('../config/config')

const router = new express.Router();

router.get('/getaccesstoken', async (req,res) => {
    const token = jwt.sign({test:'test'}, jwtsecret);
    res.json({
        success: true,
        message: 'Authentication successful!',
        token: token
    });
});

module.exports = router;
