// import { useEffect, useState } from "react";
// import { useNavigate } from 'react-router-dom';
// import proImage from '../images/pro.png';

// const Profile = () => {
//   const navigate = useNavigate();
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
  
//     if (storedUser && storedUser !== "undefined") {
//       try {
//         const parsedUser = JSON.parse(storedUser);
//         setUser(parsedUser);
//       } catch (error) {
//         console.error("Failed to parse user from localStorage:", error);
//         navigate('/profile');
//       }
//     } else {
//       navigate('/home');
//     }
//   }, [navigate]);
  
  

//   const handleLogout = () => {
//     localStorage.removeItem("user");  // Remove user data from localStorage
//     navigate('/');  // Redirect to login page
//   };

//   if (!user) return null;  // If user is not found, render nothing

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100 relative">
      
//       {/* Home/back button */}
//       <button
//         className="p-2 bg-white rounded-full shadow absolute top-4 left-4"
//         onClick={() => navigate('/home')}
//         aria-label="Go Home"
//       >
//         <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
//         </svg>
//       </button>

//       <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
//         <div className="flex flex-col items-center">
//           <img
//             src={proImage}
//             alt="Profile"
//             className="w-32 h-32 rounded-full object-cover mb-4 shadow"
//           />
//           <h2 className="text-2xl font-bold mb-1">{user.firstName}{user.lastName}</h2>
//           <p className="text-gray-600">Email: {user.email}</p>
//           <p className="text-gray-600">Phone: {user.phNo}</p>
//           <p className="text-gray-600 mb-4">Location: {user.address.city}</p>

//           <div className="flex flex-col gap-3 w-full">
//             <button
//               onClick={() => navigate('/editprofile')}
//               className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 rounded-lg transition"
//             >
//               Edit Profile
//             </button>
//             <button
//               onClick={() => navigate('/myroom')}
//               className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 rounded-lg transition"
//             >
//               My Rooms
//             </button>
//             <button
//               onClick={() => navigate('/add')} 
//               className="w-full bg-gray-300 hover:bg-gray-400 text-black font-semibold py-2"
//             >
//               Add Room
//             </button>
//             <button
//               onClick={handleLogout}
//               className="w-full bg-gray-300 hover:bg-gray-400 text-black font-semibold py-2 rounded-lg transition"
//             >
//               Logout
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;

//new

