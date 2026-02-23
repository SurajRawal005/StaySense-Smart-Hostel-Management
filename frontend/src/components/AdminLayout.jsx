import { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

function AdminLayout({ children }) {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/admin/session', {
        credentials: 'include'
      });
      
      if (response.ok) {
        const data = await response.json();
        setAdmin(data.admin);
      } else {
        navigate('/admin/login', { replace: true });
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      navigate('/admin/login', { replace: true });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('http://localhost:5000/api/admin/logout', {
        method: 'POST',
        credentials: 'include'
      });
      navigate('/admin/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!admin) {
    return null;
  }

  return (
    <div className="admin-layout">
      <div className="sidebar">
        <div className="sidebar-header">
          <h2>StaySense</h2>
          <p>Admin Portal</p>
        </div>
        
        <nav className="sidebar-nav">
          <Link 
            to="/admin/dashboard" 
            className={`nav-item ${location.pathname === '/admin/dashboard' ? 'active' : ''}`}
          >
            📊 Dashboard
          </Link>
          <Link 
            to="/admin/rooms" 
            className={`nav-item ${location.pathname === '/admin/rooms' ? 'active' : ''}`}
          >
            🏠 Rooms
          </Link>
          <Link 
            to="/admin/residents" 
            className={`nav-item ${location.pathname === '/admin/residents' ? 'active' : ''}`}
          >
            👥 Residents
          </Link>
          <Link 
            to="/admin/complaints" 
            className={`nav-item ${location.pathname === '/admin/complaints' ? 'active' : ''}`}
          >
            📋 Complaints
          </Link>
        </nav>
        
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>
      
      <div className="main-content">
        {children}
      </div>
    </div>
  );
}

export default AdminLayout;