import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import proImage from '../images/pro.png';

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
  
    if (storedUser && storedUser !== "undefined") {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Failed to parse user from localStorage:", error);
        navigate('/profile');
      }
    } else {
      navigate('/home');
    }
  }, [navigate]);
  
  

  const handleLogout = () => {
    localStorage.removeItem("user");  // Remove user data from localStorage
    navigate('/');  // Redirect to login page
  };

  if (!user) return null;  // If user is not found, render nothing

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 relative">
      
      {/* Home/back button */}
      <button
        className="p-2 bg-white rounded-full shadow absolute top-4 left-4"
        onClick={() => navigate('/home')}
        aria-label="Go Home"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
      </button>

      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <div className="flex flex-col items-center">
          <img
            src={proImage}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover mb-4 shadow"
          />
          <h2 className="text-2xl font-bold mb-1">{user.firstName}{user.lastName}</h2>
          <p className="text-gray-600">Email: {user.email}</p>
          <p className="text-gray-600">Phone: {user.phNo}</p>
          <p className="text-gray-600 mb-4">Location: {user.address.city}</p>

          <div className="flex flex-col gap-3 w-full">
            <button
              onClick={() => navigate('/editprofile')}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition"
            >
              Edit Profile
            </button>
            <button
              onClick={() => navigate('/myroom')}
              className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 rounded-lg transition"
            >
              My Rooms
            </button>
            <button
              onClick={() => navigate('/add')} 
              className="w-full bg-gray-300 hover:bg-gray-400 text-black font-semibold py-2"
            >
              Add Room
            </button>
            <button
              onClick={handleLogout}
              className="w-full bg-gray-300 hover:bg-gray-400 text-black font-semibold py-2 rounded-lg transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
