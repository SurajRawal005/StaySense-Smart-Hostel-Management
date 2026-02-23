const db = require('../config/db');

const residentLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const [residents] = await db.query(
      'SELECT * FROM residents WHERE email = ? AND password = ?',
      [email, password]
    );

    if (residents.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const resident = residents[0];
    req.session.resident = {
      id: resident.id,
      name: resident.name,
      email: resident.email,
      room_number: resident.room_number,
      block: resident.block
    };

    res.json({
      message: 'Login successful',
      resident: req.session.resident
    });
  } catch (error) {
    console.error('Resident login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const residentRegister = async (req, res) => {
  try {
    const { name, email, password, room_number, block } = req.body;

    if (!name || !email || !password || !room_number || !block) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const [existing] = await db.query('SELECT * FROM residents WHERE email = ?', [email]);
    if (existing.length > 0) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const [result] = await db.query(
      'INSERT INTO residents (name, email, password, room_number, block) VALUES (?, ?, ?, ?, ?)',
      [name, email, password, room_number, block]
    );

    res.status(201).json({
      message: 'Resident registered successfully',
      residentId: result.insertId
    });
  } catch (error) {
    console.error('Resident registration error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getResidentSession = (req, res) => {
  if (!req.session.resident) {
    return res.status(401).json({ message: 'Not authenticated' });
  }
  res.json({ resident: req.session.resident });
};

const residentLogout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'Logout failed' });
    }
    res.clearCookie('connect.sid');
    res.json({ message: 'Logout successful' });
  });
};

const getAllResidents = async (req, res) => {
  try {
    const [residents] = await db.query('SELECT id, name, email, room_number, block, created_at FROM residents');
    res.json({ residents });
  } catch (error) {
    console.error('Get residents error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const assignRoom = async (req, res) => {
  try {
    const { residentId, room_number, block } = req.body;

    await db.query(
      'UPDATE residents SET room_number = ?, block = ? WHERE id = ?',
      [room_number, block, residentId]
    );

    res.json({ message: 'Room assigned successfully' });
  } catch (error) {
    console.error('Assign room error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteResident = async (req, res) => {
  try {
    const { id } = req.params;
    await db.query('DELETE FROM residents WHERE id = ?', [id]);
    res.json({ message: 'Resident deleted successfully' });
  } catch (error) {
    console.error('Delete resident error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  residentLogin,
  residentRegister,
  getResidentSession,
  residentLogout,
  getAllResidents,
  assignRoom,
  deleteResident
};