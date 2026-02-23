import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Home() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="landing-page">
      {/* Navigation */}
      <nav className={`landing-nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <div className="nav-logo">
            <span className="logo-icon">🏠</span>
            <span className="logo-text">StaySense</span>
          </div>
          <div className="nav-links">
            <a onClick={() => scrollToSection('features')} className="nav-link">Features</a>
            <a onClick={() => scrollToSection('how-it-works')} className="nav-link">How It Works</a>
            <a onClick={() => scrollToSection('portals')} className="nav-link">Get Started</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-badge">
            <span className="badge-dot"></span>
            Smart Hostel Management Platform
          </div>
          
          <h1 className="hero-title">
            Manage Your Hostel
            <span className="gradient-text"> Smarter & Faster</span>
          </h1>
          
          <p className="hero-description">
            Complete hostel management solution for administrators and residents.
            Streamline operations, track complaints, and manage rooms effortlessly.
          </p>
          
          <div className="hero-buttons">
            <button 
              onClick={() => scrollToSection('portals')} 
              className="btn-primary-hero"
            >
              Get Started
              <span className="btn-arrow">→</span>
            </button>
            <button 
              onClick={() => scrollToSection('features')} 
              className="btn-secondary-hero"
            >
              View Features
            </button>
          </div>

          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-number">100+</div>
              <div className="stat-label">Rooms Managed</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <div className="stat-number">500+</div>
              <div className="stat-label">Happy Residents</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <div className="stat-number">99%</div>
              <div className="stat-label">Uptime</div>
            </div>
          </div>
        </div>

        <div className="hero-gradient-bg"></div>
      </section>

      {/* Portal Selection Section */}
      <section className="portal-section" id="portals">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">Choose Your Portal</h2>
            <p className="section-description">
              Select your role to access the appropriate dashboard and features
            </p>
          </div>

          <div className="portal-cards">
            <Link to="/admin/login" className="portal-card-modern">
              <div className="portal-card-icon admin-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="portal-card-content">
                <h3>Admin Portal</h3>
                <p>Comprehensive management dashboard for administrators</p>
                <ul className="portal-features">
                  <li>✓ Manage all rooms and residents</li>
                  <li>✓ Track and resolve complaints</li>
                  <li>✓ View analytics and reports</li>
                </ul>
              </div>
              <div className="portal-card-arrow">
                <span>Access Portal →</span>
              </div>
            </Link>

            <Link to="/resident/login" className="portal-card-modern">
              <div className="portal-card-icon resident-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                  <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="portal-card-content">
                <h3>Resident Portal</h3>
                <p>Personalized dashboard for hostel residents</p>
                <ul className="portal-features">
                  <li>✓ View your room details</li>
                  <li>✓ Submit and track complaints</li>
                  <li>✓ Manage your profile</li>
                </ul>
              </div>
              <div className="portal-card-arrow">
                <span>Access Portal →</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section" id="features">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">Powerful Features</h2>
            <p className="section-description">
              Everything you need to manage your hostel efficiently
            </p>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 22V12H15V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Room Management</h3>
              <p>Add, view, and manage all hostel rooms with real-time occupancy tracking</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 13H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 17H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M10 9H9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Complaint Tracking</h3>
              <p>Submit, track, and resolve complaints efficiently with status updates</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <path d="M23 7L16 12L23 17V7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M14 5H3C1.89543 5 1 5.89543 1 7V17C1 18.1046 1.89543 19 3 19H14C15.1046 19 16 18.1046 16 17V7C16 5.89543 15.1046 5 14 5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Admin Analytics</h3>
              <p>Comprehensive dashboard with insights on occupancy, revenue, and complaints</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Resident Dashboard</h3>
              <p>Personalized space for residents to view room info and manage complaints</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works-section" id="how-it-works">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">How It Works</h2>
            <p className="section-description">
              Get started in three simple steps
            </p>
          </div>

          <div className="steps-container">
            <div className="step-item">
              <div className="step-number">01</div>
              <div className="step-icon-wrapper">
                <div className="step-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                    <path d="M16 21V5C16 4.46957 15.7893 3.96086 15.4142 3.58579C15.0391 3.21071 14.5304 3 14 3H10C9.46957 3 8.96086 3.21071 8.58579 3.58579C8.21071 3.96086 8 4.46957 8 5V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M3 9H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
              <h3>Select Your Role</h3>
              <p>Choose between Admin or Resident portal based on your access level</p>
            </div>

            <div className="step-connector"></div>

            <div className="step-item">
              <div className="step-number">02</div>
              <div className="step-icon-wrapper">
                <div className="step-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="2"/>
                    <path d="M7 11V7C7 5.67392 7.52678 4.40215 8.46447 3.46447C9.40215 2.52678 10.6739 2 12 2C13.3261 2 14.5979 2.52678 15.5355 3.46447C16.4732 4.40215 17 5.67392 17 7V11" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
              </div>
              <h3>Login / Register</h3>
              <p>Create a new account or login with your existing credentials</p>
            </div>

            <div className="step-connector"></div>

            <div className="step-item">
              <div className="step-number">03</div>
              <div className="step-icon-wrapper">
                <div className="step-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                    <path d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.7088 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18455 2.99721 7.13631 4.39828 5.49706C5.79935 3.85781 7.69279 2.71537 9.79619 2.24013C11.8996 1.7649 14.1003 1.98232 16.07 2.85999" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M22 4L12 14.01L9 11.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
              <h3>Manage Services</h3>
              <p>Access all features and manage your hostel operations seamlessly</p>
            </div>
          </div>
        </div>
      </section>

      {/* Role Comparison Section */}
      <section className="comparison-section">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">Admin vs Resident</h2>
            <p className="section-description">
              Compare capabilities and features for each role
            </p>
          </div>

          <div className="comparison-grid">
            <div className="comparison-card admin-card">
              <div className="comparison-header">
                <div className="comparison-icon admin-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2"/>
                    <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2"/>
                    <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <h3>Admin Portal</h3>
              </div>
              <ul className="comparison-list">
                <li>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M20 6L9 17L4 12" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Complete dashboard with analytics
                </li>
                <li>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M20 6L9 17L4 12" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Add, edit, and delete rooms
                </li>
                <li>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M20 6L9 17L4 12" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Manage all residents
                </li>
                <li>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M20 6L9 17L4 12" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Assign rooms to residents
                </li>
                <li>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M20 6L9 17L4 12" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  View and resolve all complaints
                </li>
                <li>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M20 6L9 17L4 12" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Revenue and occupancy reports
                </li>
              </ul>
            </div>

            <div className="comparison-card resident-card">
              <div className="comparison-header">
                <div className="comparison-icon resident-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                    <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" strokeWidth="2"/>
                    <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <h3>Resident Portal</h3>
              </div>
              <ul className="comparison-list">
                <li>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M20 6L9 17L4 12" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Personal dashboard
                </li>
                <li>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M20 6L9 17L4 12" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  View room details
                </li>
                <li>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M20 6L9 17L4 12" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Submit complaints
                </li>
                <li>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M20 6L9 17L4 12" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Track complaint status
                </li>
                <li>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M20 6L9 17L4 12" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Manage profile information
                </li>
                <li>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M20 6L9 17L4 12" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  View block and room assignment
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-container">
          <div className="footer-brand">
            <div className="footer-logo">
              <span className="logo-icon">🏠</span>
              <span className="logo-text">StaySense</span>
            </div>
            <p className="footer-tagline">Smart Hostel Management System</p>
          </div>

          <div className="footer-tech">
            <h4>Built With</h4>
            <div className="tech-stack">
              <div className="tech-item" title="React">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#61DAFB">
                  <circle cx="12" cy="12" r="2"/>
                  <path d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2z" fill="none" stroke="#61DAFB" strokeWidth="1"/>
                </svg>
                <span>React</span>
              </div>
              <div className="tech-item" title="Node.js">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#339933">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                </svg>
                <span>Node.js</span>
              </div>
              <div className="tech-item" title="MySQL">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#4479A1">
                  <rect x="4" y="6" width="16" height="12" rx="2"/>
                </svg>
                <span>MySQL</span>
              </div>
              <div className="tech-item" title="Express">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#000000">
                  <path d="M2 12h20M12 2l10 10-10 10"/>
                </svg>
                <span>Express</span>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; 2024 StaySense. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;