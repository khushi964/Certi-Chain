import React, { useState } from 'react';
import CertificateForm from '../components/CertificateForm';
import './AdminPage.css';

const AdminPage = () => {
  const [isConnected, setIsConnected] = useState(false);

  const connectWallet = async () => {
    // Wallet connection logic here
    setIsConnected(true);
  };

  const issueCertificate = async (certData) => {
    // Certificate issuance logic here
    console.log('Issuing certificate:', certData);
    alert('Certificate issued successfully!');
  };

  return (
    <div className="admin-page">
      <h1>Admin Portal</h1>
      
      {!isConnected ? (
        <div className="wallet-connect">
          <p>Connect your wallet to issue certificates</p>
          <button onClick={connectWallet} className="connect-btn">
            Connect Wallet
          </button>
        </div>
      ) : (
        <>
          <div className="wallet-connected">
            <p>Wallet Connected: 0x123...abc</p>
            <p>Institution: Rural Technology Institute (Admin)</p>
          </div>
          <CertificateForm issueCertificate={issueCertificate} />
        </>
      )}
    </div>
  );
};

export default AdminPage;