const { v4: uuidv4 } = require('uuid');

const HttpError = require("../models/http-error");
const dataManager = require("../utils/data_manager");

let auth = false;
let allowed = true;

// const DUMY_USERS = [
//     {
//         id: uuidv4(),
//         email: 'dudi@cool.com',
//         password: 'passw0rd',
//         fullname: "dudi dudi",
//         date_created: "2020-01-01",
//         status: 'created'
//     }, 
//     {
//         id: uuidv4(),
//         email: 'alex@yes.com',
//         password: 'asdf1234',
//         fullname: "alex alex",
//         date_created: "2020-01-01",
//         status: 'created'
//     }, 
//     {
//         id: uuidv4(),
//         email: 'yanki@samim.com',
//         password: '1111',
//         fullname: "yanki dudi",
//         date_created: "2020-01-01",
//         status: 'created'
//     }
// ]

const login = (req, res, next) => {
    console.log('POST request in user.login');
    const { email, password } = req.body;

    // if(DUMY_USERS.find(user => user.email === email && user.password === password)) {
    //     auth = true;
    // }

    if(dataManager.getData("users").find(user => user.email === email && user.password === password)) {
            auth = true;
    }
    

    if(!auth) {
        return next(new HttpError("user not authorized", 401));
    }
    res.json({auth: "true"});
}

const newPost = (req, res, next) => {
    console.log('POST newPost');
    const userId = req.params.uid;
    const text = req.body.text;

    if(!auth) {
        return next(new HttpError("user not authorized", 401));
    }
    if(!allowed) {
        return next(new HttpError("action is forbidden", 403));
    }

    dataManager.saveData("posts", {uId: userId, txt: text});
    res.json({pId: postId});

}

const sendMessageToUser = (req, res, next) => {
    console.log('POST sendMessageToUser');

    const { from, to, message } = req.body;

    dataManager.saveData("messages", {from: from, to: to, message: message});

    res.json({Result: `Ive sent ${message} from ${from} to ${to}`});
}

exports.login = login;
exports.newPost = newPost;
exports.sendMessageToUser = sendMessageToUser;
