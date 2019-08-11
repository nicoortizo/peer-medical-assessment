const mongoose = require('mongoose');
const User = require('../../src/models/user');
const Article = require('../../src/models/article');

const _idUser1 = new mongoose.Types.ObjectId();
const user1 = new User({
    _id: _idUser1,
    name:'user1',
    avatar:'http://test.com/img1.png'
});

const _idUser2 = new mongoose.Types.ObjectId();
const user2 = new User({
    _id: _idUser2,
    name:'user2',
    avatar:'http://test.com/img2.png'
});

const article1 = new Article({
    userId: _idUser1,
	title:"article1",
	text:"article text 1",
	tags:["article","first",]
});

const article2 = new Article({
    userId: _idUser1,
	title:"article2",
	text:"article text 1",
	tags:["article","second","tag"]
});

const article3 = new Article({
    userId: _idUser2,
	title:"article3",
	text:"article text 3",
	tags:["article","art","tag"]
});

const setupDatabase = async () => {
    await User.deleteMany();
    await Article.deleteMany();
    await user1.save();
    await user2.save();
    await article1.save();
    await article2.save();
    await article3.save();
}

module.exports =  {
    _idUser1,
    _idUser2,
    user1,
    user2,
    article1,
    article2,
    article3, 
    setupDatabase
}