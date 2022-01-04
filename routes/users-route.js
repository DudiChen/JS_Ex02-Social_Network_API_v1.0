const express = require('express');

const usersController = require('../controllers/users-controller');

const router = express.Router();

router.post('/user/login', usersController.login);
router.post('/user/:uid/post', usersController.newPost);
router.post('/user/send-message', usersController.sendMessageToUser);

module.exports = router;