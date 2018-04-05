process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let User = require('../api/models/user');
let Applicant = require('../api/models/applicant');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../users_app.js');
let should = chai.should();

chai.use(chaiHttp);

// variables used for testing
let newWrongUser = {
    role: "F",
    fname: "f1",
    lname: "l1",
    email: "test1email",
    password: "test1password"
};

let wrongLogninUser1 = {
    email: "test",
    password: "t"
}

let wrongPasswordlogninUser2 = {
    email: "test1@mail.com",
    password: "t"
}

let newUser1 = {
    role: "FSS",
    fname: "test1fname",
    lname: "test1lname",
    email: "test1@mail.com",
    password: "test1password"
};

let newUser2 = {
    role: "Faculty",
    fname: "test2fname",
    lname: "test2lname",
    email: "test2@mail.com",
    password: "test2password"
};
let newUser3 = {
    role: "FSS",
    fname: "test3fname",
    lname: "test3lname",
    email: "test3@mail.com",
    password: "test3password"
};

let newUser4 = {
    role: "Faculty",
    fname: "test4fname",
    lname: "test4lname",
    email: "test4@mail.com",
    password: "test4password"
};

let newUser5 = {
    _id: new mongoose.Types.ObjectId(),
    role: "Faculty",
    fname: "test5fname",
    lname: "test5lname",
    email: "test5@mail.com",
    password: "test5password"
};

let logninUser3 = {
    email: newUser5.email,
    password: newUser5.password
}

let newUser5update = {
    fname: "test5fnameupdated",
    lname: "test5lnameupdated",
    email: "test5@mail.comupdated",
    password: "test5passwordupdated"
}

let newUser6 = {
    _id: new mongoose.Types.ObjectId(),
    role: "FSS",
    fname: "test6fname",
    lname: "test6lname",
    email: "test6@mail.com",
    password: "test6password"
};

let newApplicant7 = {
    _id: new mongoose.Types.ObjectId(),
    fname: "test7fname",
    lname: "test7lname",
    email: "test7@mail.com"
};

let newApplicant7update = {
    status: "accepted"
}

