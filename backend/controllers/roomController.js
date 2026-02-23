const db = require('../config/db');

const getAllRooms = async (req, res) => {
  try {
    const [rooms] = await db.query('SELECT * FROM rooms ORDER BY block, room_number');
    res.json({ rooms });
  } catch (error) {
    console.error('Get rooms error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const addRoom = async (req, res) => {
  try {
    const { room_number, block, capacity } = req.body;

    if (!room_number || !block || !capacity) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const [existing] = await db.query('SELECT * FROM rooms WHERE room_number = ?', [room_number]);
    if (existing.length > 0) {
      return res.status(400).json({ message: 'Room number already exists' });
    }

    const [result] = await db.query(
      'INSERT INTO rooms (room_number, block, capacity, occupied) VALUES (?, ?, ?, 0)',
      [room_number, block, capacity]
    );

    res.status(201).json({
      message: 'Room added successfully',
      roomId: result.insertId
    });
  } catch (error) {
    console.error('Add room error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteRoom = async (req, res) => {
  try {
    const { id } = req.params;
    await db.query('DELETE FROM rooms WHERE id = ?', [id]);
    res.json({ message: 'Room deleted successfully' });
  } catch (error) {
    console.error('Delete room error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getAllRooms,
  addRoom,
  deleteRoom
};