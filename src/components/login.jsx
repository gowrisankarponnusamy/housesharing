import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import pro from '../images/house.png';
// import axios from 'axios';
import { API_PATHS, BASE_URL } from '../apis/apipaths';
import axiosInstance from '../apis/axiosinstance';
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  //API fetch 
  const handleLogin = async () => {
    try {
      const res = await axiosInstance.post(API_PATHS.USERS.USER_LOGIN, {
        email,
        password,
      });
  
      if (res.data) 
        console.log(res.data.userId);{
        localStorage.setItem("user", JSON.stringify(res.data));
        navigate('/home'); // or wherever you're going after login
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };
  

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Left side with decorative image */}
      <div className="hidden md:flex md:w-1/2 bg-blue-600 items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-700 opacity-30"></div>
        <img 
          src={pro} 
          alt="Room rental illustration" 
          className="relative z-10 rounded-xl shadow-2xl object-cover transition-transform duration-300 ease-in-out scale-105"
        />
        <div className="absolute bottom-15 left-12 z-20 text-white">
          <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
          <p className="text-lg opacity-90">Find your perfect rental space today</p>
        </div>
      </div>
      
      {/* Right side with login form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md  transition-transform duration-300 ease-in-out hover:scale-105">
          <div className="flex justify-center mb-6">
            <div className="p-3 bg-blue-100 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-6 text-center">Login to Your Account</h2>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Username</label>
            <input
              type="text"
              placeholder="Enter your name"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Password</label>
            <div className="relative">
              <input
                type="password"
                placeholder="Enter the password"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 absolute right-3 top-2.5 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <div className="flex justify-end mt-2">
              <a href="#" className="text-sm text-blue-500 hover:underline">Forgot password?</a>
            </div>
          </div>
          <button
            onClick={handleLogin}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg transition duration-300"
          >
            Login
          </button>
          <p className="mt-6 text-center text-gray-500">
            Don't have an account?{" "}
            <a
              onClick={() => navigate('/reg')}
              className="text-blue-500 hover:underline font-medium cursor-pointer"
            >
              Sign up now
            </a>
          </p>
        </div>
      </div>
      {error && <p className="text-red-500 text-center">{error}</p>}
    </div>
  );
};

export default Login;