const express = require('express');

const adminController = require('../controllers/admin-controller');

const router = express.Router();

router.get('/admin/get-all-users', adminController.getAllUsers);

module.exports = router;