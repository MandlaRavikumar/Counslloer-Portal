import React, { useState } from 'react';
import { loginCounsellor } from '../Services/api';
import { Link, useNavigate } from 'react-router-dom';  // Import Link if you're using React Router for navigation

function Login() {
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [success, setSuccess] = useState('');
  const [notFoundError, setNotFoundError] = useState('');  // New state for "Counsellor doesn't exist"

  const navigate = useNavigate();

  const validateForm = () => {
    let isValid = true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    setEmailError('');
    setPasswordError('');
    setNotFoundError(''); // Reset error state on every validation

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

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    setSuccess('');
    setNotFoundError('');
    const isValid = validateForm();
    if (!isValid) return;
  
    try {
      const result = await loginCounsellor(email, pwd);
      console.log("result======>",result);
      // ✅ Save counsellorId to localStorage
      localStorage.setItem('counsellorId', result.counsellorId);
      localStorage.setItem('name', result.name);
      // ✅ Show popup
      alert('Login successful!');
      navigate('/dashboard');
      // ✅ Clear form fields
      setEmail('');
      setPwd('');
  
      // ✅ Optional success message display
      setSuccess('Login successful!');
      console.log("result=======>",result);
  
     
  
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setNotFoundError('Counsellor does not exist.');
        setPasswordError('');
      } else {
        setPasswordError('Login failed. Please check your credentials.');
      }
    }
  };
  

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Login</h2>
      <form onSubmit={handleSubmit}>
        {success && <div className="alert alert-success">{success}</div>}
        
        {/* Display error message if counsellor doesn't exist */}
        {notFoundError && (
          <div className="alert alert-danger">
            {notFoundError}
            <Link to="/register" className="ms-2 text-decoration-underline">Register here</Link>
          </div>
        )}

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className={`form-control ${emailError ? 'is-invalid' : ''}`}
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailError && <div className="text-danger">{emailError}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className={`form-control ${passwordError ? 'is-invalid' : ''}`}
            placeholder="Password"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
          />
          {passwordError && <div className="text-danger">{passwordError}</div>}
        </div>

        <button type="submit" className="btn btn-primary w-100">Login</button>
      </form>

      {/* Default Register link */}
      <div className="mt-3 text-center">
        <p>Don't have an account? <Link to="/" className="text-decoration-underline">Register here</Link></p>
      </div>
    </div>
  );
}

export default Login;
