const express = require('express');

const usersController = require('../controllers/users-controller');

const router = express.Router();

router.post('/user/login', usersController.login);

router.post('/user/:id/post', usersController.postById);

module.exports = router;