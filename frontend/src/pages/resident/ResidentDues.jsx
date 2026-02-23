import { useState, useEffect } from 'react';
import ResidentLayout from '../../components/ResidentLayout';

function ResidentDues() {
  const [resident, setResident] = useState(null);

  useEffect(() => {
    fetchResident();
  }, []);

  const fetchResident = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/resident/session', {
        credentials: 'include'
      });
      
      if (response.ok) {
        const data = await response.json();
        setResident(data.resident);
      }
    } catch (error) {
      console.error('Failed to fetch resident:', error);
    }
  };

  // Dummy payment data
  const nextInstallment = {
    amount: 5000,
    dueDate: '10 Nov 2024',
    type: 'Monthly Hostel Fees',
    status: 'Pending'
  };

  const paymentHistory = [
    { id: 1, month: 'October 2024', amount: 5000, status: 'Paid', date: '05 Oct 2024' },
    { id: 2, month: 'September 2024', amount: 5000, status: 'Paid', date: '08 Sep 2024' },
    { id: 3, month: 'August 2024', amount: 5000, status: 'Paid', date: '07 Aug 2024' },
    { id: 4, month: 'July 2024', amount: 5000, status: 'Paid', date: '10 Jul 2024' },
    { id: 5, month: 'June 2024', amount: 5000, status: 'Paid', date: '05 Jun 2024' }
  ];

  const upcomingEvents = [
    {
      id: 1,
      name: 'Diwali Celebration',
      date: '12 Nov 2024',
      time: '7:00 PM',
      description: 'Join us for a grand Diwali celebration with food, music, and fireworks!',
      icon: '🎉'
    },
    {
      id: 2,
      name: 'Sports Day',
      date: '20 Nov 2024',
      time: '9:00 AM',
      description: 'Annual hostel sports tournament. Register your team now!',
      icon: '⚽'
    },
    {
      id: 3,
      name: 'Maintenance Notice',
      date: '15 Nov 2024',
      time: '8:00 AM - 12:00 PM',
      description: 'Water tank cleaning scheduled. Water supply will be temporarily interrupted.',
      icon: '🔧'
    },
    {
      id: 4,
      name: 'Cultural Night',
      date: '25 Nov 2024',
      time: '6:00 PM',
      description: 'Showcase your talent! Dance, music, and drama performances.',
      icon: '🎭'
    }
  ];

  return (
    <ResidentLayout>
      <div className="page-header">
        <h1>Dues & Events</h1>
        <p>Manage your payments and stay updated with hostel events</p>
      </div>

      <div className="dues-events-container">
        {/* Next Installment - Highlighted */}
        <div className="next-installment-card">
          <div className="installment-header">
            <div className="installment-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <line x1="12" y1="1" x2="12" y2="23" strokeWidth="2" strokeLinecap="round"/>
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <div>
              <h2 className="installment-title">Next Installment</h2>
              <p className="installment-subtitle">Your upcoming payment</p>
            </div>
          </div>

          <div className="installment-details">
            <div className="installment-amount">
              <span className="currency">₹</span>
              <span className="amount">{nextInstallment.amount.toLocaleString()}</span>
            </div>

            <div className="installment-info-grid">
              <div className="installment-info-item">
                <div className="info-label">Due Date</div>
                <div className="info-value">{nextInstallment.dueDate}</div>
              </div>
              <div className="installment-info-item">
                <div className="info-label">Type</div>
                <div className="info-value">{nextInstallment.type}</div>
              </div>
              <div className="installment-info-item">
                <div className="info-label">Status</div>
                <div className="info-value">
                  <span className="status-badge pending">{nextInstallment.status}</span>
                </div>
              </div>
            </div>

            <button className="pay-now-btn">
              Pay Now
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <line x1="5" y1="12" x2="19" y2="12" strokeWidth="2" strokeLinecap="round"/>
                <polyline points="12 5 19 12 12 19" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="dues-events-grid">
          {/* Left: Payment History */}
          <div className="section-card">
            <h3 className="section-card-title">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M3 3v18h18" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M18 17V9M13 17V5M8 17v-3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Payment History
            </h3>
            <div className="payment-history-list">
              {paymentHistory.map(payment => (
                <div key={payment.id} className="payment-history-item">
                  <div className="payment-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <polyline points="20 6 9 17 4 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="payment-details">
                    <div className="payment-month">{payment.month}</div>
                    <div className="payment-date">{payment.date}</div>
                  </div>
                  <div className="payment-amount-status">
                    <div className="payment-amount">₹{payment.amount.toLocaleString()}</div>
                    <span className="payment-status paid">{payment.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Upcoming Events */}
          <div className="section-card">
            <h3 className="section-card-title">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" strokeWidth="2"/>
                <line x1="16" y1="2" x2="16" y2="6" strokeWidth="2" strokeLinecap="round"/>
                <line x1="8" y1="2" x2="8" y2="6" strokeWidth="2" strokeLinecap="round"/>
                <line x1="3" y1="10" x2="21" y2="10" strokeWidth="2"/>
              </svg>
              Upcoming Events
            </h3>
            <div className="events-list">
              {upcomingEvents.map(event => (
                <div key={event.id} className="event-item">
                  <div className="event-icon">{event.icon}</div>
                  <div className="event-content">
                    <div className="event-name">{event.name}</div>
                    <div className="event-description">{event.description}</div>
                    <div className="event-datetime">
                      <span className="event-date">📅 {event.date}</span>
                      <span className="event-time">🕐 {event.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Important Notices */}
        <div className="notices-card">
          <div className="notice-header">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="12" cy="12" r="10" strokeWidth="2"/>
              <line x1="12" y1="8" x2="12" y2="12" strokeWidth="2" strokeLinecap="round"/>
              <line x1="12" y1="16" x2="12.01" y2="16" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <h3>Important Notices</h3>
          </div>
          <div className="notices-content">
            <div className="notice-item">
              <strong>Late Fee Policy:</strong> A late fee of ₹500 will be charged if payment is not made by the due date.
            </div>
            <div className="notice-item">
              <strong>Payment Methods:</strong> Payments can be made via UPI, Net Banking, or at the hostel office.
            </div>
            <div className="notice-item">
              <strong>Refund Policy:</strong> Advance payments are non-refundable. Security deposit will be refunded upon checkout.
            </div>
          </div>
        </div>
      </div>
    </ResidentLayout>
  );
}

export default ResidentDues;