import { useState, useEffect } from 'react';
import ResidentLayout from '../../components/ResidentLayout';

function ResidentDashboard() {
  const [resident, setResident] = useState(null);
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [residentRes, complaintsRes] = await Promise.all([
        fetch('http://localhost:5000/api/resident/session', { credentials: 'include' }),
        fetch('http://localhost:5000/api/complaints/my', { credentials: 'include' })
      ]);
      
      if (residentRes.ok) {
        const residentData = await residentRes.json();
        setResident(residentData.resident);
      }
      
      if (complaintsRes.ok) {
        const complaintsData = await complaintsRes.json();
        setComplaints(complaintsData.complaints);
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  const pendingComplaints = complaints.filter(c => c.status === 'Pending').length;
  const resolvedComplaints = complaints.filter(c => c.status === 'Resolved').length;

  // Profile completion calculation
  const profileFields = [
    resident?.name,
    resident?.email,
    resident?.room_number,
    resident?.block
  ];
  const completedFields = profileFields.filter(field => field).length;
  const profileCompletion = Math.round((completedFields / profileFields.length) * 100);

  // Dummy announcements
  const announcements = [
    {
      id: 1,
      type: 'maintenance',
      title: 'Scheduled Maintenance',
      message: 'Water supply will be interrupted on Sunday 8 AM - 12 PM for tank cleaning.',
      date: '2 days from now',
      icon: '🔧'
    },
    {
      id: 2,
      type: 'event',
      title: 'Diwali Celebration',
      message: 'Join us for Diwali celebrations in the common area on November 12th at 7 PM.',
      date: '5 days from now',
      icon: '🎉'
    },
    {
      id: 3,
      type: 'fee',
      title: 'Fee Reminder',
      message: 'Monthly hostel fees for November are due by 10th November. Please clear your dues.',
      date: '1 week from now',
      icon: '💰'
    }
  ];

  // Recent complaints (last 3)
  const recentComplaints = complaints.slice(0, 3);

  return (
    <ResidentLayout>
      <div className="resident-dashboard-header">
        <div>
          <h1 className="dashboard-title">Welcome Back, {resident?.name?.split(' ')[0] || 'Resident'}!</h1>
          <p className="dashboard-subtitle">Here's your hostel overview</p>
        </div>
        <div className="dashboard-date">
          {new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>
      </div>

      {loading ? (
        <div className="loading">Loading dashboard...</div>
      ) : resident ? (
        <>
          {/* Summary Cards */}
          <div className="resident-stats-grid">
            <div className="resident-stat-card">
              <div className="stat-card-icon total-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" strokeWidth="2"/>
                  <polyline points="14 2 14 8 20 8" strokeWidth="2"/>
                </svg>
              </div>
              <div className="stat-card-content">
                <div className="stat-card-value">{complaints.length}</div>
                <div className="stat-card-label">Total Complaints</div>
              </div>
            </div>

            <div className="resident-stat-card">
              <div className="stat-card-icon pending-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle cx="12" cy="12" r="10" strokeWidth="2"/>
                  <polyline points="12 6 12 12 16 14" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="stat-card-content">
                <div className="stat-card-value">{pendingComplaints}</div>
                <div className="stat-card-label">Pending Complaints</div>
              </div>
            </div>

            <div className="resident-stat-card">
              <div className="stat-card-icon resolved-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" strokeWidth="2" strokeLinecap="round"/>
                  <polyline points="22 4 12 14.01 9 11.01" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="stat-card-content">
                <div className="stat-card-value">{resolvedComplaints}</div>
                <div className="stat-card-label">Resolved Complaints</div>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="resident-content-grid">
            {/* Left Column */}
            <div className="resident-left-column">
              {/* Room Info Card */}
              <div className="info-card room-info-card">
                <h3 className="info-card-title">Your Room</h3>
                <div className="room-details">
                  <div className="room-detail-item">
                    <div className="room-detail-icon">🏠</div>
                    <div>
                      <div className="room-detail-label">Room Number</div>
                      <div className="room-detail-value">{resident.room_number || 'Not Assigned'}</div>
                    </div>
                  </div>
                  <div className="room-detail-item">
                    <div className="room-detail-icon">🏢</div>
                    <div>
                      <div className="room-detail-label">Block</div>
                      <div className="room-detail-value">{resident.block || 'N/A'}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Profile Completion Card */}
              <div className="info-card profile-completion-card">
                <h3 className="info-card-title">Profile Completion</h3>
                <div className="profile-completion-content">
                  <div className="completion-circle">
                    <svg width="120" height="120" viewBox="0 0 120 120">
                      <circle cx="60" cy="60" r="54" fill="none" stroke="#e0e0e0" strokeWidth="8"/>
                      <circle 
                        cx="60" 
                        cy="60" 
                        r="54" 
                        fill="none" 
                        stroke="#667eea" 
                        strokeWidth="8"
                        strokeDasharray={`${2 * Math.PI * 54}`}
                        strokeDashoffset={`${2 * Math.PI * 54 * (1 - profileCompletion / 100)}`}
                        strokeLinecap="round"
                        transform="rotate(-90 60 60)"
                      />
                      <text x="60" y="60" textAnchor="middle" dy="7" fontSize="24" fontWeight="bold" fill="#667eea">
                        {profileCompletion}%
                      </text>
                    </svg>
                  </div>
                  <p className="completion-text">
                    {profileCompletion === 100 
                      ? 'Your profile is complete!' 
                      : 'Complete your profile to get better support'}
                  </p>
                </div>
              </div>

              {/* Recent Complaints */}
              <div className="info-card recent-complaints-card">
                <h3 className="info-card-title">Recent Complaints</h3>
                {recentComplaints.length > 0 ? (
                  <div className="recent-complaints-list">
                    {recentComplaints.map(complaint => (
                      <div key={complaint.id} className="recent-complaint-item">
                        <div className="complaint-item-header">
                          <div className="complaint-item-title">{complaint.title}</div>
                          <span className={`complaint-status-badge ${complaint.status.toLowerCase()}`}>
                            {complaint.status}
                          </span>
                        </div>
                        <div className="complaint-item-date">
                          {new Date(complaint.created_at).toLocaleDateString()}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="no-data-message">No complaints yet</p>
                )}
                <button 
                  className="view-all-btn"
                  onClick={() => window.location.href = '/resident/complaints'}
                >
                  View All Complaints →
                </button>
              </div>
            </div>

            {/* Right Column - Announcements */}
            <div className="resident-right-column">
              <div className="info-card announcements-card">
                <h3 className="info-card-title">Announcements & Notices</h3>
                <div className="announcements-list">
                  {announcements.map(announcement => (
                    <div key={announcement.id} className={`announcement-item ${announcement.type}`}>
                      <div className="announcement-icon">{announcement.icon}</div>
                      <div className="announcement-content">
                        <div className="announcement-title">{announcement.title}</div>
                        <div className="announcement-message">{announcement.message}</div>
                        <div className="announcement-date">{announcement.date}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="error-message">Failed to load dashboard data</div>
      )}
    </ResidentLayout>
  );
}

export default ResidentDashboard;