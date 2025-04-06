import React, { useState } from 'react';
import './CertificateForm.css';
import { getContract, uploadToIPFS } from '../utils/blockchain';

const CertificateForm = () => {
  const [formData, setFormData] = useState({
    studentName: '',
    institution: '',
    course: '',
    grade: '',
    year: '',
    certificateFile: null
  });

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
      const fileCID = await uploadToIPFS(formData.certificateFile);
      const metadata = {
        name: `${formData.studentName} - ${formData.course}`,
        description: `Certificate issued by ${formData.institution} in ${formData.year} with grade ${formData.grade}`,
        image: `https://ipfs.io/ipfs/${fileCID}`
      };

      // Step 2: Upload metadata to IPFS
      const metadataBlob = new Blob([JSON.stringify(metadata)], { type: 'application/json' });
      const metadataCID = await uploadToIPFS(metadataBlob);

      // Step 3: Mint NFT using the metadata URI
      const contract = await getContract();
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      await contract.mintCertificate(accounts[0], `https://ipfs.io/ipfs/${metadataCID}`);

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
            accept=".pdf"
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
