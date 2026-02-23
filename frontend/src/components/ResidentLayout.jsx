import { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

function ResidentLayout({ children }) {
  const [resident, setResident] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/resident/session', {
        credentials: 'include'
      });
      
      if (response.ok) {
        const data = await response.json();
        setResident(data.resident);
      } else {
        navigate('/resident/login');
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      navigate('/resident/login');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('http://localhost:5000/api/resident/logout', {
        method: 'POST',
        credentials: 'include'
      });
      navigate('/resident/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="resident-layout">
      <div className="sidebar">
        <div className="sidebar-header">
          <h2>StaySense</h2>
          <p>Resident Portal</p>
        </div>
        
        <nav className="sidebar-nav">
          <Link 
            to="/resident/dashboard" 
            className={`nav-item ${location.pathname === '/resident/dashboard' ? 'active' : ''}`}
          >
            🏠 Dashboard
          </Link>
          <Link 
            to="/resident/complaints" 
            className={`nav-item ${location.pathname === '/resident/complaints' ? 'active' : ''}`}
          >
            📋 Complaints
          </Link>
          <Link 
            to="/resident/profile" 
            className={`nav-item ${location.pathname === '/resident/profile' ? 'active' : ''}`}
          >
            <Link 
  to="/resident/dues" 
  className={`nav-item ${location.pathname === '/resident/dues' ? 'active' : ''}`}
>
  💰 Dues & Events
</Link>
            👤 Profile
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

export default ResidentLayout;