const { v4: uuidv4 } = require('uuid');

const HttpError = require("../models/http-error")
const dataManager = require("../utils/data_manager")

let auth = false;
let allowed = true;

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

const DUMY_MESSAGES = [
    {
        id: 1,
        created_by: 1,
        created_for: 2,
        creation_date: '2020-01-01',
        text: "message1"
    },
    {
        id: 2,
        created_by: 2,
        created_for: 1,
        creation_date: '2020-01-01',
        text: "message2"
    },
    {
        id: 3,
        created_by: 3,
        created_for: 1,
        creation_date: '2020-01-01',
        text: "message3"
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

const newPost = (req, res, next) => {
    console.log('POST request in user.<id>.post');
    const userId = req.params.uid;
    const text = req.body.text;

    if(!auth) {
        return next(new HttpError("user not authorized", 401));
    }
    if(!allowed) {
        return next(new HttpError("action is forbidden", 403));
    }

    const postId = uuidv4();
    console.log('saving data');
    dataManager.saveData("posts", {uId: userId, pId: postId, txt: text})
    console.log('saved data');
    res.json({pId: postId});

}

const sendMessageToUser = (req, res, next) => {
    console.log('POST sendMessageToUser');

    const { from, to, message } = req.body;

    res.json({Result: `Ive sent ${message} from ${from} to ${to}`});
}

exports.login = login;
exports.newPost = newPost;
exports.sendMessageToUser = sendMessageToUser;
