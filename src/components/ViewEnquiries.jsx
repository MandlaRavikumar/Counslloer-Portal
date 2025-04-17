import React, { useEffect, useState } from 'react';
import { fetchEnquiriesByCounsellor, deleteEnquiry } from '../Services/api';
import { Link } from 'react-router-dom';

const ViewEnquiries = () => {
    const [enquiries, setEnquiries] = useState([]);
    const [filter, setFilter] = useState({
        courseName: '',
        classMode: '',
        enqsStatus: ''
    });

    const loadEnquiries = async () => {
        const counsellorId = localStorage.getItem('counsellorId');
        if (!counsellorId) {
            console.error("No counsellorId found");
            return;
        }

        try {
            const data = await fetchEnquiriesByCounsellor(filter, counsellorId);
            setEnquiries(data);
        } catch (error) {
            console.error('Error fetching enquiries:', error);
        }
    };

    useEffect(() => {
        loadEnquiries();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFilter(prev => ({ ...prev, [name]: value }));
    };

    const handleSearch = (e) => {
        e.preventDefault();
        loadEnquiries();
    };

    const handleReset = () => {
        setFilter({
            courseName: '',
            classMode: '',
            enqsStatus: ''
        });
        loadEnquiries();
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this enquiry?")) {
            try {
                await deleteEnquiry(id);
                loadEnquiries(); // Reload list after deletion
            } catch (err) {
                console.error('Delete failed:', err);
                alert('Failed to delete the enquiry');
            }
        }
    };

    return (
        <div className="container mt-4">
            <h3 className="mb-4">All Enquiries</h3>

            {/* 🔍 Filter Section */}
            <form className="row g-3 mb-4" onSubmit={handleSearch}>
                <div className="col-md-3">
                    <input
                        type="text"
                        name="courseName"
                        value={filter.courseName}
                        onChange={handleInputChange}
                        className="form-control"
                        placeholder="Course Name"
                    />
                </div>
                <div className="col-md-3">
                    <select
                        name="classMode"
                        value={filter.classMode}
                        onChange={handleInputChange}
                        className="form-select"
                    >
                        <option value="">-- Class Mode --</option>
                        <option value="Online">Online</option>
                        <option value="Offline">Offline</option>
                    </select>
                </div>
                <div className="col-md-3">
                    <select
                        name="enqsStatus"
                        value={filter.enqsStatus}
                        onChange={handleInputChange}
                        className="form-select"
                    >
                        <option value="">-- Status --</option>
                        <option value="Enrolled">Enrolled</option>
                        <option value="Lost">Lost</option>
                        <option value="Open">Open</option>
                    </select>
                </div>
                <div className="col-md-3 d-flex gap-2">
                    <button type="submit" className="btn btn-primary">Search</button>
                    <button type="button" className="btn btn-secondary" onClick={handleReset}>Reset</button>
                </div>
            </form>

            {/* 📋 Enquiry Table */}
            <table className="table table-striped table-bordered">
                <thead className="table-dark">
                    <tr>
                        <th>#</th>
                        <th>Student Name</th>
                        <th>Phone</th>
                        <th>Course</th>
                        <th>Class Mode</th>
                        <th>Status</th>
                        <th>Date</th>
                        <th>Edit</th>
                        <th>Delete</th> {/* 🗑️ New column */}
                    </tr>
                </thead>
                <tbody>
                    {enquiries.map((enq, index) => (
                        <tr key={enq.enquiryId}>
                            <td>{index + 1}</td>
                            <td>{enq.stuName}</td>
                            <td>{enq.stuPhno}</td>
                            <td>{enq.courseName}</td>
                            <td>{enq.classMode}</td>
                            <td>
                                <span className={`badge ${enq.enqStatus === 'Enrolled' ? 'bg-success' :
                                    enq.enqStatus === 'Open' ? 'bg-warning text-dark' :
                                        'bg-danger'
                                    }`}>
                                    {enq.enqStatus}
                                </span>
                            </td>
                            <td>{enq.createdBy}</td>
                            <td>
                                <Link
                                    to={`/addenquiry/${enq.enquiryId}`}
                                    className="text-primary"
                                    onClick={() => localStorage.setItem('editEnquiry', JSON.stringify(enq))}
                                >
                                    Edit
                                </Link>
                            </td>
                            <td>
                                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(enq.enquiryId)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    {enquiries.length === 0 && (
                        <tr>
                            <td colSpan="9" className="text-center text-muted">No enquiries found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ViewEnquiries;
