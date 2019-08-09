const mongoose = require('mongoose');
const config = require('../config/config');

var db
mongoose.connect(config.mongodbUrl, {
    useNewUrlParser:true,
    useCreateIndex: true,
    useFindAndModify: false
}).catch((error)=> console.log(error));