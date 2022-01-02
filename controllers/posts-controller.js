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

const DUMY_POSTS = [
    {
        id: 1,
        created_by: 1,
        creation_date: '2020-01-01',
        text: "bla bla"
    },
    {
        id: 2,
        created_by: 2,
        creation_date: '2020-01-01',
        text: "blop blip"
    },
    {
        id: 3,
        created_by: 3,
        creation_date: '2020-01-01',
        text: "pim pum"
    }
]

const getAllPosts = (req, res, next) => {
    console.log('GET getAllPosts');
    
    if(!auth) {
        return next(new HttpError("user not authorized", 401));
    }
    if(!allowed) {
        return next(new HttpError("action is forbidden", 403));
    }

    res.json(DUMY_POSTS);
}

const deletePostById = (req, res, next) => {
    console.log('POST request in user.<id>.post');
    const postId = req.params.postId;

    if(!auth) {
        return next(new HttpError("user not authorized", 401));
    }
    if(!allowed) {
        return next(new HttpError("action is forbidden", 403));
    }

    res.json({Message: "deleted postId " + postId});
}

exports.getAllPosts = getAllPosts;
exports.deletePostById = deletePostById;