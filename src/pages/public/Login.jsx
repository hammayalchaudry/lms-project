import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({ 
    name: '',
    role: 'Student', 
    email: '', 
    password: '' 
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const endpoint = isSignup 
      ? 'http://localhost/lms-backend/signup.php' 
      : 'http://localhost/lms-backend/login.php';

    try {
      const response = await axios.post(endpoint, formData);
      
      if (response.data && response.data.success) {
        
        if (!isSignup) {
          // 1. User data ko local storage mein save karein
          localStorage.setItem('user', JSON.stringify(response.data.user));
          
          // 2. Role read karein
          const role = (response.data.user?.role || formData.role).toLowerCase();

          // 3. Directly navigate karein (bina kisi delay ke)
          if (role === 'teacher') {
            navigate('/teacher-dashboard');
          } else if (role === 'admin') {
            navigate('/admin-dashboard');
          } else {
            navigate('/student-dashboard');
          }

        } else {
          // Signup Success ➔ Switch to Login Mode
          setIsSignup(false);
          setMessage('✅ Account ban gaya hai! Ab login karein.');
        }

      } else {
        const errorMsg = response.data && response.data.message 
          ? response.data.message 
          : 'Email, Password ya Role check karein!';
        setMessage('❌ ' + errorMsg);
      }
    } catch (error) {
      const serverMsg = error.response?.data?.message || 'Server Connection Error!';
      setMessage('❌ ' + serverMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '25px', border: '1px solid #ddd', borderRadius: '12px', fontFamily: 'sans-serif', boxSizing: 'border-box' }}>
      <h2 style={{ marginTop: 0, textAlign: 'center' }}>
        {isSignup ? 'Create an Account' : 'Log In'}
      </h2>
      
      {message && (
        <p style={{ 
          padding: '10px', 
          borderRadius: '6px', 
          backgroundColor: message.includes('✅') ? '#d1fae5' : '#fee2e2',
          color: message.includes('✅') ? '#065f46' : '#991b1b',
          fontSize: '14px',
          wordBreak: 'break-word'
        }}>
          {message}
        </p>
      )}
      
      <form onSubmit={handleSubmit}>

        {/* Full Name Input (Only on Signup) */}
        {isSignup && (
          <div style={{ marginBottom: '15px' }}>
            <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required={isSignup}
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc', boxSizing: 'border-box' }}
            />
          </div>
        )}

        {/* Role Select Dropdown */}
        <div style={{ marginBottom: '15px' }}>
          <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>Select Role</label>
          <select 
            name="role" 
            value={formData.role} 
            onChange={handleChange}
            style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc', outline: 'none' }}
          >
            <option value="Student">🧑‍🎓 Student</option>
            <option value="Teacher">👨‍🏫 Teacher</option>
            <option value="Admin">🛠️ Admin</option>
          </select>
        </div>

        {/* Email Address Input */}
        <div style={{ marginBottom: '15px' }}>
          <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="admin@gmail.com"
            required
            style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc', boxSizing: 'border-box' }}
          />
        </div>

        {/* Password Input */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            required
            style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc', boxSizing: 'border-box' }}
          />
        </div>

        {/* Submit Button */}
        <button 
          type="submit" 
          disabled={loading}
          style={{ 
            width: '100%', 
            padding: '12px', 
            backgroundColor: isSignup ? '#10B981' : '#2563eb', 
            color: 'white', 
            border: 'none', 
            borderRadius: '6px', 
            cursor: loading ? 'not-allowed' : 'pointer', 
            fontWeight: 'bold',
            fontSize: '16px'
          }}
        >
          {loading ? 'Processing...' : (isSignup ? 'Sign Up' : 'Log In')}
        </button>
      </form>

      {/* Switch Link Between Login and Signup */}
      <div style={{ textAlign: 'center', marginTop: '15px', fontSize: '14px' }}>
        {isSignup ? (
          <p>
            Already have an account?{' '}
            <span 
              onClick={() => { setIsSignup(false); setMessage(''); }} 
              style={{ color: '#2563eb', cursor: 'pointer', fontWeight: 'bold' }}
            >
              Log In
            </span>
          </p>
        ) : (
          <p>
            Don't have an account?{' '}
            <span 
              onClick={() => { setIsSignup(true); setMessage(''); }} 
              style={{ color: '#2563eb', cursor: 'pointer', fontWeight: 'bold' }}
            >
              Sign Up
            </span>
          </p>
        )}
      </div>
    </div>
  );
}
