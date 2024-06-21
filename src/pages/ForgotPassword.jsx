import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API_URL from '../../config/global';

import axios from 'axios';


const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/forgotpassword`, { email });
      alert(response.data.msg);
      navigate(`/VerifyOtp`);
    } catch (error) {
      console.error(error);
      alert('Error sending OTP');
    }
  };

  return (
    <div className='w-1/2 h-1/2 border-2 border-black  mx-auto'>
    <form onSubmit={handleSubmit} >
      <label htmlFor="email" className="block">Email:</label>
      <input
        type="email"
        id="email"
        className="block w-5/6 px-5 border-2 border-gray-400 m-4 rounded-2xl"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <div className='flex omx-auto'>
      <button className=' w-28 h-12 rounded-2xl mx-auto bg-blue-700' type="submit">Send OTP</button>
      </div>
    </form>
    </div>
  );
};

export default ForgotPasswordForm;
