import React, { useState,useEffect } from 'react';
import './CertificateForm.css';
import { getContract } from '../utils/blockchain';
import { uploadToIPFS } from '../utils/blockchain';
import { ethers, HDNodeWallet } from 'ethers';
import contractABI from "../contracts/EducationCredential.json";
import contractAddress from "../contracts/EducationCredential-address.json";

const CertificateForm = ({walletAddress}) => {
  const [formData, setFormData] = useState({
    studentName: '',
    institution: '',
    course: '',
    grade: '',
    year: '',
    certificateFile: null
  });

  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);

  const [isMinting, setIsMinting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({ ...prev, certificateFile: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.certificateFile) {
      alert("Please upload a certificate file.");
      return;
    }

    setIsMinting(true);
    try {
      // Step 1: Upload certificate file to IPFS
      console.log("Uploading file to IPFS...");
      console.log(formData.certificateFile);
      const fileCID = await uploadToIPFS(formData.certificateFile);
      console.log("File uploaded to IPFS with CID:", fileCID);
     
      const metadata = {
        name: `${formData.studentName} - ${formData.course}`,
        description: `Certificate issued by ${formData.institution} in ${formData.year} with grade ${formData.grade}`,
        image: `https://ipfs.io/ipfs/${fileCID}`,
      };
      
      // Step 2: Convert metadata to Blob and upload to IPFS
      const metadataBlob = new Blob([JSON.stringify(metadata)], { type: 'application/json' });
      const metadataCID = await uploadToIPFS(metadataBlob); // This function should handle the actual IPFS upload
      
      console.log("Metadata CID:", metadataCID);

      // Step 3: Mint NFT using the metadata URI
      
      const tx = await contract.mintCertificate(walletAddress, `ipfs://${metadataCID}`);
      console.log("Transaction sent:", tx.hash);
  
      const receipt = await tx.wait();
      console.log("Transaction confirmed in block:", receipt.blockNumber);
  
      // Assuming the return value (tokenId) is in the logs or returned directly
      console.log("Minting complete!");
      
      alert("Certificate issued successfully!");
      
      // Clear the form
      setFormData({
        studentName: '',
        institution: '',
        course: '',
        grade: '',
        year: '',
        certificateFile: null
      });
    } catch (err) {
      console.error("Error issuing certificate:", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsMinting(false);
    }
  };
  
  const initializeEthers = async () => {
    if (!window.ethereum) {
      alert("MetaMask not detected!");
      return;
    }
    
    try {
      const _provider = new ethers.BrowserProvider(window.ethereum);
      const _signer = await _provider.getSigner();
      const _contract = new ethers.Contract(contractAddress.address, contractABI, _signer);

      setProvider(_provider);
      setSigner(_signer);
      setContract(_contract);

      const accounts = await _provider.send("eth_requestAccounts", []);
      setAccount(accounts[0]);
    } catch (error) {
      console.error("Error initializing ethers:", error);
    }
  };

  useEffect(() => {
    if (window.ethereum) {
      initializeEthers();
    }
  }, []);

  return (
    <div className="certificate-form">
      <h2>Issue New Certificate</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Student Name</label>
          <input
            type="text"
            name="studentName"
            value={formData.studentName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Institution</label>
            <input
              type="text"
              name="institution"
              value={formData.institution}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Course/Program</label>
            <input
              type="text"
              name="course"
              value={formData.course}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Grade/Score</label>
            <input
              type="text"
              name="grade"
              value={formData.grade}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Year of Completion</label>
            <input
              type="number"
              name="year"
              value={formData.year}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label>Certificate File (PDF)</label>
          <input
            type="file"
            onChange={handleFileChange}
            required
          />
        </div>

        <button type="submit" className="submit-btn" disabled={isMinting}>
          {isMinting ? "Issuing..." : "Issue Certificate"}
        </button>
      </form>
    </div>
  );
};

export default CertificateForm;
