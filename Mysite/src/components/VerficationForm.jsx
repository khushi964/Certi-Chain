import React, { useState } from 'react';
import './VerificationForm.css';

const VerificationForm = ({ verifyCertificate }) => {
  const [certificateId, setCertificateId] = useState('');
  const [verificationResult, setVerificationResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await verifyCertificate(certificateId);
    setVerificationResult(result);
  };

  return (
    <div className="verification-form">
      <h2>Verify Certificate</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Certificate ID</label>
          <input
            type="text"
            value={certificateId}
            onChange={(e) => setCertificateId(e.target.value)}
            placeholder="Enter certificate hash or ID"
            required
          />
        </div>
        <button type="submit" className="verify-btn">
          Verify
        </button>
      </form>

      {verificationResult && (
        <div className={`verification-result ${verificationResult.valid ? 'valid' : 'invalid'}`}>
          {verificationResult.valid ? (
            <>
              <h3>✅ Certificate Verified</h3>
              <p>This certificate is valid and issued by {verificationResult.issuer}.</p>
              <div className="certificate-details">
                <p><strong>Student:</strong> {verificationResult.studentName}</p>
                <p><strong>Course:</strong> {verificationResult.course}</p>
                <p><strong>Issued On:</strong> {verificationResult.issueDate}</p>
              </div>
              <a 
                href={verificationResult.ipfsLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="view-certificate"
              >
                View Full Certificate
              </a>
            </>
          ) : (
            <>
              <h3>❌ Certificate Not Valid</h3>
              <p>This certificate could not be verified on the blockchain.</p>
              <p>Please check the ID or contact the issuing institution.</p>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default VerificationForm;