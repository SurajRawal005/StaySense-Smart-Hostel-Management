import { useState, useEffect } from 'react';
import ResidentLayout from '../../components/ResidentLayout';

function ResidentComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    description: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/complaints/my', {
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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await fetch('http://localhost:5000/api/complaints', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Complaint submitted successfully!');
        setFormData({ title: '', description: '' });
        fetchComplaints();
      } else {
        setError(data.message || 'Failed to submit complaint');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    }
  };

  return (
    <ResidentLayout>
      <div className="page-header">
        <h1>Complaints</h1>
        <p>Submit and track your complaints</p>
      </div>

      <div className="complaint-form">
        <h2>Submit New Complaint</h2>
        
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Brief description of the issue"
              required
            />
          </div>
          
          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Detailed description of your complaint"
              rows="5"
              style={{ 
                padding: '12px 15px',
                border: '2px solid #e0e0e0',
                borderRadius: '8px',
                fontSize: '1rem',
                fontFamily: 'inherit',
                resize: 'vertical'
              }}
              required
            />
          </div>
          
          <button type="submit" className="btn btn-primary">
            Submit Complaint
          </button>
        </form>
      </div>

      <div className="complaint-list">
        <h2>Your Complaints</h2>
        
        {loading ? (
          <div className="loading">Loading complaints...</div>
        ) : complaints.length > 0 ? (
          complaints.map((complaint) => (
            <div key={complaint.id} className="complaint-item">
              <div className="complaint-header">
                <div className="complaint-title">{complaint.title}</div>
                <div>
                  <span className={`badge ${complaint.status === 'Pending' ? 'badge-pending' : 'badge-resolved'}`}>
                    {complaint.status}
                  </span>
                </div>
              </div>
              <div className="complaint-description">{complaint.description}</div>
              <div className="complaint-date">
                Submitted on {new Date(complaint.created_at).toLocaleDateString()}
              </div>
            </div>
          ))
        ) : (
          <p>No complaints submitted yet.</p>
        )}
      </div>
    </ResidentLayout>
  );
}

export default ResidentComplaints;