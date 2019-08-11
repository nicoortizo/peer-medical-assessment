
const chai = require('chai');
const chaiHttp = require('chai-http');
const config = require('../src/config/config');
const app = require('../src/app');
const db = require('./fixtures/db')
const mongoose = require('mongoose');
const expect = chai.expect;
const assert = chai.assert;
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

    describe('Update Articles', () => {
       
            it('Update article1 setting text with "article updated" should get response 200 and article updated',(done)=> {
                chai.request(app)
                    .patch('/articles/'+db.article1._id)
                    .set('Authorization', 'Bearer ' + token)
                    .send({text:"text updated"})
                    .end((err, res)=> {
                        console.log(res.body);
                        expect(res).to.have.status(200);
                        assert.equal(res.body.text,'text updated');
                        done();
                    });
            });

            it('Update article2 setting invalid property should get response 400',(done)=> {
                chai.request(app)
                    .patch('/articles/'+db.article2._id)
                    .set('Authorization', 'Bearer ' + token)
                    .send({invalid:"text updated"})
                    .end((err, res)=> {
                        //console.log(res.body);
                        expect(res).to.have.status(400);
                        done();
                    })
            })
    })

    describe('Get Articles', () => { 
        it('Get all articles', (done) => {
            chai.request(app)
                .get('/articles')
                .set('Authorization', 'Bearer ' + token)
                .end((err,res) => {
                    expect(res).to.have.status(200);
                    assert.isArray(res.body);
                    done();
                })
        } );
        
        it('Get all articles with tag "article"', (done) => {
            chai.request(app)
                .get('/articles?tags=article')
                .set('Authorization', 'Bearer ' + token)
                .end((err,res) => {
                    expect(res).to.have.status(200);
                    console.log(res.body);
                    assert.isArray(res.body,'Response is not an array');
                    //console.log(res.body.filter((article)=> article.tags.some((tag)=> tag === "article")));
                    //assert.equal(res.body.length,3);
                    assert.equal(
                        res.body.filter((article)=> article.tags.some((tag)=> tag === 'article')).length,
                        res.body.length,
                        'All articles should have article tag');
                    done();
                })
        } );

        it('Get all articles with tags "first" and "second"', (done) => {
            chai.request(app)
                .get('/articles?tags=first,second')
                .set('Authorization', 'Bearer ' + token)
                .end((err,res) => {
                    expect(res).to.have.status(200);
                    console.log(res.body);
                    assert.isArray(res.body,'Response is not an array');
                    //console.log(res.body.filter((article)=> article.tags.some((tag)=> tag === "article")));
                    //assert.equal(res.body.length,3);
                    assert.equal(
                        res.body.filter((article)=> article.tags.some((tag)=> tag === 'first' || tag === 'second')).length,
                        res.body.length,
                        'All articles should have first or second tags');
                    done();
                })
        } );

    });

    describe('Delete Article', () => {
        it('Delete article should get 200', (done) => {
            chai.request(app)
                .delete('/articles/'+ db.article3._id)
                .set('Authorization', 'Bearer ' + token)
                .end((err,res) => {
                    expect(res).to.have.status(200);
                    done();
                })
        }) ;

        it('Delete invalid article id should get 404 not found ', (done) => {
            chai.request(app)
                .delete('/articles/'+ new mongoose.Types.ObjectId())
                .set('Authorization', 'Bearer ' + token)
                .end((err,res) => {
                    expect(res).to.have.status(404);
                    done();
                })
        }) ;

    });
});