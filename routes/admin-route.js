const express = require('express');

const adminController = require('../controllers/admin-controller');

const router = express.Router();


router.post('/admin/approve-join-request', adminController.approveJoinRequest);
router.post('/admin/suspend-user', adminController.suspendUser);
router.post('/admin/restore-user', adminController.restoreSuspendedUser);
router.post('/admin/delete-user', adminController.deleteUser);
router.post('/admin/message-all-users', adminController.sendMessageToAllUsers);
router.get('/admin/get-pending-users', adminController.getAllPendingUsers);
router.get('/admin/get-all-users', adminController.getAllUsers);



module.exports = router;