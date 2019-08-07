const mongoose = require('mongoose');
const mongodbUrl = process.env.MONGODB_DATABASE || 'mongodb://127.0.0.1:27017/peer-medical';
mongoose.connect(mongodbUrl, {
    useNewUrlParser:true,
    useCreateIndex: true,
    useFindAndModify: false
}).catch((error)=> console.log(error));