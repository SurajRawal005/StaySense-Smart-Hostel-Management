const express = require('express');
const router = express.Router();
const residentController = require('../controllers/residentController');
const { requireAdmin, requireResident } = require('../middleware/auth');

router.post('/login', residentController.residentLogin);
router.post('/register', residentController.residentRegister);
router.get('/session', residentController.getResidentSession);
router.post('/logout', residentController.residentLogout);
router.get('/all', requireAdmin, residentController.getAllResidents);
router.post('/assign-room', requireAdmin, residentController.assignRoom);
router.delete('/:id', requireAdmin, residentController.deleteResident);

module.exports = router;