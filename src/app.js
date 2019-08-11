const mongoosedb = require('./db/mongoose');
const express = require('express');
const userRouter = require('./routers/user');
const articleRouter = require('./routers/article');
const tokenRouter = require('./routers/accesstoken');
const app = express();



const main = async () => {
    try {
        await mongoosedb.dbConnectMongoose();
        app.use(express.json());
        app.use(userRouter);
        app.use(articleRouter);
        app.use(tokenRouter);
    }
    catch (err) {
        console.log('Error: ' + err);
        process.exit(1);
    }
}
try{

    main();
}
catch(err) {
    console.log('error');
}
module.exports = app;
