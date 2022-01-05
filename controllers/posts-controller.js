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
    // const postId = req.body.postId;
    const { userId, postId } = req.body;
    const userPost = dataManager.getData("posts").find((post) => post.id === postId);
    if (post && post.uId === userId) {
        dataManager.deleteData("posts", postId);
        res.json({Message: "deleted postId " + postId});
    }
    else {
        const message;
        if (!post) {
            message = `post by id ${postId} not found`
            return next(new HttpError(message, 400));
        }
        else {
            message = `Not authorize: user is not post creator`
            return next(new HttpError(message, 403));
        }
    }
}

exports.getAllPosts = getAllPosts;
exports.deletePostById = deletePostById;