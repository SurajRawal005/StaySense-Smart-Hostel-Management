import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import AdminLogin from './pages/admin/AdminLogin';
import AdminRegister from './pages/admin/AdminRegister';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminRooms from './pages/admin/AdminRooms';
import AdminResidents from './pages/admin/AdminRegister';
import AdminComplaints from './pages/admin/AdminComplaints';
import ResidentLogin from './pages/resident/ResidentLogin';
import ResidentRegister from './pages/resident/ResidentRegister';
import ResidentDashboard from './pages/resident/ResidentDashboard';
import ResidentComplaints from './pages/resident/ResidentComplaints';
import ResidentProfile from './pages/resident/ResidentProfile';
import ResidentDues from './pages/resident/ResidentDues';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/register" element={<AdminRegister />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/rooms" element={<AdminRooms />} />
        <Route path="/admin/residents" element={<AdminResidents />} />
        <Route path="/admin/complaints" element={<AdminComplaints />} />
        
        <Route path="/resident/login" element={<ResidentLogin />} />
        <Route path="/resident/register" element={<ResidentRegister />} />
        <Route path="/resident/dashboard" element={<ResidentDashboard />} />
        <Route path="/resident/complaints" element={<ResidentComplaints />} />
        <Route path="/resident/dues" element={<ResidentDues />} />
        <Route path="/resident/profile" element={<ResidentProfile />} />
        
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;