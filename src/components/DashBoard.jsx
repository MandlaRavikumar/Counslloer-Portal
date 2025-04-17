import React, { useEffect, useState } from 'react';
import { fetchDashboard } from '../Services/api';
import { Link } from 'react-router-dom';

const DashBoard = () => {
  const [dashboardData, setDashboardData] = useState({
    totalEnqs: 0,
    openEnqs: 0,
    enrollEnqs: 0,
    lostEnqs: 0,
  });

  const counsellorName = localStorage.getItem('name'); // Retrieve the name from localStorage


  useEffect(() => {
    const loadDashboard = async () => {
      const counsellorId = localStorage.getItem('counsellorId');

      if (!counsellorId) {
        console.error('No counsellorId found in localStorage');
        return;
      }

      try {
        const data = await fetchDashboard(counsellorId);
        console.log("data=====>", data);
        setDashboardData(data);
      } catch (error) {
        console.error('Error fetching dashboard:', error);
      }
    };

    loadDashboard();
  }, []);

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-4">
        <span className="navbar-brand">Counsellor Dashboard</span>
        <div className="ms-auto">
          <Link to="/addenquiry" className="btn btn-light me-2">Add Enquiry</Link>
          <Link to="/viewenquiry" className="btn btn-light">View Enquiry</Link>
        </div>
      </nav>

      {/* Dashboard Summary */}
      <div className="container mt-5">
        <h3 className="mb-4">Welcome, <span style={{ backgroundColor: '#d1e7dd', padding: '4px 8px', borderRadius: '5px', color: '#0f5132' }}>
          {counsellorName}
        </span>
        </h3>


        <h3 className="mb-4">Enquiry Summary</h3>
        <ul className="list-group shadow-sm rounded">
          <li className="list-group-item d-flex justify-content-between align-items-center">
            <span className="fw-medium">Total Enquiries</span>
            <span className="badge bg-primary rounded-pill fs-6">{dashboardData.totalEnqs}</span>
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center">
            <span className="fw-medium">Open Enquiries</span>
            <span className="badge bg-warning text-dark rounded-pill fs-6">{dashboardData.openEnqs}</span>
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center">
            <span className="fw-medium">Enrolled Enquiries</span>
            <span className="badge bg-success rounded-pill fs-6">{dashboardData.enrollEnqs}</span>
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center">
            <span className="fw-medium">Lost Enquiries</span>
            <span className="badge bg-danger rounded-pill fs-6">{dashboardData.lostEnqs}</span>
          </li>
        </ul>

      </div>

    </div>
  );
};

export default DashBoard;
