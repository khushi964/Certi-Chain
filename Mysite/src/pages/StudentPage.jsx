import React, { useEffect, useState } from "react";
import CertificateView from "../components/CertificateView"; // Or CertificateViewer if you want that
import "./StudentPage.css";

const StudentPage = () => {
  const [walletAddress, setWalletAddress] = useState(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setWalletAddress(accounts[0]);
      } catch (err) {
        console.error("Wallet connection error:", err);
      }
    } else {
      alert("MetaMask not detected!");
    }
  };

  useEffect(() => {
    connectWallet()
  },[]);

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
