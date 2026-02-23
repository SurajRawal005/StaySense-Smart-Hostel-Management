const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomController');
const { requireAdmin } = require('../middleware/auth');

router.get('/', requireAdmin, roomController.getAllRooms);
router.post('/', requireAdmin, roomController.addRoom);
router.delete('/:id', requireAdmin, roomController.deleteRoom);

module.exports = router;