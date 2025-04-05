import React from 'react';
import VerificationForm from '../components/VerficationForm';
import './VerificationPage.css';

const VerificationPage = () => {
  const verifyCertificate = async (certificateId) => {
    // Verification logic here
    // This would interact with your smart contract
    console.log('Verifying:', certificateId);
    
    // Simulate verification
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          valid: true,
          studentName: 'Rahul Sharma',
          course: 'Bachelor of Technology - Computer Science',
          issuer: 'Rural Technology Institute',
          issueDate: '2023-05-15',
          ipfsLink: 'https://ipfs.io/ipfs/QmXyZ...'
        });
      }, 1500);
    });
  };

  return (
    <div className="verification-page">
      <h1>Certificate Verification</h1>
      <p>Enter a certificate ID to verify its authenticity on the blockchain</p>
      
      <VerificationForm verifyCertificate={verifyCertificate} />
      
      <div className="verification-info">
        <h3>About Verification</h3>
        <p>
          Our system uses blockchain technology to ensure certificate authenticity.
          Each certificate has a unique ID that is stored permanently on the blockchain.
        </p>
        <p>
          Verification happens directly against the blockchain record, with no middlemen involved.
          Results are 100% reliable and cannot be faked.
        </p>
      </div>
    </div>
  );
};

export default VerificationPage;