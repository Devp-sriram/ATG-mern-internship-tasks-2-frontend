import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_URL from '../../config/global';

const VerifyOTPAndUpdatePassword = () => {
    // { email }
  const [email,setEmail] = useState('')
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const navigate = useNavigate();

  const handleVerifyAndUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${API_URL}/forgotpassword`, { email, otp, newPassword });
      alert(response.data.message);
      navigate('/login')
    } catch (error) {
        console.error(error.response.data); // Log the error response data
        alert('Error updating password: ' + error.response.data.message);
      }
  };

  return (
    <div className='w-1/2 h-1/2 border-2 border-black mx-auto'>
    <form 
    onSubmit={handleVerifyAndUpdate}
    >
      <label className="block" htmlFor="email">Enter Email:</label>
      <input
        type="email"
        id="email"
        value={email}
        className="block w-5/6 px-5 border-2 border-gray-400 m-4 rounded-2xl"
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <label className="block" htmlFor="otp">Enter OTP:</label>
      <input
        type="text"
        id="otp"
        value={otp}
        className="block w-5/6 px-5 border-2 border-gray-400 m-4 rounded-2xl"
        onChange={(e) => setOtp(e.target.value)}
        required
      />
      <label className="block" htmlFor="newPassword">New Password:</label>
      <input
        type="password"
        id="newPassword"
        value={newPassword}
        className="block w-5/6 px-5 border-2 border-gray-400 m-4 rounded-2xl"
        onChange={(e) => setNewPassword(e.target.value)}
        required
      />
      <div className='flex omx-auto'>
      <button className=' w-64 h-12 rounded-2xl mx-auto bg-blue-700 text-white  ' type="submit">Update Password</button>
      </div>
    </form>
    </div>
  );
};

export default VerifyOTPAndUpdatePassword;
