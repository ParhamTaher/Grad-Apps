process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let User = require('../api/models/user');

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

let logninUser3 = {
    email: "test1@mail.com",
    password: "test1password"
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
    role: "FSS",
    fname: "test5fname",
    lname: "test5lname",
    email: "test5@mail.com",
    password: "test5password"
};

let newUser6 = {
    role: "Faculty",
    fname: "test6fname",
    lname: "test6lname",
    email: "test6@mail.com",
    password: "test6password"
};



describe('Users', () => {
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
                    done();
                });
        });

        it('it should not POST a user with correct email and wrong password', (done) => {
            chai.request(server)
                .post('/users/login')
                .send(wrongPasswordlogninUser2)
                .end((err, res) => {
                    res.should.have.status(404);
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
                    console.log(res.body);
                    res.should.have.status(200);
                    res.body.should.have.property('user');
                    res.body.user.should.be.a('array');
                    done();
                });
        });
    });

    /*
    * Test the /GET route
    */
    describe('/GET/faculty', () => {
        it('it should GET all faculty users only', (done) => {
            let facultyUsers = [newUser2, newUser4];
            chai.request(server)
                .get('/faculty')
                .end((err, res) => {
                    console.log(res.body);
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
                        res.body.faculty[i].should.have.property('password').eql(facultyUsers[i].password);
                    }
                    done();
            });
        });
    });
});