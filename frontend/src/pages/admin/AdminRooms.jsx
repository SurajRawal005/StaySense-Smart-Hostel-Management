import { useState, useEffect } from 'react';
import AdminLayout from '../../components/AdminLayout';

function AdminRooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    room_number: '',
    block: '',
    capacity: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchRooms();
  }, []);

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
      const response = await fetch('http://localhost:5000/api/rooms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Room added successfully!');
        setFormData({ room_number: '', block: '', capacity: '' });
        fetchRooms();
      } else {
        setError(data.message || 'Failed to add room');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this room?')) return;

    try {
      const response = await fetch(`http://localhost:5000/api/rooms/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      });

      if (response.ok) {
        setSuccess('Room deleted successfully!');
        fetchRooms();
      } else {
        setError('Failed to delete room');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    }
  };

  return (
    <AdminLayout>
      <div className="page-header">
        <h1>Room Management</h1>
        <p>Add and manage hostel rooms</p>
      </div>

      <div className="content-card">
        <h2>Add New Room</h2>
        
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Room Number</label>
              <input
                type="text"
                name="room_number"
                value={formData.room_number}
                onChange={handleChange}
                placeholder="101"
                required
              />
            </div>
            
            <div className="form-group">
              <label>Block</label>
              <input
                type="text"
                name="block"
                value={formData.block}
                onChange={handleChange}
                placeholder="A"
                required
              />
            </div>
            
            <div className="form-group">
              <label>Capacity</label>
              <input
                type="number"
                name="capacity"
                value={formData.capacity}
                onChange={handleChange}
                placeholder="2"
                min="1"
                required
              />
            </div>
          </div>
          
          <button type="submit" className="btn btn-primary">
            Add Room
          </button>
        </form>
      </div>

      <div className="content-card" style={{ marginTop: '30px' }}>
        <h2>All Rooms</h2>
        
        {loading ? (
          <div className="loading">Loading rooms...</div>
        ) : rooms.length > 0 ? (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Room Number</th>
                  <th>Block</th>
                  <th>Capacity</th>
                  <th>Occupied</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {rooms.map((room) => (
                  <tr key={room.id}>
                    <td>{room.room_number}</td>
                    <td>{room.block}</td>
                    <td>{room.capacity}</td>
                    <td>{room.occupied}</td>
                    <td>
                      {room.occupied >= room.capacity ? (
                        <span className="badge badge-pending">Full</span>
                      ) : (
                        <span className="badge badge-resolved">Available</span>
                      )}
                    </td>
                    <td>
                      <button 
                        onClick={() => handleDelete(room.id)}
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
          <p>No rooms found. Add your first room above.</p>
        )}
      </div>
    </AdminLayout>
  );
}

export default AdminRooms;