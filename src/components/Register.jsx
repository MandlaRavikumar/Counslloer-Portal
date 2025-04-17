import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { registerCounsellor } from '../Services/api'

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [phno, setPhno] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [phnoError, setPhnoError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const validateForm = () => {
    let isValid = true;
    setNameError('');
    setEmailError('');
    setPasswordError('');
    setPhnoError('');
    setErrorMessage('');

    if (!name) {
      setNameError('Name is required.');
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError('Email is required.');
      isValid = false;
    } else if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address.');
      isValid = false;
    }

    if (!pwd) {
      setPasswordError('Password is required.');
      isValid = false;
    } else if (pwd.length < 6) {
      setPasswordError('Password must be at least 6 characters long.');
      isValid = false;
    }

    if (phno && !/^\d{10}$/.test(phno)) {
      setPhnoError('Phone number must be 10 digits long.');
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = validateForm();
    if (!isValid) return;

    try {
      const newCounsellor = { name, email, pwd, phno };
      const res = await registerCounsellor(newCounsellor);

      // ✅ Show alert popup for success
      alert('Registration successful!');

      navigate('/dashboard');

      // ✅ Clear form fields
      setName('');
      setEmail('');
      setPwd('');
      setPhno('');

      // ✅ Set success message (optional display below form)
      setSuccessMessage(res);
      setErrorMessage('');
      console.log(res);

    } catch (err) {
      if (err.response && err.response.status === 409) {
        setErrorMessage('Email already exists. Please use a different email.');
      } else {
        setErrorMessage('Registration failed. Please try again.');
      }
    }
  };



  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Register</h2>
      <form onSubmit={handleSubmit}>
        {successMessage && <div className="alert alert-success">{successMessage}</div>}
        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

        {/* Name Input */}
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className={`form-control ${nameError ? 'is-invalid' : ''}`}
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {nameError && <div className="text-danger">{nameError}</div>}
        </div>

        {/* Email Input */}
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className={`form-control ${emailError ? 'is-invalid' : ''}`}
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailError && <div className="text-danger">{emailError}</div>}
        </div>

        {/* Password Input */}
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className={`form-control ${passwordError ? 'is-invalid' : ''}`}
            placeholder="Enter your password"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
          />
          {passwordError && <div className="text-danger">{passwordError}</div>}
        </div>

        {/* Phone Number Input (Optional) */}
        <div className="mb-3">
          <label className="form-label">Phone Number</label>
          <input
            type="text"
            className={`form-control ${phnoError ? 'is-invalid' : ''}`}
            placeholder="Enter your phone number "
            value={phno}
            onChange={(e) => setPhno(e.target.value)}
          />
          {phnoError && <div className="text-danger">{phnoError}</div>}
        </div>

        <button type="submit" className="btn btn-primary w-100">Register</button>
      </form>
      <div className="text-center mt-3">
        <p>Already have an account? <Link to="/login">Login here</Link></p>
      </div>

    </div>
  );
};

export default Register;
