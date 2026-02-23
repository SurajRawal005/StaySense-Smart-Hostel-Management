const express = require('express');
const session = require('express-session');
const cors = require('cors');
require('dotenv').config();

const adminRoutes = require('./routes/admin.routes');
const residentRoutes = require('./routes/resident.routes');
const roomRoutes = require('./routes/room.routes');
const complaintRoutes = require('./routes/complaint.routes');

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: process.env.SESSION_SECRET || 'staysense_fallback_secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000
  }
}));

app.use('/api/admin', adminRoutes);
app.use('/api/resident', residentRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/complaints', complaintRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});