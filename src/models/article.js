const mongoose = require('mongoose');
const fkconstraint = require('../util/fkconstraint')

const articleSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'User',
        validate: {
			isAsync: true,
			validator: async function(v) {
				return await fkconstraint(mongoose.model('User'), v);
			},
			message: `User doesn't exist`
		}
    },
    title: {
        type:String,
        trim:true,
        required:true
    },
    text: {
        type:String,
    },
    tags: [ {
            type:String,
            require:true
    }]
}, 
{
    timestamps:true
});

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;