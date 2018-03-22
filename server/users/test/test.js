process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let User = require('../api/models/user');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../users_app.js');
let should = chai.should();

chai.use(chaiHttp);

describe('Users', () => {
    beforeEach((done) => { //Before each test we empty the database
        User.remove({}, (err) => { 
           done();         
        });     
    });

      it('should exist', () => {
        server.should.exist;
      });


    describe('/GET faculty', () => {
        it('it should GET all faculty', (done) => {
          chai.request(server)
              .get('/faculty')
              .end((err, res) => {
                  res.should.have.status(200);
                  res.body.faculty.should.be.a('array');
                  res.body.faculty.length.should.be.eql(0);
                done();
              });
        });
    });

    
  
});