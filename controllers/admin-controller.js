const HttpError = require("../models/http-error");
const dataManager = require("../utils/data_manager");

const getAllUsers = (req, res, next) => {
    console.log('GET getAllUsers');

    const users = dataManager.getData("users")
    res.json(users);
}

const getAllPendingUsers = (req, res, next) => {
    console.log('GET getAllUsers');

    const users = dataManager.getData("users").filter(user => user.status === "created");
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

const approveJoinRequest = (req, res, next) => {
    console.log('POST suspending user');
    
    const userId = req.body.id;
    const users = dataManager.getData("users");
    const selectedUser = users.filter(user => user.id === userId);
    
    if(selectedUser && selectedUser[0].status == "created") {
        dataManager.updateData("users", userId, "status", "active")
        res.json({Message: `user id: ${userId} approved`});
    }
    else {
        return next(new HttpError(`cannot approve user ${userId}.`, 400));
    }
}

const suspendUser = (req, res, next) => {
    console.log('POST suspending user');
    const userId = req.body.id;
    
    dataManager.updateData("users", userId, "status", "suspended")

    res.json({Message: "suspended user " + userId});
}

const deleteUser = (req, res, next) => {
    console.log('POST deleting user');
    const userId = req.body.id;
    
    dataManager.updateData("users", userId, "status", "deleted")

    res.json({Message: "suspended user " + userId});

}

const restoreSuspendedUser = (req, res, next) => {
    console.log('POST suspending user');
    
    const userId = req.body.id;
    const users = dataManager.getData("users");
    const selectedUser = users.filter(user => user.id === userId);
    
    if(selectedUser[0].status != "deleted") {
        dataManager.updateData("users", userId, "status", "active")
        res.json({Message: `restored user ${userId}`});
    }
    else {
        res.json({Message: `cannot restored user ${userId}. He's deleted`});
    }
}

const sendMessageToAllUsers = (req, res, next) => {
    console.log('POST sendMessageToUser');

    const message = req.body.message;

    dataManager.saveData("messages", {from: "admin", to: "*", message: message});

    res.json({Result: `I've messaged ${message} to everyone`});

}

exports.getAllUsers = getAllUsers;
exports.approveJoinRequest = approveJoinRequest;
exports.suspendUser = suspendUser;
exports.deleteUser = deleteUser;
exports.restoreSuspendedUser = restoreSuspendedUser;
exports.sendMessageToAllUsers = sendMessageToAllUsers;
exports.getAllPendingUsers = getAllPendingUsers;
exports.getUser = getUser