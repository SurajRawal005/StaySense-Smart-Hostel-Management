const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { requireAdmin } = require('../middleware/auth');

router.post('/login', adminController.adminLogin);
router.post('/register', adminController.adminRegister);
router.get('/session', adminController.getAdminSession);
router.post('/logout', adminController.adminLogout);
router.get('/dashboard', requireAdmin, adminController.getAdminDashboard);

module.exports = router;