describe('users & faculty', () => {
    before((done) => { //Before each test we empty the database
        User.remove({}, (err) => { 
           done();         
        });     
    });

    it('should exist', () => {
        server.should.exist;
    });

    /*
    * Test the /POST/users route
    */
    describe('/POST/users/signup', () => {
        it('it should not POST a user without any fields', (done) => {
            chai.request(server)
                .post('/users/signup')
                .send({})
                .end((err, res) => {
                    res.should.have.status(500);
                    res.body.should.have.property('errors');
                    res.body.errors.should.be.a('object');
                    res.body.errors.should.have.property('role');
                    res.body.errors.role.should.have.property('kind').eql('required');
                    res.body.errors.should.have.property('fname');
                    res.body.errors.fname.should.have.property('kind').eql('required');
                    res.body.errors.should.have.property('lname');
                    res.body.errors.lname.should.have.property('kind').eql('required');
                    res.body.errors.should.have.property('email');
                    res.body.errors.email.should.have.property('kind').eql('required');
                    res.body.errors.should.have.property('password');
                    res.body.errors.password.should.have.property('kind').eql('required');
                    done();
                });
        });

        it('it should not POST a user without a correctly formatted email, wrong length name fields, or wrong role', (done) => {
            chai.request(server)
                .post('/users/signup')
                .send(newWrongUser)
                .end((err, res) => {
                    res.should.have.status(500);
                    res.body.should.have.property('errors');
                    res.body.errors.should.be.a('object');
                    res.body.errors.should.have.property('role');
                    res.body.errors.role.should.have.property('kind').eql('enum');
                    res.body.errors.should.have.property('fname');
                    res.body.errors.fname.should.have.property('kind').eql('user defined');
                    res.body.errors.should.have.property('lname');
                    res.body.errors.lname.should.have.property('kind').eql('user defined');
                    res.body.errors.should.have.property('email');
                    res.body.errors.email.should.have.property('kind').eql('user defined');
                    done();
                });
        });

        it('it should POST a user with all the correct fields', (done) => {
            chai.request(server)
                .post('/users/signup')
                .send(newUser1)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('message');
                    res.body.should.have.property('message').eql('user created successfully');
                    res.body.should.have.property('userId');
                    done();
                });
        });

        it('it should not POST a user with an email already in db', (done) => {
            chai.request(server)
                .post('/users/signup')
                .send(newUser1)
                .end((err, res) => {
                    res.should.have.status(500);
                    res.body.should.have.property('code');
                    res.body.should.have.property('code').eql(11000);
                    done();
                });
        });

        let users = [newUser2, newUser3, newUser4];
        users.forEach((user) => {
            it('it should POST a different user with all the correct fields, user:' + user.email, (done) => {
                chai.request(server)
                    .post('/users/signup')
                    .send(user)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.have.property('message');
                        res.body.should.have.property('message').eql('user created successfully');
                        res.body.should.have.property('userId');
                        done();
                    });
            });
        });
    });

    /*
    * Test the /GET/faculty/ route
    */
    describe('/GET/faculty', () => {
        var Cookies;
        
        describe('Not signed in user ', () => {
            after( (done) => {
                chai.request(server)
                .post('/users/login')
                .send({
                    email: newUser2.email,
                    password: newUser2.password
                })
                .end( (err, res) => {
                    if (err) throw err;
                    Cookies = res.headers['set-cookie'].pop().split(';')[0];
                    done();
                });
            });

            it('it should Not GET all faculty users when not signed in', (done) => {
                let facultyUsers = [newUser2, newUser4];
                chai.request(server)
                    .get('/faculty')
                    .end((err, res) => {
                        res.should.have.status(401);
                        res.body.should.have.property('error');
                        res.body.error.should.be.a('object');
                        res.body.error.should.have.property('message');
                        res.body.error.should.have.property('message').eql('Unauthorized User');
                        done();
                });
            });
        });

        describe('signed in user ', () => {
            it('it should GET all faculty users only', (done) => {
                let facultyUsers = [newUser2, newUser4];
                chai.request(server)
                    .get('/faculty')
                    .set('Cookie', Cookies)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.have.property('faculty');
                        res.body.faculty.should.be.a('array');
                        res.body.faculty.length.should.be.eql(2);
                        for (i = 0; i < res.body.faculty.length; i++) {
                            res.body.faculty[i].should.have.property('fname');
                            res.body.faculty[i].should.have.property('fname').eql(facultyUsers[i].fname);
                            res.body.faculty[i].should.have.property('lname');
                            res.body.faculty[i].should.have.property('lname').eql(facultyUsers[i].lname);
                            res.body.faculty[i].should.have.property('email');
                            res.body.faculty[i].should.have.property('email').eql(facultyUsers[i].email);
                            res.body.faculty[i].should.have.property('password');
                            res.body.faculty[i].should.have.property('password').eql(null);
                        }
                        done();
                });
            });
        });
    });

    /*
    * Test the /GET/faculty/:facultyId route
    */
   describe('/GET/faculty/:facultyId', () => {
        var Cookies;
            
        describe('Not signed in user ', () => {
            after( (done) => {
                chai.request(server)
                .post('/users/login')
                .send({
                    email: newUser2.email,
                    password: newUser2.password
                })
                .end( (err, res) => {
                    if (err) throw err;
                    Cookies = res.headers['set-cookie'].pop().split(';')[0];
                    done();
                });
            });

            it('it should Not GET faculty user when not signed in', (done) => {
                let facultyUsers = [newUser2, newUser4];
                chai.request(server)
                    .get('/faculty/' + new mongoose.Types.ObjectId())
                    .end((err, res) => {
                        res.should.have.status(401);
                        res.body.should.have.property('error');
                        res.body.error.should.be.a('object');
                        res.body.error.should.have.property('message');
                        res.body.error.should.have.property('message').eql('Unauthorized User');
                        done();
                });
            });
        });


        describe('signed in user ', () => {
            it('it should GET faculty user with the given faculty id', (done) => {
                let newUser = new User(newUser5);
                newUser
                    .save()
                    .then( (user) => {
                        chai.request(server)
                            .get('/faculty/' + user._id)
                            .set('Cookie', Cookies)
                            .end((err, res) => {
                                res.should.have.status(200);
                                res.body.should.have.property('faculty');
                                res.body.faculty.should.be.a('object');
                                res.body.faculty.should.have.property('_id');
                                res.body.faculty.should.have.property('_id').eql(String(newUser5._id));
                                res.body.faculty.should.have.property('fname');
                                res.body.faculty.should.have.property('fname').eql(newUser5.fname);
                                res.body.faculty.should.have.property('lname');
                                res.body.faculty.should.have.property('lname').eql(newUser5.lname);
                                res.body.faculty.should.have.property('email');
                                res.body.faculty.should.have.property('email').eql(newUser5.email);
                                res.body.faculty.should.have.property('password');
                                res.body.faculty.should.have.property('password').eql(null);
                                done();
                            });
                    })
                    .catch((err) => {
                        console.log("ERROR1: can't insert data in db for testing");
                        done(err);
                    });
            });

            it('it should not GET faculty user with id not in db', (done) => {
                chai.request(server)
                    .get('/faculty/' + newUser6._id)
                    .set('Cookie', Cookies)
                    .end((err, res) => {
                        res.should.have.status(404);
                        res.body.should.have.property('message');
                        res.body.should.have.property('message').eql('No valid entry found for provided ID');
                        done();
                    });
            });

            it('it should not GET non faculty user with the given id', (done) => {
                let newUser = new User(newUser6);
                newUser
                    .save()
                    .then( (user) => {
                        chai.request(server)
                            .get('/faculty/' + user._id)
                            .set('Cookie', Cookies)
                            .end((err, res) => {
                                res.should.have.status(404);
                                res.body.should.have.property('message');
                                res.body.should.have.property('message').eql('No valid entry found for provided ID');
                                done();
                            });
                    })
                    .catch((err) => {
                        console.log("ERROR2: can't insert data in db for testing");
                        done(err);
                    });
            });
        });
    });

    /*
    * Test the /POST/users/login route
    */
    describe('/POST/users/login', () => {
        it('it should not POST a user with wrong email and password', (done) => {
            chai.request(server)
                .post('/users/login')
                .send(wrongLogninUser1)
                .end((err, res) => {
                    res.should.have.status(500);
                    res.body.should.have.property('error');
                    res.body.should.have.property('message').eql("can't get user with email:" + wrongLogninUser1.email);
                    done();
                });
        });

        it('it should not POST a user with correct email and wrong password', (done) => {
            chai.request(server)
                .post('/users/login')
                .send(wrongPasswordlogninUser2)
                .end((err, res) => {
                    res.should.have.status(401);
                    res.body.should.have.property('message');
                    res.body.should.have.property('message').eql('wrong password');
                    done();
                });
        });

        it('it should POST a user with correct email and password', (done) => {
            chai.request(server)
                .post('/users/login')
                .send(logninUser3)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('userId');
                    res.body.should.have.property('userId').eql(String(newUser5._id));
                    res.body.should.have.property('message');
                    res.body.should.have.property('message').eql('successfuly logged in user');
                    done();
                });
        });
    });

    /*
    * Test the /POST/users/logout route
    */
    describe('/POST/users/logout', () => {
        var Cookies;
            
        describe('Not signed in user ', () => {
            after( (done) => {
                chai.request(server)
                .post('/users/login')
                .send({
                    email: newUser5.email,
                    password: newUser5.password
                })
                .end( (err, res) => {
                    if (err) throw err;
                    Cookies = res.headers['set-cookie'].pop().split(';')[0];
                    done();
                });
            });

            it('it should not POST a user that is not already logged in', (done) => {
                chai.request(server)
                    .get('/users/logout')
                    .end((err, res) => {
                        res.should.have.status(404);
                        res.body.should.have.property('message');
                        res.body.should.have.property('message').eql("No user logged In to log out");
                        done();
                    });
            });
        });

        describe('signed in faculty user ', () => {
            it('it should POST a user that is already logged in', (done) => {
                chai.request(server)
                    .get('/users/logout')
                    .set('Cookie', Cookies)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.have.property('message');
                        res.body.should.have.property('message').eql("user logged out successfully");
                        done();
                    });
            });

            it('it should not GET all faculty if user logged out', (done) => {
                chai.request(server)
                    .get('/faculty')
                    .set('Cookie', Cookies)
                    .end((err, res) => {
                        res.should.have.status(401);
                        res.body.should.have.property('error');
                        res.body.error.should.be.a('object');
                        res.body.error.should.have.property('message');
                        res.body.error.should.have.property('message').eql('Unauthorized User');
                        done();
                    });
            });
        });
    });

    /*
    * Test the /PUT/faculty/:facultyId route
    */
   describe('/PUT/faculty/:facultyId', () => {
        var Cookies;
            
        describe('Not signed in user ', () => {
            after( (done) => {
                chai.request(server)
                .post('/users/login')
                .send({
                    email: newUser5.email,
                    password: newUser5.password
                })
                .end( (err, res) => {
                    if (err) throw err;
                    Cookies = res.headers['set-cookie'].pop().split(';')[0];
                    done();
                });
            });

            it('it should Not PUT faculty user when not signed in', (done) => {
                let facultyUsers = [newUser2, newUser4];
                chai.request(server)
                    .put('/faculty/' + new mongoose.Types.ObjectId())
                    .end((err, res) => {
                        res.should.have.status(401);
                        res.body.should.have.property('error');
                        res.body.error.should.be.a('object');
                        res.body.error.should.have.property('message');
                        res.body.error.should.have.property('message').eql('Unauthorized User');
                        done();
                });
            });
        });


        describe('signed in faculty user ', () => {
            it('it should PUT faculty user with the given faculty id', (done) => {
                chai.request(server)
                    .put('/faculty/' + newUser5._id)
                    .set('Cookie', Cookies)
                    .send(newUser5update)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.have.property('message');
                        res.body.should.have.property('message').eql('faculty updated successfully');
                        res.body.should.have.property('facultyId');
                        res.body.should.have.property('facultyId').eql(String(newUser5._id));
                        res.body.should.have.property('nModified');
                        res.body.should.have.property('nModified').eql(1);
                        done();
                    });
            });

            it('it should not PUT faculty user if there are no changes', (done) => {
                chai.request(server)
                    .put('/faculty/' + newUser5._id)
                    .set('Cookie', Cookies)
                    .send(newUser5update)
                    .end((err, res) => {
                        res.should.have.status(400);
                        res.body.should.have.property('message');
                        res.body.should.have.property('message').eql('no updates happened');
                        done();
                    });
            });

            it('it should not PUT faculty user if new email is already used for another user in db', (done) => {
                chai.request(server)
                    .put('/faculty/' + newUser5._id)
                    .set('Cookie', Cookies)
                    .send({email: newUser4.email})
                    .end((err, res) => {
                        res.should.have.status(500);
                        res.body.should.have.property('error');
                        res.body.error.should.be.a('object');
                        res.body.error.should.have.property('code');
                        res.body.error.should.have.property('code').eql(11000);
                        done();
                    });
            });


            it('it should not PUT faculty user with if another user is updating it', (done) => {
                chai.request(server)
                    .put('/faculty/' + new mongoose.Types.ObjectId())
                    .set('Cookie', Cookies)
                    .send(newUser5update)
                    .end((err, res) => {
                        res.should.have.status(401);
                        res.body.should.have.property('message');
                        res.body.should.have.property('message').eql('Unauthorized User');
                        done();
                    });
            });
        });

        describe('signed in Not faculty user ', () => {
            before( (done) => {
                chai.request(server)
                .post('/users/login')
                .send({
                    email: newUser3.email,
                    password: newUser3.password
                })
                .end( (err, res) => {
                    if (err) throw err;
                    Cookies = res.headers['set-cookie'].pop().split(';')[0];
                    done();
                });
            });

            it('it should not PUT for none faculty users', (done) => {
                chai.request(server)
                    .put('/faculty/' + newUser6._id)
                    .set('Cookie', Cookies)
                    .send(newUser5update)
                    .end((err, res) => {
                        res.should.have.status(401);
                        res.body.should.have.property('message');
                        res.body.should.have.property('message').eql('Unauthorized User');
                        done();
                    });
            });
        });
    });
});

