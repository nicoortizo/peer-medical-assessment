const mongoose = require('mongoose');
const validator = require('validator');
//const Article = require('./article');

const userSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true,
        trim:true
    },
    avatar: {
        type:String,
        trim:true,
        lowercase:true,
        validate(value) {
            if(!validator.isURL(value)){
                throw new Error('Url avatar is invalid');
            }
        }
    }
}, 
{
    timestamps:true
});

userSchema.virtual('articles', {
    ref: 'Article',
    localField: '_id',
    foreignField: 'userId'
})

const User = mongoose.model('User', userSchema);
module.exports = User;