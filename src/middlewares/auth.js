const jwt = require('jsonwebtoken')

const auth = async (req, res, next) => {
    try {
        if(!req.header('Authorization')){
            throw new Error();
        }

        const token = req.header('Authorization').replace('Bearer ', '');
        jwt.verify(token, process.env.JWT_SECRET || "nicosecretjwt");
        next()
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate.' })
    }
}

module.exports = auth