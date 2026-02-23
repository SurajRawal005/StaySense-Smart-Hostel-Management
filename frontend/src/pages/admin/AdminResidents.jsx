import { useState, useEffect } from 'react';
import AdminLayout from '../../components/AdminLayout';

function AdminResidents() {
  const [residents, setResidents] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [assignData, setAssignData] = useState({
    residentId: '',
    room_number: '',
    block: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchResidents();
    fetchRooms();
  }, []);

  const fetchResidents = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/resident/all', {
        credentials: 'include'
      });
      
      if (response.ok) {
        const data = await response.json();
        setResidents(data.residents);
      } else {
        console.error('Failed to fetch residents');
      }
    } catch (error) {
      console.error('Failed to fetch residents:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRooms = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/rooms', {
        credentials: 'include'
      });
      
      if (response.ok) {
        const data = await response.json();
        setRooms(data.rooms);
      }
    } catch (error) {
      console.error('Failed to fetch rooms:', error);
    }
  };

  const handleAssign = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!assignData.residentId || !assignData.room_number || !assignData.block) {
      setError('All fields are required');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/resident/assign-room', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(assignData)
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Room assigned successfully!');
        setAssignData({ residentId: '', room_number: '', block: '' });
        fetchResidents();
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(data.message || 'Failed to assign room');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this resident?')) return;

    try {
      const response = await fetch(`http://localhost:5000/api/resident/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      });

      if (response.ok) {
        setSuccess('Resident deleted successfully!');
        fetchResidents();
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError('Failed to delete resident');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    }
  };

  return (
    <AdminLayout>
      <div className="page-header">
        <h1>Resident Management</h1>
        <p>View and manage hostel residents</p>
      </div>

      <div className="content-card">
        <h2>Assign Room to Resident</h2>
        
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
        
        <form onSubmit={handleAssign}>
          <div className="form-row">
            <div className="form-group">
              <label>Select Resident</label>
              <select
                value={assignData.residentId}
                onChange={(e) => setAssignData({ ...assignData, residentId: e.target.value })}
                required
              >
                <option value="">Choose resident</option>
                {residents.map((resident) => (
                  <option key={resident.id} value={resident.id}>
                    {resident.name} ({resident.email})
                  </option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label>Room Number</label>
              <input
                type="text"
                value={assignData.room_number}
                onChange={(e) => setAssignData({ ...assignData, room_number: e.target.value })}
                placeholder="101"
                required
              />
            </div>
            
            <div className="form-group">
              <label>Block</label>
              <input
                type="text"
                value={assignData.block}
                onChange={(e) => setAssignData({ ...assignData, block: e.target.value })}
                placeholder="A"
                required
              />
            </div>
          </div>
          
          <button type="submit" className="btn btn-primary">
            Assign Room
          </button>
        </form>
      </div>

      <div className="content-card" style={{ marginTop: '30px' }}>
        <h2>All Residents</h2>
        
        {loading ? (
          <div className="loading">Loading residents...</div>
        ) : residents.length > 0 ? (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Room</th>
                  <th>Block</th>
                  <th>Joined</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {residents.map((resident) => (
                  <tr key={resident.id}>
                    <td>{resident.name}</td>
                    <td>{resident.email}</td>
                    <td>{resident.room_number || 'Not Assigned'}</td>
                    <td>{resident.block || '-'}</td>
                    <td>{new Date(resident.created_at).toLocaleDateString()}</td>
                    <td>
                      <button 
                        onClick={() => handleDelete(resident.id)}
                        className="btn btn-danger"
                        style={{ padding: '8px 16px', fontSize: '0.9rem' }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No residents found.</p>
        )}
      </div>
    </AdminLayout>
  );
}

export default AdminResidents;