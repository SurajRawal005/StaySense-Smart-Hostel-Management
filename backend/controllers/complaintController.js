const db = require('../config/db');

const getAllComplaints = async (req, res) => {
  try {
    const [complaints] = await db.query(
      `SELECT c.*, r.name as resident_name, r.room_number, r.block 
       FROM complaints c 
       JOIN residents r ON c.resident_id = r.id 
       ORDER BY c.created_at DESC`
    );
    res.json({ complaints });
  } catch (error) {
    console.error('Get all complaints error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getResidentComplaints = async (req, res) => {
  try {
    const residentId = req.session.resident.id;
    const [complaints] = await db.query(
      'SELECT * FROM complaints WHERE resident_id = ? ORDER BY created_at DESC',
      [residentId]
    );
    res.json({ complaints });
  } catch (error) {
    console.error('Get resident complaints error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const createComplaint = async (req, res) => {
  try {
    const { title, description } = req.body;
    const residentId = req.session.resident.id;

    if (!title || !description) {
      return res.status(400).json({ message: 'Title and description are required' });
    }

    const [result] = await db.query(
      'INSERT INTO complaints (resident_id, title, description, status) VALUES (?, ?, ?, "Pending")',
      [residentId, title, description]
    );

    res.status(201).json({
      message: 'Complaint submitted successfully',
      complaintId: result.insertId
    });
  } catch (error) {
    console.error('Create complaint error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateComplaintStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status || !['Pending', 'Resolved'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    await db.query('UPDATE complaints SET status = ? WHERE id = ?', [status, id]);
    res.json({ message: 'Complaint status updated successfully' });
  } catch (error) {
    console.error('Update complaint error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getAllComplaints,
  getResidentComplaints,
  createComplaint,
  updateComplaintStatus
};