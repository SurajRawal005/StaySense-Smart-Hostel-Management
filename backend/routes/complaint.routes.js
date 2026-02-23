const express = require('express');
const router = express.Router();
const complaintController = require('../controllers/complaintController');
const { requireAdmin, requireResident } = require('../middleware/auth');

router.get('/all', requireAdmin, complaintController.getAllComplaints);
router.get('/my', requireResident, complaintController.getResidentComplaints);
router.post('/', requireResident, complaintController.createComplaint);
router.put('/:id/status', requireAdmin, complaintController.updateComplaintStatus);

module.exports = router;