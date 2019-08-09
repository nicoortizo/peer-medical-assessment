
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const config = require('../src/config/config');
const app = require('../src/app');

chai.use(chaiHttp);

describe('Users', () => {
    let token = '';

    before((done) => {
        chai.request(app)
        .get('/getaccesstoken')
        .end((err,res) => {
            var result = JSON.parse(res.text);
            token = result.token;
            console.log(token);
            done();
        })
    });
    
    it('Post Users without token', (done) => {
        chai.request(app)
            .post('/users')
            .send({
                name:'nico', 
                avatar:'http://www.test.com/img.png'    
            })
            .end((err,res) => {
                console.log(res.body);
                expect(res).to.have.status(401);
                done();
            });
    });

    it('Post Users with token', (done) => {
        chai.request(app)
            .post('/users')
            .set('Authorization', 'Bearer ' + token)
            .send({
                name:'nico', 
                avatar:'http://www.test.com/img.png'    
            })
            .end((err,res) => {
                console.log(res.body);
                expect(res).to.have.status(201);
                done();
            });
    });

})