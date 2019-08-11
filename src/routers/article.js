const express = require('express');
const Article = require('../models/article');
const mongoose = require('mongoose');
const auth = require('../middlewares/auth');
const articleHandler = require('../domain/article-handler')

const router = new express.Router();


router.post('/articles', auth, async(req, res) => {    
    try {
        if(!req.body) return res.status(400).send('Bad Request');
        const newArticle =  await articleHandler.createArticle(req.body);
        res.status(201).send(newArticle);
    } catch(error)  {
        return res.status(400).send(error);
    }
})

router.patch('/articles/:id',auth, async (req,res) => {
    try {
        if(!req.body) return res.status(400).send('Bad Request'); 
        
        const articleUpdated = await articleHandler.updateArticle(req.params.id,req.body);
        if(!articleUpdated) {
            return res.status(404).send('article not found');
        }
        res.send(articleUpdated);
    } catch(error) {
        return res.status(400).send(error);
    }
});


router.delete('/articles/:id',auth, async (req, res) => {
    try {
        const article = await articleHandler.deleteArticle(req.params.id)
        if(!article)
            return res.status(404).send('article not found');

        res.send(article);

    }catch(error) {
        return res.status(500).send(error);
    }
});


router.get('/articles/:id',auth, async (req, res) => {
    try {
        const id = req.params.id;
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
    try {
        const query = {};
        
        if(req.query.tags ) {
            query.tags = { $in : req.query.tags.split(',')};
        }
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