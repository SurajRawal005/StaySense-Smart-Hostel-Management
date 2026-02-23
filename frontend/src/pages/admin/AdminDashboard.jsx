import { useState, useEffect } from 'react';
import AdminLayout from '../../components/AdminLayout';

function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/admin/dashboard', {
        credentials: 'include'
      });
      
      if (response.ok) {
        const data = await response.json();
        setStats(data.stats);
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setLoading(false);
    }
  };

  // Calculate occupancy percentage
  const occupancyPercentage = stats 
    ? Math.round((stats.occupiedRooms / stats.totalRooms) * 100) 
    : 0;

  // Dummy data for charts and activity
  const complaintsBreakdown = {
    pending: stats?.pendingComplaints || 0,
    resolved: stats ? (stats.totalResidents * 2 - stats.pendingComplaints) : 0
  };

  const recentActivity = [
    { id: 1, type: 'resident', message: 'New resident John Doe registered', time: '2 hours ago', icon: '👤' },
    { id: 2, type: 'complaint', message: 'Complaint #247 submitted - AC not working', time: '4 hours ago', icon: '📋' },
    { id: 3, type: 'resolved', message: 'Complaint #245 resolved - Water issue fixed', time: '6 hours ago', icon: '✅' },
    { id: 4, type: 'room', message: 'Room 305-B added to inventory', time: '1 day ago', icon: '🏠' },
    { id: 5, type: 'resident', message: 'Resident Jane Smith checked out', time: '1 day ago', icon: '👋' }
  ];

  const monthlyTrend = [
    { month: 'Jan', residents: 42, revenue: 210000 },
    { month: 'Feb', residents: 45, revenue: 225000 },
    { month: 'Mar', residents: 48, revenue: 240000 },
    { month: 'Apr', residents: 50, revenue: 250000 },
  ];

  return (
    <AdminLayout>
      <div className="dashboard-header-section">
        <div>
          <h1 className="dashboard-title">Dashboard Overview</h1>
          <p className="dashboard-subtitle">Welcome back! Here's what's happening today.</p>
        </div>
        <div className="dashboard-date">
          {new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>
      </div>

      {loading ? (
        <div className="loading">Loading dashboard...</div>
      ) : stats ? (
        <>
          {/* Primary Stats Cards */}
          <div className="admin-stats-grid">
            <div className="admin-stat-card primary-card">
              <div className="stat-card-header">
                <div className="stat-icon-wrapper residents-icon">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="9" cy="7" r="4" strokeWidth="2"/>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className="stat-label">Total Residents</span>
              </div>
              <div className="stat-value">{stats.totalResidents}</div>
              <div className="stat-footer">
                <span className="stat-change positive">↑ 12%</span>
                <span className="stat-period">vs last month</span>
              </div>
            </div>

            <div className="admin-stat-card primary-card">
              <div className="stat-card-header">
                <div className="stat-icon-wrapper rooms-icon">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <polyline points="9 22 9 12 15 12 15 22" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className="stat-label">Total Rooms</span>
              </div>
              <div className="stat-value">{stats.totalRooms}</div>
              <div className="stat-footer">
                <span className="stat-change neutral">—</span>
                <span className="stat-period">No change</span>
              </div>
            </div>

            <div className="admin-stat-card primary-card">
              <div className="stat-card-header">
                <div className="stat-icon-wrapper occupied-icon">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="12" cy="10" r="3" strokeWidth="2"/>
                  </svg>
                </div>
                <span className="stat-label">Occupied Rooms</span>
              </div>
              <div className="stat-value">{stats.occupiedRooms}</div>
              <div className="stat-footer">
                <span className="stat-change positive">↑ 8%</span>
                <span className="stat-period">vs last month</span>
              </div>
            </div>

            <div className="admin-stat-card primary-card">
              <div className="stat-card-header">
                <div className="stat-icon-wrapper complaints-icon">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <polyline points="14 2 14 8 20 8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <line x1="12" y1="18" x2="12" y2="12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <line x1="9" y1="15" x2="15" y2="15" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className="stat-label">Pending Complaints</span>
              </div>
              <div className="stat-value">{stats.pendingComplaints}</div>
              <div className="stat-footer">
                <span className="stat-change negative">↓ 5%</span>
                <span className="stat-period">vs last month</span>
              </div>
            </div>

            <div className="admin-stat-card primary-card revenue-card">
              <div className="stat-card-header">
                <div className="stat-icon-wrapper revenue-icon">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <line x1="12" y1="1" x2="12" y2="23" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className="stat-label">Monthly Revenue</span>
              </div>
              <div className="stat-value">₹{stats.monthlyRevenue.toLocaleString()}</div>
              <div className="stat-footer">
                <span className="stat-change positive">↑ 15%</span>
                <span className="stat-period">vs last month</span>
              </div>
            </div>
          </div>

          {/* Secondary Analytics Section */}
          <div className="secondary-analytics">
            {/* Occupancy Progress */}
            <div className="analytics-card">
              <h3 className="analytics-card-title">Room Occupancy Rate</h3>
              <div className="occupancy-stats">
                <div className="occupancy-number">{occupancyPercentage}%</div>
                <div className="occupancy-label">{stats.occupiedRooms} of {stats.totalRooms} rooms occupied</div>
              </div>
              <div className="progress-bar-container">
                <div 
                  className="progress-bar-fill" 
                  style={{ width: `${occupancyPercentage}%` }}
                ></div>
              </div>
              <div className="occupancy-breakdown">
                <div className="breakdown-item">
                  <span className="breakdown-dot occupied"></span>
                  <span>Occupied: {stats.occupiedRooms}</span>
                </div>
                <div className="breakdown-item">
                  <span className="breakdown-dot available"></span>
                  <span>Available: {stats.totalRooms - stats.occupiedRooms}</span>
                </div>
              </div>
            </div>

            {/* Complaints Breakdown */}
            <div className="analytics-card">
              <h3 className="analytics-card-title">Complaints Status</h3>
              <div className="complaints-chart">
                <div className="complaint-bar-wrapper">
                  <div className="complaint-bar-label">
                    <span>Pending</span>
                    <span className="complaint-count">{complaintsBreakdown.pending}</span>
                  </div>
                  <div className="complaint-bar">
                    <div 
                      className="complaint-bar-fill pending-fill" 
                      style={{ width: `${(complaintsBreakdown.pending / (complaintsBreakdown.pending + complaintsBreakdown.resolved)) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div className="complaint-bar-wrapper">
                  <div className="complaint-bar-label">
                    <span>Resolved</span>
                    <span className="complaint-count">{complaintsBreakdown.resolved}</span>
                  </div>
                  <div className="complaint-bar">
                    <div 
                      className="complaint-bar-fill resolved-fill" 
                      style={{ width: `${(complaintsBreakdown.resolved / (complaintsBreakdown.pending + complaintsBreakdown.resolved)) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              <div className="complaints-summary">
                <div className="summary-stat">
                  <div className="summary-value">{complaintsBreakdown.pending + complaintsBreakdown.resolved}</div>
                  <div className="summary-label">Total</div>
                </div>
                <div className="summary-stat">
                  <div className="summary-value">{Math.round((complaintsBreakdown.resolved / (complaintsBreakdown.pending + complaintsBreakdown.resolved)) * 100)}%</div>
                  <div className="summary-label">Resolution Rate</div>
                </div>
              </div>
            </div>

            {/* Monthly Trend */}
            <div className="analytics-card">
              <h3 className="analytics-card-title">Monthly Trend</h3>
              <div className="trend-chart">
                {monthlyTrend.map((item, index) => (
                  <div key={index} className="trend-bar-wrapper">
                    <div className="trend-bar">
                      <div 
                        className="trend-bar-fill" 
                        style={{ height: `${(item.residents / 50) * 100}%` }}
                      ></div>
                    </div>
                    <div className="trend-label">{item.month}</div>
                  </div>
                ))}
              </div>
              <div className="trend-legend">
                <span className="trend-metric">Residents per Month</span>
              </div>
            </div>
          </div>

          {/* Bottom Section: Recent Activity + Quick Actions + System Status */}
          <div className="bottom-section">
            {/* Recent Activity */}
            <div className="activity-card">
              <h3 className="section-card-title">Recent Activity</h3>
              <div className="activity-list">
                {recentActivity.map(activity => (
                  <div key={activity.id} className="activity-item">
                    <div className="activity-icon">{activity.icon}</div>
                    <div className="activity-content">
                      <div className="activity-message">{activity.message}</div>
                      <div className="activity-time">{activity.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="quick-actions-card">
              <h3 className="section-card-title">Quick Actions</h3>
              <div className="quick-actions-grid">
                <button className="quick-action-btn" onClick={() => window.location.href = '/admin/rooms'}>
                  <div className="quick-action-icon add-room">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <line x1="12" y1="5" x2="12" y2="19" strokeWidth="2" strokeLinecap="round"/>
                      <line x1="5" y1="12" x2="19" y2="12" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <span>Add Room</span>
                </button>

                <button className="quick-action-btn" onClick={() => window.location.href = '/admin/complaints'}>
                  <div className="quick-action-icon view-complaints">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" strokeWidth="2"/>
                      <polyline points="14 2 14 8 20 8" strokeWidth="2"/>
                    </svg>
                  </div>
                  <span>View Complaints</span>
                </button>

                <button className="quick-action-btn" onClick={() => window.location.href = '/admin/residents'}>
                  <div className="quick-action-icon manage-residents">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" strokeWidth="2"/>
                      <circle cx="9" cy="7" r="4" strokeWidth="2"/>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" strokeWidth="2"/>
                    </svg>
                  </div>
                  <span>Manage Residents</span>
                </button>

                <button className="quick-action-btn">
                  <div className="quick-action-icon export-reports">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <polyline points="7 10 12 15 17 10" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <line x1="12" y1="15" x2="12" y2="3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span>Export Reports</span>
                </button>
              </div>

              {/* System Status */}
              <div className="system-status-section">
                <h4 className="system-status-title">System Status</h4>
                <div className="status-items">
                  <div className="status-item">
                    <div className="status-indicator active"></div>
                    <span className="status-label">Server</span>
                    <span className="status-value">Running</span>
                  </div>
                  <div className="status-item">
                    <div className="status-indicator active"></div>
                    <span className="status-label">Database</span>
                    <span className="status-value">Connected</span>
                  </div>
                  <div className="status-item">
                    <div className="status-indicator active"></div>
                    <span className="status-label">Active Sessions</span>
                    <span className="status-value">24</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="error-message">Failed to load dashboard data</div>
      )}
    </AdminLayout>
  );
}

export default AdminDashboard;