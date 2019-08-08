const jwt = require('jsonwebtoken');
const express = require('express');

const router = new express.Router();

router.get('/getaccesstoken', async (req,res) => {
    const token = jwt.sign({}, process.env.JWT_SECRET || "nicosecretjwt");
    res.json({
        success: true,
        message: 'Authentication successful!',
        token: token
    });
});

module.exports = router;
