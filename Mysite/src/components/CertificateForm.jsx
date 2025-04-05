import React, { useState } from 'react';
import './CertificateForm.css';

const CertificateForm = ({ issueCertificate }) => {
  const [formData, setFormData] = useState({
    studentName: '',
    institution: '',
    course: '',
    grade: '',
    year: '',
    certificateFile: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({ ...prev, certificateFile: e.target.files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    issueCertificate(formData);
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
        
        <button type="submit" className="submit-btn">
          Issue Certificate
        </button>
      </form>
    </div>
  );
};

export default CertificateForm;