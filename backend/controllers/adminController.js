const db = require('../config/db');

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const [admins] = await db.query(
      'SELECT * FROM admins WHERE email = ? AND password = ?',
      [email, password]
    );

    if (admins.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const admin = admins[0];
    req.session.admin = {
      id: admin.id,
      name: admin.name,
      email: admin.email
    };

    res.json({
      message: 'Login successful',
      admin: req.session.admin
    });
  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const adminRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const [existing] = await db.query('SELECT * FROM admins WHERE email = ?', [email]);
    if (existing.length > 0) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const [result] = await db.query(
      'INSERT INTO admins (name, email, password) VALUES (?, ?, ?)',
      [name, email, password]
    );

    res.status(201).json({
      message: 'Admin registered successfully',
      adminId: result.insertId
    });
  } catch (error) {
    console.error('Admin registration error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getAdminSession = (req, res) => {
  if (!req.session.admin) {
    return res.status(401).json({ message: 'Not authenticated' });
  }
  res.json({ admin: req.session.admin });
};

const adminLogout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'Logout failed' });
    }
    res.clearCookie('connect.sid');
    res.json({ message: 'Logout successful' });
  });
};

const getAdminDashboard = async (req, res) => {
  try {
    const [totalResidents] = await db.query('SELECT COUNT(*) as count FROM residents');
    const [totalRooms] = await db.query('SELECT COUNT(*) as count FROM rooms');
    const [occupiedRooms] = await db.query('SELECT COUNT(*) as count FROM rooms WHERE occupied > 0');
    const [pendingComplaints] = await db.query('SELECT COUNT(*) as count FROM complaints WHERE status = "Pending"');

    const stats = {
      totalResidents: totalResidents[0].count,
      totalRooms: totalRooms[0].count,
      occupiedRooms: occupiedRooms[0].count,
      pendingComplaints: pendingComplaints[0].count,
      monthlyRevenue: totalResidents[0].count * 5000
    };

    res.json({ stats });
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  adminLogin,
  adminRegister,
  getAdminSession,
  adminLogout,
  getAdminDashboard
};