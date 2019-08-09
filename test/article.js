
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const config = require('../src/config/config');
const app = require('../src/app');
const db = require('./fixtures/db')
const mongoose = require('mongoose');
chai.use(chaiHttp);

describe('Article endpoints', () => {
    let token = '';

    before((done) => {
        chai.request(app)
        .get('/getaccesstoken')
        .end( async (err,res) => {
            var result = JSON.parse(res.text);
            token = result.token;
            console.log(token);
            await db.setupDatabase();
            done();
        })
    });

    

    describe('Create Article', () => {
        

        it('Post article without token should get 401 status', (done) => {
            chai.request(app)
                .post('/articles')
                .send({
                    "userId": db.user1,
                    "title":"NewArticle",
                    "text":"new article",
                    "tags":["newarticle"]
                })
                .end((err,res) => {
                    console.log(res.body);
                    expect(res).to.have.status(401);
                    done();
                });
        });
    
        it('Post Articles with token should create a new article', (done) => {
            chai.request(app)
                .post('/articles')
                .set('Authorization', 'Bearer ' + token)
                .send({
                    "userId": db.user1,
                    "title":"NewArticle",
                    "text":"new article",
                    "tags":["newarticle"]
                })
                .end((err,res) => {
                    console.log(res.body);
                    expect(res).to.have.status(201);
                    done();
                });
        });

        it('Post Articles with invalid user should get constraint error', (done) => {
            chai.request(app)
                .post('/articles')
                .set('Authorization', 'Bearer ' + token)
                .send({
                    "userId": new mongoose.Types.ObjectId(),
                    "title":"NewArticle",
                    "text":"new article",
                    "tags":["newarticle"]
                })
                .end((err,res) => {
                    console.log(res.body);
                    expect(res).to.have.status(400);
                    done();
                });
        });
    });

    describe('Get Articles', () => { 

    })
});