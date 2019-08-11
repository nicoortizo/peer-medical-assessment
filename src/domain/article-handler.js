const Article = require('../models/article');
const util = require('../util/utilities');

const articlePropertiesAllowed = ['userId','title','text','tags']
/***
 * Create Article
 * @param atricle article to create 
 * @returns article created
 */
const createArticle = async (article) => {
    
    try {
        if(util.validateProperties(article,articlePropertiesAllowed)){

            const articleDb = new Article(article);
            
            await articleDb.save();
            return articleDb;
        }
        else {
            throw new Error('Invalid Properties')
        }
    
    } catch(error)  {
        console.log(error);
        throw error;
    }
}
/**
 * Update Article
 * @param {Article model to update} articleDb 
 * @param {properties to update} updates 
 * @returns {article updated}
 */
const updateArticle = async (articleId, updates) => {
    try {
        const articleDb = await Article.findById(articleId); 
        if(!articleDb)
            return null;

        const fieldsToUpdate = Object.keys(updates);
        if(util.validateProperties(updates,articlePropertiesAllowed)){
            fieldsToUpdate.forEach((field) => articleDb[field]= updates[field]);
            await articleDb.save();
            return articleDb;
        }
        else
        {
            throw new Error('Invalid properties to update');
        }
    }
    catch(err){
        console.log(err);
        throw err;
    }
}
/**
 * Delete Article
 * @param idArticle Article Id
 * @returns article deleted , null if article not found
 */
const deleteArticle = async (idArticle) => {
    try {
        const articleDb = await Article.findByIdAndDelete(idArticle);
        if(!articleDb)
            return null;

        return articleDb;
    }
    catch(err) {
        console.log(err);
        throw err;
    }
}

module.exports = {
    createArticle,
    updateArticle, 
    deleteArticle
}