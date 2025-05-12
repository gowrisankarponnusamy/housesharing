import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import pro from '../images/house.png';
import { FaEnvelope, FaLock } from 'react-icons/fa'; // Importing icons
import { API_PATHS, BASE_URL } from '../apis/apipaths';
import axiosInstance from '../apis/axiosinstance';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (error) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
      }, 3000); // disappear after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [error]);


  // API fetch 
  const handleLogin = async () => {
    try {
      const res = await axiosInstance.post(API_PATHS.USERS.USER_LOGIN, {
        email,
        password,
      });

      if (res.data) {
        // console.log(res.data.userId);
        localStorage.setItem("user", JSON.stringify(res.data));
        navigate('/home'); // or wherever you're going after login
      }
    } catch (error) {
      console.error("Login failed:", error);
      setError("Invalid Email or password, please try again.");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Left side with decorative image */}
      <div className="hidden md:flex md:w-1/2 bg-indigo-600 items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-indigo-700 opacity-30"></div>
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
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md transition-transform duration-300 ease-in-out hover:scale-105">
          <div className="flex justify-center mb-6">
            <div className="p-3 bg-indigo-100 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-6 text-center">Login to Your Account</h2>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Email</label>
            <div className="flex items-center border rounded-lg">
              <FaEnvelope className="ml-3 text-gray-400" />
              <input
                type="text"
                placeholder="Enter your e-mail Id"
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 focus:ring-0 focus:outline-none"
              />
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Password</label>
            <div className="relative flex items-center border rounded-lg">
              <FaLock className="ml-3 text-gray-400" />
              <input
                type="password"
                placeholder="Enter the password"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-6 py-2 focus:ring-0 focus:outline-none"
              />
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 absolute right-3 top-2.5 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <div className="flex justify-end mt-2">
              <a href="#" className="text-sm text-indigo-500 hover:underline">Forgot password?</a>
            </div>
          </div>
          <button
            onClick={handleLogin}
            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg transition duration-300"
          >
            Login
          </button>
          <p className="mt-6 text-center text-gray-500">
            Don't have an account?{" "}
            <a
              onClick={() => navigate('/reg')}
              className="text-indigo-500 hover:underline font-medium cursor-pointer"
            >
              Sign up now
            </a>
          </p>
        </div>
      </div>
      {error && (
        <div
        className={`fixed right-10 top-10 w-2xl max-w-m px-4 py-2 rounded-lg text-center shadow-md transition-all duration-500 ease-in-out
          ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}
         bg-red-600 text-white`}
      >
        {error}
      </div>
      
      )}
    </div>
  );
};

export default Login;
