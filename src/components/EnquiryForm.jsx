import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { addEnquiry } from '../Services/api';
import './EnquiryForm.css';

const EnquiryForm = () => {
  const [formData, setFormData] = useState({
    enquiryId: null,
    stuName: '',
    stuPhno: '',
    courseName: '',
    classMode: '',
    enqStatus: '',
  });

  const { id } = useParams(); // gets :id from /addenquiry/:id?
  const navigate = useNavigate();
  const counsellorId = localStorage.getItem('counsellorId');

  useEffect(() => {
    if (id) {
      const stored = localStorage.getItem('editEnquiry');
      if (stored) {
        const enquiry = JSON.parse(stored);
        setFormData(enquiry);
      }
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!counsellorId) {
      alert("Counsellor not logged in.");
      return;
    }

    try {
      const result = await addEnquiry(formData, counsellorId);
      alert(result);

      // Clear localStorage if edit
      localStorage.removeItem('editEnquiry');

      // Redirect to list
      navigate('/viewenquiry'); // replace with your route
    } catch (error) {
      alert(error.message || "Submission failed");
    }
  };

  return (
    <div className="form-page">
      <div className="enquiry-box">
        <h2 className="form-heading">{id ? 'Update Enquiry' : 'Add Enquiry'}</h2>
        <form onSubmit={handleSubmit} className="form-grid">

          <div className="form-item">
            <label>Student Name</label>
            <input
              type="text"
              name="stuName"
              value={formData.stuName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-item">
            <label>Phone Number</label>
            <input
              type="text"
              name="stuPhno"
              value={formData.stuPhno}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-item">
            <label>Course Name</label>
            <input
              type="text"
              name="courseName"
              value={formData.courseName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-item">
            <label>Class Mode</label>
            <select
              name="classMode"
              value={formData.classMode}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              <option value="Online">Online</option>
              <option value="Offline">Offline</option>
            </select>
          </div>

          <div className="form-item">
            <label>Enquiry Status</label>
            <select
              name="enqStatus"
              value={formData.enqStatus}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              <option value="Open">Open</option>
              <option value="Enrolled">Enrolled</option>
              <option value="Lost">Lost</option>
            </select>
          </div>

          <button type="submit" className="submit-btn">
            {id ? 'Update' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EnquiryForm;
