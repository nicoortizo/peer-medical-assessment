const express = require('express');
const Article = require('../models/article');
const mongoose = require('mongoose');
const auth = require('../middlewares/auth');

const router = new express.Router();

router.post('/articles', auth, async(req, res) => {
    if(!req.body) return res.status(400).send('Bad Request');
    
    const article = new Article(req.body);
    
    try {
        await article.save();
        res.status(201).send(article);
    } catch(error)  {
        return res.status(400).send(error);
    }
})

router.patch('/articles/:id',auth, async (req,res) => {
    if(!req.body) return res.status(400).send('Bad Request');

    const fieldsToUpdate = Object.keys(req.body);
    const allowedUpdates = ['title','text','tags'];

    if(!fieldsToUpdate.every((field) => allowedUpdates.includes(field))) {
        return res.status(400).send({error})
    }

    try {
        const article = await Article.findById(req.params.id); 
        if(!article) {
            return res.status(404).send('Article Not Found');
        }
        fieldsToUpdate.forEach((field) => article[field]= req.body[field]);
        await article.save();
        res.send(article);
    } catch(error) {
        return res.status(400).send(error);
    }
});


router.delete('/articles/:id',auth, async (req, res) => {
        try {
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            return res.send(400).send("invalid Object Id");
        }
        const article = await Article.findByIdAndDelete(req.params.id);
        if(!article)
            return res.status(404).send();

        res.send(article);

    }catch(error) {
        return res.status(500).send(error);
    }
})

router.get('/articles/:id',auth, async (req, res) => {
    const id = req.params.id;

    try {
        const article = await Article.findById(id);
        if(!article)
            return res.status(404).send();

        return res.send(article);
    }
    catch (error){
        return res.status(500);
    }
})

router.get('/articles',auth, async (req, res) => {
    const query = {};
    
    if(req.query.tags ) {
        query.tags = { $in : req.query.tags.split(',')};
    }

    try {
        const articles = await Article.find(query);
        if(!articles)
        {
            return res.status(404).send();
        }
        res.send(articles);
    } catch(e) {
        res.status(500).send();
    }
})

module.exports = router;