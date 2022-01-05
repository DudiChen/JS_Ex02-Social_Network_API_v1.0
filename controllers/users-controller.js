const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');

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

const login = async (req, res, next) => {
    console.log('POST request in user.login');
    const { email, password } = req.body;

    // if(DUMY_USERS.find(user => user.email === email && user.password === password)) {
    //     auth = true;
    // }
    let existingUser;
    existingUser = dataManager.getData("users").find(user => user.email === email)
    

    if(!existingUser) {
        return next(new HttpError("wrong credentials", 401));
    }

    try {
        auth = await bcrypt.compare(password, existingUser.password)
    }
    catch {
        return next(new HttpError("could not login. please try again", 500));
    }
    
    if(auth) {
        res.json({userId: existingUser.id});
    }
    else {
        return next(new HttpError("wrong credentials", 401));
    }
}

const signup = async (req, res, next) => {
    console.log('POST signup');
    const { email, password, fullName } = req.body;

    let userExists;
    userExists = dataManager.getData("users").find(user => user.email === email);

    if(userExists) {
        const error = new HttpError(
            'please use a different email.',
            401
            );
        
        return next(error);
    }

    let hashedPassword;
    try {
        hashedPassword = await bcrypt.hash(password, 12);
    } catch (err) {
        const error = new HttpError(
        'Could not create user, please try again.',
        500
        );
        return next(error);
    }

    dataManager.saveData("users", 
    {
        email: email, 
        password: hashedPassword, 
        fullName: fullName, 
        creationDate: new Date().toLocaleString(), 
        status: "created"
    })

    let existingUser;
    existingUser = dataManager.getData("users").find(user => user.email === email);

    if(existingUser) {
        res.json({
            newId: "Created new user",
            userId: existingUser.id
        });
    }
    else {
        const error = new HttpError(
            'Could not create user, please try again.',
            500
            );
        
        return next(error);
    }

}

const newPost = (req, res, next) => {
    console.log('POST newPost');
    const userId = req.params.uid;
    const text = req.body.text;
    const date = new Date().toLocaleString();

    if(!auth) {
        return next(new HttpError("user not authorized", 401));
    }
    if(!allowed) {
        return next(new HttpError("action is forbidden", 403));
    }

    dataManager.saveData("posts", {uId: userId, date: date, txt: text});
    res.json({pId: postId});

}

const sendMessageToUser = (req, res, next) => {
    console.log('POST sendMessageToUser');

    const { from, to, message } = req.body;

    const users = dataManager.getData("users");
    if(users.find(user => user.status === "active" && user.id === to)) {
        dataManager.saveData("messages", {from: from, to: to, message: message});
        res.json({Result: `Ive sent ${message} from ${from} to ${to}`});
    }
    else {
        return next(new HttpError("recipient not found", 400));
    }

}

const getAllUsers = (req, res, next) => {
    console.log('GET getAllUsers');

    const users = dataManager.getData("users").filter(users => users.status === "active").maps(user => {
        delete user.email;
        delete user.password;
        delete user.creationDate;
        delete user.status;
        return user
    })
    res.json(users);
}



const getUser = (req, res, next) => {
    console.log('GET getAllUsers');

    const userId = req.body.id;
    const users = dataManager.getData("users");
    const selectedUser = users.filter(user => user.id === userId)[0];

    if(selectedUser) {
        res.json(selectedUser);
    }
    else {
        return next(new HttpError(`user id ${userId} not found`, 400));
    }
}


const getAllMessages = (req, res, next) => {
    console.log('GET getAllMessages');
    const { id } = req.body;

    const userMessagesData = dataManager.getData("messages").filter((message) => message.to === id || message.to === '*');
    // TODO: remove line:
    console.log(userMessagesData);
    res.json(userMessagesData);
}

exports.login = login;
exports.newPost = newPost;
exports.sendMessageToUser = sendMessageToUser;
exports.signup = signup;
exports.getAllUsers = getAllUsers;
exports.getUser = getUser;
exports.getAllMessages = getAllMessages;
