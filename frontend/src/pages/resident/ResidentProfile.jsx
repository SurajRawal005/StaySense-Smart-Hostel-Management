import { useState, useEffect } from 'react';
import ResidentLayout from '../../components/ResidentLayout';

function ResidentProfile() {
  const [resident, setResident] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/resident/session', {
        credentials: 'include'
      });
      
      if (response.ok) {
        const data = await response.json();
        setResident(data.resident);
      }
    } catch (error) {
      console.error('Failed to fetch profile:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ResidentLayout>
      <div className="page-header">
        <h1>Profile</h1>
        <p>Your personal information</p>
      </div>

      {loading ? (
        <div className="loading">Loading profile...</div>
      ) : resident ? (
        <div className="profile-info">
          <h2>Personal Information</h2>
          
          <div className="info-row">
            <div className="info-label">Name:</div>
            <div className="info-value">{resident.name}</div>
          </div>
          
          <div className="info-row">
            <div className="info-label">Email:</div>
            <div className="info-value">{resident.email}</div>
          </div>
          
          <div className="info-row">
            <div className="info-label">Room Number:</div>
            <div className="info-value">{resident.room_number || 'Not Assigned'}</div>
          </div>
          
          <div className="info-row">
            <div className="info-label">Hostel Block:</div>
            <div className="info-value">{resident.block || 'Not Assigned'}</div>
          </div>
        </div>
      ) : (
        <div className="error-message">Failed to load profile data</div>
      )}
    </ResidentLayout>
  );
}

export default ResidentProfile;