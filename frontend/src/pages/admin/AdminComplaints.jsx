import { useState, useEffect } from 'react';
import AdminLayout from '../../components/AdminLayout';

function AdminComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/complaints/all', {
        credentials: 'include'
      });
      
      if (response.ok) {
        const data = await response.json();
        setComplaints(data.complaints);
      }
    } catch (error) {
      console.error('Failed to fetch complaints:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    setError('');
    setSuccess('');

    try {
      const response = await fetch(`http://localhost:5000/api/complaints/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ status })
      });

      if (response.ok) {
        setSuccess('Status updated successfully!');
        fetchComplaints();
      } else {
        setError('Failed to update status');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    }
  };

  return (
    <AdminLayout>
      <div className="page-header">
        <h1>Complaint Management</h1>
        <p>View and resolve resident complaints</p>
      </div>

      <div className="content-card">
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
        
        {loading ? (
          <div className="loading">Loading complaints...</div>
        ) : complaints.length > 0 ? (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Resident</th>
                  <th>Room</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {complaints.map((complaint) => (
                  <tr key={complaint.id}>
                    <td>{complaint.resident_name}</td>
                    <td>{complaint.room_number} - {complaint.block}</td>
                    <td>{complaint.title}</td>
                    <td>{complaint.description}</td>
                    <td>
                      <span className={`badge ${complaint.status === 'Pending' ? 'badge-pending' : 'badge-resolved'}`}>
                        {complaint.status}
                      </span>
                    </td>
                    <td>{new Date(complaint.created_at).toLocaleDateString()}</td>
                    <td>
                      {complaint.status === 'Pending' ? (
                        <button 
                          onClick={() => updateStatus(complaint.id, 'Resolved')}
                          className="btn btn-success"
                          style={{ padding: '8px 16px', fontSize: '0.9rem' }}
                        >
                          Resolve
                        </button>
                      ) : (
                        <button 
                          onClick={() => updateStatus(complaint.id, 'Pending')}
                          className="btn btn-warning"
                          style={{ padding: '8px 16px', fontSize: '0.9rem' }}
                        >
                          Reopen
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No complaints found.</p>
        )}
      </div>
    </AdminLayout>
  );
}

export default AdminComplaints;