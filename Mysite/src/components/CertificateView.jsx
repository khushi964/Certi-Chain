import React, { useState, useEffect } from 'react';
import './CertificateView.css';

const CertificateView = ({ walletAddress }) => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCertificates = async () => {
      // Simulate fetching from blockchain
      setTimeout(() => {
        setCertificates([
          {
            id: '0x123...abc',
            name: 'Bachelor of Technology',
            institution: 'Rural Technology Institute',
            issueDate: '2023-05-15',
            ipfsLink: 'https://ipfs.io/ipfs/QmXyZ...',
            verified: true
          },
          {
            id: '0x456...def',
            name: 'High School Diploma',
            institution: 'Village Public School',
            issueDate: '2019-04-20',
            ipfsLink: 'https://ipfs.io/ipfs/QmAbC...',
            verified: true
          }
        ]);
        setLoading(false);
      }, 1000);
    };

    if (walletAddress) {
      fetchCertificates();
    }
  }, [walletAddress]);

  if (loading) {
    return <div className="loading">Loading your certificates...</div>;
  }

  return (
    <div className="certificate-view">
      <h2>Your Certificates</h2>
      {certificates.length === 0 ? (
        <p>No certificates found for your wallet address.</p>
      ) : (
        <div className="certificate-grid">
          {certificates.map((cert, index) => (
            <div key={index} className="certificate-card">
              <div className="certificate-header">
                <h3>{cert.name}</h3>
                <span className={`status ${cert.verified ? 'verified' : 'unverified'}`}>
                  {cert.verified ? 'Verified' : 'Unverified'}
                </span>
              </div>
              <div className="certificate-body">
                <p><strong>Institution:</strong> {cert.institution}</p>
                <p><strong>Issued On:</strong> {cert.issueDate}</p>
                <p><strong>Certificate ID:</strong> <small>{cert.id}</small></p>
              </div>
              <div className="certificate-actions">
                <a 
                  href={cert.ipfsLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="view-btn"
                >
                  View Certificate
                </a>
                <button className="share-btn">Share</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CertificateView;