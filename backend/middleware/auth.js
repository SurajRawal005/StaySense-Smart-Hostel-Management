const requireAdmin = (req, res, next) => {
  if (!req.session.admin) {
    return res.status(401).json({ message: 'Admin authentication required' });
  }
  next();
};

const requireResident = (req, res, next) => {
  if (!req.session.resident) {
    return res.status(401).json({ message: 'Resident authentication required' });
  }
  next();
};

module.exports = { requireAdmin, requireResident };