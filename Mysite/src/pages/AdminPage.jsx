import React, { useEffect, useState } from 'react';
import CertificateForm from '../components/CertificateForm';
import './AdminPage.css';
import { ethers } from 'ethers';
import contractABI from "../contracts/EducationCredential.json";
import contractAddress from "../contracts/EducationCredential-address.json";

const AdminPage = () => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);
  const initializeEthers = async () => {
    if (!window.ethereum) {
      alert("MetaMask not detected!");
      return;
    }
    
    try {
      const _provider = new ethers.BrowserProvider(window.ethereum);
      const _signer = await _provider.getSigner();
      const _contract = new ethers.Contract(contractAddress.CertificateNFT, contractABI.abi, _signer);

      setProvider(_provider);
      setSigner(_signer);
      setContract(_contract);

      const accounts = await _provider.send("eth_requestAccounts", []);
      setAccount(accounts[0]);
      setWalletAddress(accounts[0]);

    } catch (error) {
      console.error("Error initializing ethers:", error);
    }
  };

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

  useEffect(() => {
    initializeEthers();
  }, []);

 

  return (
    <div className="admin-page">
      <h1>Admin Portal</h1>

      {!walletAddress ? (
        <div className="wallet-connect">
          <p>Connect your wallet to issue certificate s</p>
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