// need at least one applicant already in db (additional to the applicant created above.)
describe('applicants', () => {
    after((done) => { //after all tests are done we empty the database
        Applicant.remove({_id:newApplicant7._id}, (err) => { 
           done();         
        });     
    });

    it('should exist', () => {
        server.should.exist;
    });
    /*
    * Test the /GET/applicants/ route
    */
    describe('/GET/applicants', () => {
        var Cookies;
            
        describe('Not signed in user ', () => {
            after( (done) => {
                chai.request(server)
                .post('/users/login')
                .send({
                    email: newUser6.email,
                    password: newUser6.password
                })
                .end( (err, res) => {
                    if (err) throw err;
                    Cookies = res.headers['set-cookie'].pop().split(';')[0];
                    done();
                });
            });

            it('it should Not GET all applicants when not signed in', (done) => {
                chai.request(server)
                    .get('/applicants')
                    .end((err, res) => {
                        res.should.have.status(401);
                        res.body.should.have.property('error');
                        res.body.error.should.be.a('object');
                        res.body.error.should.have.property('message');
                        res.body.error.should.have.property('message').eql('Unauthorized User');
                        done();
                });
            });
        });

        describe('signed in user ', () => {
            it('it should GET all applicants', (done) => {
                chai.request(server)
                    .get('/applicants')
                    .set('Cookie', Cookies)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.have.property('applicants');
                        res.body.applicants.should.be.a('array');
                        res.body.applicants.length.should.be.gt(0);
                        done();
                });
            });
        });
    });

    /*
    * Test the /GET/applicants/:applicantId route
    */
    describe('/GET/applicants/:applicantId', () => {
        var Cookies;
            
        describe('Not signed in user ', () => {
            after( (done) => {
                chai.request(server)
                .post('/users/login')
                .send({
                    email: newUser6.email,
                    password: newUser6.password
                })
                .end( (err, res) => {
                    if (err) throw err;
                    Cookies = res.headers['set-cookie'].pop().split(';')[0];
                    done();
                });
            });

            it('it should Not GET an applicant when not signed in', (done) => {
                chai.request(server)
                    .get('/applicants/' + new mongoose.Types.ObjectId())
                    .end((err, res) => {
                        res.should.have.status(401);
                        res.body.should.have.property('error');
                        res.body.error.should.be.a('object');
                        res.body.error.should.have.property('message');
                        res.body.error.should.have.property('message').eql('Unauthorized User');
                        done();
                });
            });
        });

        describe('signed in user ', () => {
            it('it should GET applicant with the given applicant id', (done) => {
                let newApplicant = new Applicant(newApplicant7);
                newApplicant
                    .save()
                    .then( (applicant) => {
                        chai.request(server)
                            .get('/applicants/' + applicant._id)
                            .set('Cookie', Cookies)
                            .end((err, res) => {
                                res.should.have.status(200);
                                res.body.should.have.property('applicant');
                                res.body.applicant.should.be.a('object');
                                res.body.applicant.should.have.property('status');
                                res.body.applicant.should.have.property('status').eql('available');
                                res.body.applicant.should.have.property('_id');
                                res.body.applicant.should.have.property('_id').eql(String(newApplicant7._id));
                                res.body.applicant.should.have.property('fname');
                                res.body.applicant.should.have.property('fname').eql(newApplicant7.fname);
                                res.body.applicant.should.have.property('lname');
                                res.body.applicant.should.have.property('lname').eql(newApplicant7.lname);
                                res.body.applicant.should.have.property('email');
                                res.body.applicant.should.have.property('email').eql(newApplicant7.email);
                                done();
                            });
                    })
                    .catch((err) => {
                        console.log("ERROR3: can't insert data in db for testing");
                        done(err);
                    });
            });

            it('it should not GET applicant with id not in db', (done) => {
                chai.request(server)
                    .get('/applicants/' + newUser6._id)
                    .set('Cookie', Cookies)
                    .end((err, res) => {
                        res.should.have.status(404);
                        res.body.should.have.property('message');
                        res.body.should.have.property('message').eql('No valid entry found for provided ID');
                        done();
                    });
            });
        });
    });

    /*
    * Test the /PUT/applicants/:applicantId route
    */
    describe('/PUT/applicants/:applicantId', () => {
        var Cookies;
            
        describe('Not signed in user ', () => {
            after( (done) => {
                chai.request(server)
                .post('/users/login')
                .send({
                    email: newUser6.email,
                    password: newUser6.password
                })
                .end( (err, res) => {
                    if (err) throw err;
                    Cookies = res.headers['set-cookie'].pop().split(';')[0];
                    done();
                });
            });

            it('it should Not PUT applicant when not signed in', (done) => {
                chai.request(server)
                    .put('/applicants/' + new mongoose.Types.ObjectId())
                    .end((err, res) => {
                        res.should.have.status(401);
                        res.body.should.have.property('error');
                        res.body.error.should.be.a('object');
                        res.body.error.should.have.property('message');
                        res.body.error.should.have.property('message').eql('Unauthorized User');
                        done();
                });
            });
        });

        describe('signed in user ', () => {
            it('it should PUT applicant with the given applicant id', (done) => {
                chai.request(server)
                    .put('/applicants/' + newApplicant7._id)
                    .set('Cookie', Cookies)
                    .send(newApplicant7update)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.have.property('message');
                        res.body.should.have.property('message').eql('Applicant status updated successfully');
                        res.body.should.have.property('applicantId');
                        res.body.should.have.property('applicantId').eql(String(newApplicant7._id));
                        res.body.should.have.property('nModified');
                        res.body.should.have.property('nModified').eql(1);
                        done();
                    });
            });

            it('it should not PUT applicant if there are no changes', (done) => {
                chai.request(server)
                    .put('/applicants/' + newApplicant7._id)
                    .set('Cookie', Cookies)
                    .send(newApplicant7update)
                    .end((err, res) => {
                        res.should.have.status(400);
                        res.body.should.have.property('message');
                        res.body.should.have.property('message').eql('no updates happened');
                        done();
                    });
            });

            it('it should not PUT applicant with id not in db', (done) => {
                chai.request(server)
                    .put('/applicants/' + new mongoose.Types.ObjectId())
                    .set('Cookie', Cookies)
                    .send(newApplicant7update)
                    .end((err, res) => {
                        res.should.have.status(400);
                        res.body.should.have.property('message');
                        res.body.should.have.property('message').eql('no updates happened');
                        done();
                    });
            });
        });
    });
});
