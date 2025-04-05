import React from 'react';
import './WelcomeBanner.css';
import Img from '../image/logo.jpg'

const WelcomeBanner = () => {
  return (
    <div className="welcome-banner">
      <div className="banner-content">
        <h1>Secure, Tamper-Proof Academic Certificates</h1>
        <p>Empowering rural students with blockchain-verified credentials</p>
        <div className="banner-buttons">
          <button className="primary-btn">Get Started</button>
          <button className="secondary-btn">Learn More</button>
        </div>
      </div>
      <div className="banner-image">
        <img src={Img} alt="Blockchain Certificate" />
      </div>
    </div>
  );
};

export default WelcomeBanner;