import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import proImage from '../images/pro.png';
import axiosInstance from "../apis/axiosinstance";
import { API_PATHS } from "../apis/apipaths";
const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [activeTab, setActiveTab] = useState('myRooms');
  const [roomImages, setRoomImages] = useState({});
  const [bookingsData, setBookingsData] = useState({});
  const [openBookings, setOpenBookings] = useState(null);
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser && storedUser !== "undefined") {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        const userId = parsedUser?.userId;
        if (userId) {
          axiosInstance
            .get(`/rooms/myrooms/${userId}`)
            .then((res) => setRooms(res.data))
            .catch((err) => console.error("Failed to fetch rooms:", err));
        }
      } catch (error) {
        console.error("Failed to parse user from localStorage:", error);
        navigate('/profile');
      }
    } else {
      navigate('/home');
    }
  }, [navigate]);
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const promises = rooms.map((room) =>
          axiosInstance.get(API_PATHS.IMAGES.GET_IMAGE(room.roomId))
        );
        // console.log(rooms);
        const responses = await Promise.all(promises);
        const imagesData = {};
        responses.forEach((response, index) => {
          imagesData[rooms[index].roomId] = response.data.imgUrl; // assuming response.data is the image URL
        });
        console.log(imagesData);
        setRoomImages(imagesData);
      } catch (error) {
        console.error("Failed to fetch images", error);
      }
    };
    // console.log(roomImages);
    if (rooms.length > 0) {
      fetchImages();
    }
  }, [rooms]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate('/');
  };
  const bookings = async (roomId) => {
    if (openBookings === roomId) {
      setOpenBookings(null); // toggle close
      return;
    }
  
    try {
      const response = await axiosInstance.get(API_PATHS.BOOKINGS.GET_BOOKING_BY_ID(roomId));
      setBookingsData(prev => ({ ...prev, [roomId]: response.data }));
      setOpenBookings(roomId); // toggle open
      console.log(response.data);
    } catch (err) {
      console.error("Failed to fetch bookings:", err);
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-gray-100">
      {/* Home navigation button */}
      <div className="absolute top-6 left-6">
        <button 
          onClick={() => navigate('/home')} 
          className="group flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-md hover:shadow-lg transition duration-300 border border-indigo-100"
          aria-label="Go to Home"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600 group-hover:text-indigo-800 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span className="text-indigo-600 group-hover:text-indigo-800 font-medium transition-colors">Home</span>
        </button>
      </div>

      <div className="container mx-auto py-8 px-4 pt-20">
        {/* Header with user welcome */}
        <div className="mb-8 text-center md:text-left">
          <h1 className="text-3xl font-bold text-gray-800">Welcome, {user.firstName || 'User'}!</h1>
          <p className="text-gray-600 mt-2">Manage your profile and room listings</p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Sidebar - Profile Card */}
          <div className="w-full md:w-1/4">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              {/* Profile header with background */}
              <div className="h-32 bg-gradient-to-r from-indigo-600 to-blue-500 relative">
                <div className="absolute -bottom-16 w-full flex justify-center">
                  <img
                    src={proImage}
                    alt="Profile"
                    className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md"
                  />
                </div>
              </div>
              
              {/* Profile info */}
              <div className="pt-20 pb-6 px-6">
                <div className="text-center mb-6">
                  <h2 className="text-xl font-bold text-gray-800">{user.firstName || 'Username'}{user.lastName || ''}</h2>
                  <p className="text-gray-500 mt-1">{user.email || 'Email'}</p>
                  <div className="mt-3 flex justify-center">
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Host</span>
                  </div>
                </div>
                
                {/* Action buttons */}
                <div className="space-y-3">
                  <button
                    onClick={() => navigate('/editprofile')}
                    className="w-full bg-indigo-600 text-white py-2.5 px-4 rounded-lg hover:bg-indigo-700 transition duration-300 flex items-center justify-center"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit Profile
                  </button>
                  
                  <button
                    onClick={() => navigate('/add')}
                    className="w-full bg-white text-indigo-600 py-2.5 px-4 rounded-lg border border-indigo-600 hover:bg-indigo-50 transition duration-300 flex items-center justify-center"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Add Room
                  </button>
                  
                  <button
                    onClick={handleLogout}
                    className="w-full bg-gray-100 text-gray-700 py-2.5 px-4 rounded-lg hover:bg-gray-200 transition duration-300 flex items-center justify-center"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Logout
                  </button>
                </div>
              </div>
            </div>
            
            {/* Stats card */}
            <div className="bg-white rounded-xl shadow-lg p-6 mt-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Statistics</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-indigo-50 p-4 rounded-lg">
                  <p className="text-sm text-indigo-600 font-medium">Total Rooms</p>
                  <p className="text-2xl font-bold text-gray-800">{rooms.length}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-sm text-green-600 font-medium">Active</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {rooms.filter(room => room.availabilty).length}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Content - Tabs & Room Listings */}
          <div className="w-full md:w-3/4">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              {/* Tabs */}
              <div className="flex border-b border-gray-200">
                <button
                  onClick={() => setActiveTab('myRooms')}
                  className={`flex-1 py-4 px-6 text-center font-medium transition-colors duration-200 ${
                    activeTab === 'myRooms' 
                      ? 'text-indigo-600 border-b-2 border-indigo-600' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  My Rooms
                </button>
              </div>
              
              {/* Tab Content */}
              <div className="p-6">
                {activeTab === 'myRooms' && (
                  <>
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-2xl font-bold text-gray-800">My Rooms</h2>
                      <button 
                        onClick={() => navigate('/add')}
                        className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-300 flex items-center"
                      >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Add New Room
                      </button>
                    </div>
                    
                    {rooms.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-16 text-center">
                        <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                          <svg className="w-12 h-12 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                        </div>
                        <h3 className="text-xl font-semibold mb-2">No Rooms Available</h3>
                        <p className="text-gray-600 max-w-sm">You haven't posted any rooms yet. Click the button below to add your first room.</p>
                        <button
                          onClick={() => navigate('/add')}
                          className="mt-6 bg-indigo-600 text-white py-2 px-6 rounded-lg hover:bg-indigo-700 transition duration-300"
                        >
                          Add Your First Room
                        </button>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 gap-6">
                        {rooms.map((room) => (
                          <div key={room.roomId} className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition duration-300">
                            <div className="flex flex-col md:flex-row">
                              <div className="md:w-1/3 lg:w-1/4">
                              {/* <h3>{roomImages[room.roomId]}</h3> */}
                                <img
                                  src={roomImages[room.roomId] || '/placeholder-room.jpg'}
                                  alt={room.title}
                                  className="w-full h-48 md:h-full object-cover"
                                  onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
                                  }}
                                />
                              </div>
                              
                              <div className="flex-1 p-6">
                                <div className="flex flex-col h-full justify-between">
                                  <div>
                                    <div className="flex justify-between items-start">
                                      <h3 className="text-xl font-semibold text-gray-800">{room.title}</h3>
                                      <span className={`px-3 py-1 text-xs rounded-full ${
                                        room.availabilty 
                                          ? 'bg-green-100 text-green-800' 
                                          : 'bg-red-100 text-red-800'
                                      }`}>
                                        {room.availabilty ? 'Available' : 'Booked'}
                                      </span>
                                    </div>
                                    
                                    <div className="mt-2 flex items-center text-gray-600">
                                      <svg className="w-5 h-5 mr-1 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                                      </svg>
                                      <span className="font-medium">₹{room.price}</span>
                                      <span className="text-sm text-gray-500 ml-1">/ month</span>
                                    </div>
                                    
                                    <div className="mt-2 flex items-center text-gray-600">
                                      <svg className="w-5 h-5 mr-1 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                      </svg>
                                      <span>{room.numberOfGuests} guest{room.numberOfGuests !== 1 ? 's' : ''}</span>
                                    </div>
                                    
                                    <div className="mt-2 flex items-center text-gray-600">
                                      <svg className="w-5 h-5 mr-1 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                      </svg>
                                      <span>{room.roomType}</span>
                                    </div>
                                    
                                    <p className="mt-4 text-gray-600 line-clamp-2">{room.descriptionOfRoom}</p>
                                  </div>
                                  
                                  <div className="flex gap-3 mt-6">
                                    <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition flex items-center">
                                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                      </svg>
                                      Edit
                                    </button>
                                    {/* w-full bg-gray-100 text-gray-700 py-2.5 px-4 rounded-lg hover:bg-gray-200 transition duration-300 flex items-center justify-center */}
                                    <button 
                                      onClick={() => bookings(room.roomId)}
                                      className={`flex items-center px-4 py-2 rounded-lg transition duration-300 ${
                                        openBookings === room.roomId 
                                          ? "bg-indigo-100 text-indigo-700 border border-indigo-300" 
                                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                      }`}
                                    >
                                      <svg 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        className={`h-5 w-5 mr-2 ${openBookings === room.roomId ? "text-indigo-600" : "text-gray-500"}`} 
                                        fill="none" 
                                        viewBox="0 0 24 24" 
                                        stroke="currentColor"
                                      >
                                        <path 
                                          strokeLinecap="round" 
                                          strokeLinejoin="round" 
                                          strokeWidth={2} 
                                          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                                        />
                                      </svg>
                                      {openBookings === room.roomId ? "Hide Bookings" : "View Bookings"}
                                    </button>
                                    {openBookings === room.roomId && bookingsData[room.roomId] && (
                                      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                                        <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
                                          {/* Header */}
                                          <div className="bg-indigo-600 px-6 py-4 flex justify-between items-center">
                                            <h3 className="text-xl font-semibold text-white">Bookings for {room.title}</h3>
                                            <button 
                                              onClick={() => setOpenBookings(null)}
                                              className="text-white hover:text-indigo-100 transition-colors"
                                              aria-label="Close bookings panel"
                                            >
                                              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                              </svg>
                                            </button>
                                          </div>
                                          
                                          {/* Content */}
                                          <div className="overflow-y-auto max-h-[calc(80vh-4rem)]">
                                            {bookingsData[room.roomId].length === 0 ? (
                                              <div className="flex flex-col items-center justify-center py-16 text-center px-6">
                                                <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                  </svg>
                                                </div>
                                                <h4 className="text-xl font-semibold mb-2">No Bookings Yet</h4>
                                                <p className="text-gray-600">This room doesn't have any bookings at the moment.</p>
                                              </div>
                                            ) : (
                                              <div className="divide-y divide-gray-200">
                                                {bookingsData[room.roomId].map((booking, idx) => (
                                                  <div key={idx} className="p-6 hover:bg-gray-50 transition-colors">
                                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
                                                      <div className="flex items-center mb-3 sm:mb-0">
                                                        <div className="bg-indigo-100 rounded-full p-3 mr-4">
                                                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                          </svg>
                                                        </div>
                                                        <div>
                                                        <h4 className="font-medium text-gray-900">{booking.userId.firstName} {booking.userId.lastName || ''}</h4>
                                                        <p className="text-gray-500 text-sm">{booking.userId.email}</p>
                                                        <p className="text-gray-500 text-sm flex items-center mt-1">
                                                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                          </svg>
                                                          {booking.userId.phNo || 'No phone provided'}
                                                        </p>

                                                        </div>
                                                      </div>
                                                      <div className="flex items-center">
                                                        <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                                          {booking.noOfPeople} {booking.noOfPeople === 1 ? 'Guest' : 'Guests'}
                                                        </span>
                                                      </div>
                                                    </div>
                                                    
                                                    <div className="bg-gray-50 rounded-lg p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                      <div className="flex items-center">
                                                        <div className="bg-blue-100 rounded-full p-2 mr-3">
                                                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                          </svg>
                                                        </div>
                                                        <div>
                                                          <p className="text-sm text-gray-500">From</p>
                                                          <p className="font-medium text-gray-900">{new Date(booking.from).toLocaleDateString('en-US', { 
                                                            year: 'numeric', 
                                                            month: 'short', 
                                                            day: 'numeric' 
                                                          })}</p>
                                                        </div>
                                                      </div>
                                                      
                                                      <div className="flex items-center">
                                                        <div className="bg-red-100 rounded-full p-2 mr-3">
                                                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                          </svg>
                                                        </div>
                                                        <div>
                                                          <p className="text-sm text-gray-500">To</p>
                                                          <p className="font-medium text-gray-900">{new Date(booking.to).toLocaleDateString('en-US', { 
                                                            year: 'numeric', 
                                                            month: 'short', 
                                                            day: 'numeric' 
                                                          })}</p>
                                                        </div>
                                                      </div>
                                                    </div>
                                                    
                                                    <div className="mt-4 flex justify-end space-x-3">
                                                      <button className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center text-sm">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                                        </svg>
                                                        Contact Guest
                                                      </button>
                                                      <button className="text-gray-600 hover:text-gray-800 font-medium flex items-center text-sm">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                        </svg>
                                                        View Details
                                                      </button>
                                                    </div>
                                                  </div>
                                                ))}
                                              </div>
                                            )}
                                          </div>
                                          
                                          {/* Footer */}
                                          <div className="border-t border-gray-200 px-6 py-4 bg-gray-50">
                                            <button 
                                              onClick={() => setOpenBookings(null)}
                                              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-300 flex items-center justify-center"
                                            >
                                              Close
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}                      
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;