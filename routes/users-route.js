const express = require('express');

const usersController = require('../controllers/users-controller');

const router = express.Router();

router.post('/user/login', usersController.login);
router.post('/user/:uid/post', usersController.newPost);
router.post('/user/send-message', usersController.sendMessageToUser);
router.post('/user/signup', usersController.signup);
router.post('/user/get-user', usersController.getUser);
router.get('/user/get-all-users', usersController.getAllUsers);

module.exports = router;