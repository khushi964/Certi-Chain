import React, { useState } from 'react';
import CertificateView from '../components/CertificateView';
import './StudentPage.css';

const StudentPage = () => {
  const [walletAddress, setWalletAddress] = useState(null);

  const connectWallet = async () => {
    // Wallet connection logic here
    setWalletAddress('0x123...abc');
  };

  return (
    <div className="student-page">
      <h1>Student Portal</h1>
      
      {!walletAddress ? (
        <div className="wallet-connect">
          <p>Connect your wallet to view your certificates</p>
          <button onClick={connectWallet} className="connect-btn">
            Connect Wallet
          </button>
        </div>
      ) : (
        <CertificateView walletAddress={walletAddress} />
      )}
    </div>
  );
};

export default StudentPage;