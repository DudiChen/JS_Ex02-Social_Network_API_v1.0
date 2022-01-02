const express = require('express');

const postsController = require('../controllers/posts-controller');

const router = express.Router();

router.get('/posts/get-all-posts', postsController.getAllPosts);
router.get('/posts/delete-post-by-id', postsController.deletePostById);

module.exports = router;