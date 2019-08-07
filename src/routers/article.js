const express = require('express');
const Article = require('../models/article');

const router = new express.Router();

router.post('/articles', async(req, res) => {
    if(!req.body) return res.status(400).send('Bad Request');
    
    const article = new Article(req.body);

    try {
        await article.save();
        res.status(201).send(article);
    } catch(error)  {
        res.status(400).send(error);
    }
})

router.patch('/articles/:id', async (req,res) => {
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
        res.status(400).send(error);
    }
});

router.delete('/articles/:id'), async (req, res) => {
    try {
        const article = await Article.findByIdAndDelete(req.params.id);
        if(!article)
            return res.status(404).send();

        res.send(article);

    }catch(error) {
        res.status(500).send(error);
    }
}

module.exports = router;