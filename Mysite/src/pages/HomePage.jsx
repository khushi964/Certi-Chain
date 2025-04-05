import React from 'react';
import WelcomeBanner from '../components/WelcomeBanner';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page">
      <WelcomeBanner />
      
      <section className="features-section">
        <h2>Why Choose CertiChain?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🔐</div>
            <h3>Tamper-Proof</h3>
            <p>Certificates stored on blockchain cannot be altered or faked</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Instant Verification</h3>
            <p>Employers can verify credentials in seconds</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🌐</div>
            <h3>Accessible Anywhere</h3>
            <p>Access your certificates from any device</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🏛️</div>
            <h3>Institution Portal</h3>
            <p>Easy certificate issuance for schools and colleges</p>
          </div>
        </div>
      </section>

      <section className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <p>Institution issues certificate through our platform</p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <p>Certificate data is stored on blockchain, file on IPFS</p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <p>Student receives secure link to their certificate</p>
          </div>
          <div className="step">
            <div className="step-number">4</div>
            <p>Employer verifies authenticity with one click</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;