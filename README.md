# 🏨 StaySense – Smart Hostel Management System

A full-stack web application for managing hostel operations with separate Admin and Resident portals. Built with modern web technologies and focusing on security, scalability, and user experience.

## ✨ Features

### Admin Portal
- 📊 Live dashboard with analytics (occupancy rate, revenue, complaint status)
- 🏠 Room management (add, view, delete rooms)
- 👥 Resident management (view all, assign rooms, remove residents)
- 📋 Complaint tracking (view all complaints, update status)
- 🔔 Recent activity feed and quick actions
- 📈 System status monitoring

### Resident Portal
- 🏠 Personal dashboard with room information
- 📋 Submit and track complaints
- 💰 View payment dues and upcoming events
- 👤 Profile management with completion tracker
- 📢 Hostel announcements and notices

## 🛠️ Tech Stack

**Frontend:**
- React (Vite)
- React Router v6
- Plain CSS (responsive, mobile-first)

**Backend:**
- Node.js
- Express.js
- Express-Session (session-based auth)
- CORS

**Database:**
- MySQL
- mysql2 driver

**Architecture:**
- MVC pattern (Routes → Controllers → Database)
- RESTful API design
- Role-based access control (RBAC)

## 🗄️ Database Schema

- `admins` – Admin user accounts
- `residents` – Resident user accounts with room assignments
- `rooms` – Room inventory with capacity and occupancy tracking
- `complaints` – Complaint tickets with status tracking

## 🔐 Security Features

- Session-based authentication (no JWT)
- HttpOnly cookies
- CORS configuration with credentials
- Protected routes with auth middleware
- Role-based access control (Admin vs Resident)

## 🚀 Getting Started

### Prerequisites
- Node.js (v14+)
- MySQL (v8+)

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/staysense.git
cd staysense
```

2. Setup Backend
```bash
cd backend
npm install
# Create .env file with your MySQL credentials
npm start
```

3. Setup Frontend
```bash
cd frontend
npm install
npm run dev
```

4. Setup Database
```sql
CREATE DATABASE staysense;
-- Run schema.sql to create tables
```

### Default Login Credentials
**Admin:**
- Email: admin@staysense.com
- Password: admin123

**Resident:**
- Email: john@staysense.com
- Password: john123



## 🎯 Learning Outcomes

- Full-stack development with React and Node.js
- RESTful API design and implementation
- Session-based authentication and authorization
- MySQL database design and queries
- CORS configuration and security best practices
- MVC architecture pattern
- Responsive web design

## 📄 License
MIT

## 👤 Author
**Suraj Singh Rawal**
- Email: surajrawal228@gmail.com
```

---

## 🔥 One-Liner Tagline (for social media/portfolio)
```
Full-stack hostel management system with role-based access, live analytics, and session-based auth. React + Node.js + MySQL.
