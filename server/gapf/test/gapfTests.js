process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaiHttp = require('chai-http');
let gapf_server = require('../gapf.js');
let users_server = require('../../users/users_app.js');
let should = chai.should();

chai.use(chaiHttp);

let user = {
    role: "Faculty",
    fname: "test2fname",
    lname: "test2lname",
    email: "test2@mail.com",
    password: "test2password"
};

describe('Gapf upload', () => {
  it('gapf server should exist', () => {
      gapf_server.should.exist;
  });

  it('user server should exist', () => {
      users_server.should.exist;
  });

  describe('Post Gapf', () => {
      var Cookies;
      var files;
      describe('User not signed in', () => {
          after( (done) => {
              chai.request(users_server)
              .post('/users/login')
              .send({
                  email: user.email,
                  password: user.password
              })
              .end( (err, res) => {
                  if (err) throw err;
                  Cookies = res.headers['set-cookie'].pop().split(';')[0];
                  done();
              });
          });

          it('Should not post any attached document if no logged in user', (done) => {
              chai.request(gapf_server)
                  .post('/gapf')
                  .set('Content-Type', 'application/pdf')
                  .field('Content-Type', 'multipart/form-data')
                  .field('filename', 'test.pdf')
                  .attach('file', './test/test.pdf')
                  .end((err, res) => {
                      // if (err) {
                        //console.log(err);
                      // } else {
                        //console.log(err)
                        res.should.have.status(401);
                        res.body.should.have.property('error');
                        res.body.error.should.be.a('object');
                        res.body.error.should.have.property('message');
                        res.body.error.should.have.property('message').eql('Unauthorized User');
                      // }
                      done();
              });
          });
      });

      describe('User signed in', () => {
        it('Should post any attached document if logged in user', (done) => {
            chai.request(gapf_server)
                .post('/gapf')
                .set('Cookie', Cookies)
                .attach('file', './test/test.pdf')
                .end((err, res) => {
                    if (err) {
                      console.log(err);
                    } else {
                      //console.log(res.body);
                      res.should.have.status(200);
                    }
                    done();
            });
        });

        it('Should get file after logged in user', (done) => {
            chai.request(gapf_server)
                .get('/gapf')
                .set('Cookie', Cookies)
                .end((err, res) => {
                    if (err) {
                      console.log(err);
                    } else {
                      //console.log(res.body);
                      res.should.have.status(200);
                      files = res.body;
                    }
                    done();
            });
        });

        it('Should download file after logged in user', (done) => {
            chai.request(gapf_server)
                .get('/gapf/' + files[0]._id)
                .set('Cookie', Cookies)
                .end((err, res) => {
                    if (err) {
                      console.log(err);
                    } else {
                      //console.log(res.body);
                      res.should.have.status(200);
                    }
                    done();
            });
        });

        it('Should download file after logged in user', (done) => {
            chai.request(gapf_server)
                .delete('/gapf/' + files[0]._id)
                .set('Cookie', Cookies)
                .end((err, res) => {
                    if (err) {
                      console.log(err);
                    } else {
                      //console.log(res.body);
                      res.should.have.status(200);
                    }
                    done();
            });
        });
      })

  });
});
