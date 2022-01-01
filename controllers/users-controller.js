const { v4: uuidv4 } = require('uuid');

const HttpError = require("../models/http-error")

let auth = false;
let allowed = true;

const DUMY_USERS = [
    {
        id: uuidv4(),
        email: 'dudi@cool.com',
        password: 'passw0rd',
    }, 
    {
        id: uuidv4(),
        email: 'alex@yes.com',
        password: 'asdf1234',
    }, 
    {
        id: uuidv4(),
        email: 'yanki@samim.com',
        password: '1111',
    }
]


const login = (req, res, next) => {
    console.log('POST request in user.login');
    const { email, password } = req.body;

    if(DUMY_USERS.find(user => user.email === email && user.password === password)) {
        auth = true;
    }

    if(!auth) {
        return next(new HttpError("user not authorized", 401));
    }
    res.json({auth: "true"});
}

const postById = (req, res, next) => {
    console.log('POST request in user.<id>.post');
    const userId = req.params.id;
    if(!auth) {
        return next(new HttpError("user not authorized", 401));
    }
    if(!allowed) {
        return next(new HttpError("action is forbidden", 403));
    }
    res.json({Message: "test post of user id " + userId});

}

exports.login = login;
exports.postById = postById;