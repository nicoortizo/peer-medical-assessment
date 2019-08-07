const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'User'
    },
    title: {
        type:String,
        trim:true,
        required:true
    },
    text: {
        type:String,
    },
    tags: [{
        tag: {
            type:String,
            require:true
        }
    }]
}, 
{
    timestamps:true
});

const Article = mongoose.model('Task', articleSchema);

module.exports = Article;