import React, { useState } from 'react';
import CertificateForm from '../components/CertificateForm';
import './AdminPage.css';

const AdminPage = () => {
  const [walletAddress, setWalletAddress] = useState(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setWalletAddress(accounts[0]);
      } catch (err) {
        console.error("Wallet connection failed:", err);
        alert("Wallet connection failed. Please try again.");
      }
    } else {
      alert("Please install MetaMask to use this feature.");
    }
  };

  return (
    <div className="admin-page">
      <h1>Admin Portal</h1>

      {!walletAddress ? (
        <div className="wallet-connect">
          <p>Connect your wallet to issue certificates</p>
          <button onClick={connectWallet} className="connect-btn">
            Connect Wallet
          </button>
        </div>
      ) : (
        <>
          <div className="wallet-connected">
            <p>Wallet Connected: {walletAddress}</p>
            <p>Institution: Rural Technology Institute (Admin)</p>
          </div>
          <CertificateForm walletAddress={walletAddress} />
        </>
      )}
    </div>
  );
};

export default AdminPage;
