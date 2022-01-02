const { v4: uuidv4 } = require('uuid');

const HttpError = require("../models/http-error")

const DUMY_USERS = [
    {
        id: uuidv4(),
        email: 'dudi@cool.com',
        password: 'passw0rd',
        fullname: "dudi dudi",
        date_created: "2020-01-01",
        status: 'created'
    }, 
    {
        id: uuidv4(),
        email: 'alex@yes.com',
        password: 'asdf1234',
        fullname: "alex alex",
        date_created: "2020-01-01",
        status: 'created'
    }, 
    {
        id: uuidv4(),
        email: 'yanki@samim.com',
        password: '1111',
        fullname: "yanki dudi",
        date_created: "2020-01-01",
        status: 'created'
    }
]

const getAllUsers = (req, res, next) => {
    console.log('GET getAllUsers');

    res.json(DUMY_USERS);
}

const approveJoinRequest = (req, res, next) => {
    console.log('POST approveJoinRequest');
    const { email, password } = req.body;

    res.json({Message: "test post of user id " + userId});

}

const suspendUser = (req, res, next) => {
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

const deleteUser = (req, res, next) => {
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

const restoreSuspendedUser = (req, res, next) => {
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

const sendMessageToAllUsers = (req, res, next) => {
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

const deletePost = (req, res, next) => {
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

exports.getAllUsers = getAllUsers;