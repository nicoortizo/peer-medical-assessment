require('./db/mongoose');
const express = require('express');
const userRouter = require('./routers/user');
const articleRouter = require('./routers/article');
const tokenRouter = require('./routers/accesstoken');
const app = new express();

app.use(express.json());
app.use(userRouter);
app.use(articleRouter);
app.use(tokenRouter);

module.exports = app;
