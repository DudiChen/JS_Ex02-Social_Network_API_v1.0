const { v4: uuidv4 } = require('uuid');

const HttpError = require("../models/http-error");
const dataManager = require("../utils/data_manager");

const getAllPosts = (req, res, next) => {
    console.log('GET getAllPosts');

    const postsData = dataManager.getData("posts");
    console.log(postsData);
    res.json(postsData);
}

const deletePostById = (req, res, next) => {
    console.log('POST request in user.<id>.post');
    const postId = req.body.postId;
    dataManager.deleteData("posts", postId);

    res.json({Message: "deleted postId " + postId});
}

exports.getAllPosts = getAllPosts;
exports.deletePostById = deletePostById;