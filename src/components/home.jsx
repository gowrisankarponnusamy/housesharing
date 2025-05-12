// import { useEffect, useState } from 'react';
// import { Heart, User, Menu, Search, Star } from "lucide-react";
// import { Link, useNavigate } from 'react-router-dom';
// import axiosInstance from '../apis/axiosinstance';
// import { API_PATHS } from '../apis/apipaths';
// import '../styles/home.css';

// const HomePage = () => {
//   const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [rooms, setRooms] = useState([]);
//   const navigate = useNavigate();
//   const [user, setUser] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   useEffect(() => {
//     const user = localStorage.getItem("user");
//     console.log("Raw user from localStorage:", user); // Add this
//     try {
//       if (user && user !== "undefined") {
//         setUser(JSON.parse(user));
//       } else {
//         navigate('/home');
//       }
//     } catch (error) {
//       console.error("Invalid user JSON:", error);
//       navigate('/');
//     }
//   }, [navigate]);
  
//   useEffect(() => {
//     const fetchRooms = async () => {
//       try {
//         const res = await axiosInstance.get(API_PATHS.ROOMS.LIST_ROOMS);
//         setRooms(res.data);
//       } catch (err) {
//         console.error('Error fetching rooms:', err);
//       }
//     };

//     fetchRooms();
//   }, []);
//   const getActiveRooms = () => {
//     return rooms.filter(room =>( room?.hostId?.userId !== user?.userId));
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <header className="bg-white shadow-sm sticky top-0 z-50">
//         <div className="max-w-9xl mx-auto px-4 py-3 flex justify-between items-center">
//           <div className="text-2xl font-bold text-indigo-600">RoomFinder</div>

//           <div className="relative">
//             <button
//               className="flex items-center space-x-2 p-2 rounded-full border border-gray-300"
//               onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
//             >
//               <Menu size={18} className="text-gray-600" />
//               <div className="bg-indigo-500 rounded-full p-1">
//                 <User size={18} className="text-white" />
//               </div>
//             </button>

//             {isProfileMenuOpen && (
//               <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
//                 <div className="p-3 border-b border-gray-200">
//                   <p className="font-medium">{user?.firstName}</p>
//                   <p className="text-sm text-gray-500">{user?.email}</p>
//                 </div>
//                 <ul className="py-1">
//                   <li><Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">Profile</Link></li>
//                   <li><Link to="/favorites" className="block px-4 py-2 hover:bg-gray-100">Favorites</Link></li>
//                   <li><Link to="/bookings" className="block px-4 py-2 hover:bg-gray-100">Bookings</Link></li>
//                   <li><Link to="/" className="block px-4 py-2 hover:bg-gray-100 text-red-500">Log out</Link></li>
//                 </ul>
//               </div>
//             )}
//           </div>
//         </div>
//       </header>

//       {/* Hero section with search */}
//       <div className="bg-indigo-600 text-white py-16">
//         <div className="container mx-auto px-4 text-center">
//           <h1 className="text-3xl md:text-4xl font-bold mb-6">Welcome Back !!  {user?.firstName}</h1>
//           <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">Search through thousands of rooms available for rent in your area</p>
//           <div className="max-w-3xl mx-auto">
//             <div className="flex items-center px-6 py-4 rounded-full bg-white shadow-lg">
//               <Search size={24} className="text-gray-400 mr-3" />
//               <input 
//                 type="text" 
//                 placeholder="Where are you looking for a room?" 
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="outline-none w-full bg-transparent text-gray-800 text-lg"/>
//               <button 
//                 className="ml-4 px-6 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 font-medium"
//               >
//                 Search
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Room Listings */}
//       <main className="container mx-auto px-4 py-8">
//         <h2 className="text-2xl font-bold mb-6">Featured Rooms</h2>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
//           {getActiveRooms().map(room => (
//             <div key={room.roomId} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
//               <div className="relative">
//                 <img
//                   src="https://placehold.co/400x240?text=Room+Image"
//                   alt={room.title}
//                   className="w-full h-40 object-cover"
//                 />
//                 <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md">
//                   <Heart size={16} className="text-gray-500" />
//                 </button>
//               </div>
//               <div className="p-3">
//                 <div className="flex justify-between items-start">
//                   <h3 className="text-base font-medium line-clamp-1">{room.title}</h3>
//                   <div className="flex items-center">
//                     <Star size={14} className="text-yellow-500 mr-1" />
//                     <span className="text-sm">{room.rating}</span>
//                   </div>
//                 </div>
//                 <p className="text-gray-600 text-sm">{room.location}</p>
//                 <p className="text-gray-600 text-sm">{room.type}</p>
//                 <div className="mt-2 pt-2 border-t border-gray-100 flex justify-between items-center">
//                   <p className="font-semibold">₹{room.price}<span className="text-gray-500 text-xs">/month</span></p>
//                   <button> <Link to={`/viewroom/${room.roomId}`} className="px-2 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 text-xs">
//                       View
//                     </Link>
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </main>

//       {/* Footer */}
//       <footer className="bg-gray-800 text-white p-6 mt-12">
//         <div className="container mx-auto">
//           <div className="flex flex-col md:flex-row justify-between">
//             <div className="mb-6 md:mb-0">
//               <h3 className="text-xl font-bold mb-2">RoomFinder</h3>
//               <p className="text-gray-400">Find your perfect room, anywhere.</p>
//             </div>
//             <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
//               <div>
//                 <h4 className="font-medium mb-3">Company</h4>
//                 <ul className="space-y-2 text-gray-400">
//                   <li><a href="#" className="hover:text-white">About</a></li>
//                   <li><a href="#" className="hover:text-white">Careers</a></li>
//                   <li><a href="#" className="hover:text-white">Blog</a></li>
//                 </ul>
//               </div>
//               <div>
//                 <h4 className="font-medium mb-3">Support</h4>
//                 <ul className="space-y-2 text-gray-400">
//                   <li><a href="#" className="hover:text-white">Help Center</a></li>
//                   <li><a href="#" className="hover:text-white">Contact Us</a></li>
//                   <li><a href="#" className="hover:text-white">Safety Center</a></li>
//                 </ul>
//               </div>
//               <div>
//                 <h4 className="font-medium mb-3">Legal</h4>
//                 <ul className="space-y-2 text-gray-400">
//                   <li><a href="#" className="hover:text-white">Terms</a></li>
//                   <li><a href="#" className="hover:text-white">Privacy</a></li>
//                   <li><a href="#" className="hover:text-white">Cookies</a></li>
//                 </ul>
//               </div>
//             </div>
//           </div>
//           <div className="pt-8 mt-8 border-t border-gray-700 text-center text-gray-400">
//             <p>&copy; 2025 RoomFinder. All rights reserved.</p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default HomePage;
import { useEffect, useState } from 'react';
import { Heart, User, Menu, Search, Star } from "lucide-react";
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../apis/axiosinstance';
import { API_PATHS } from '../apis/apipaths';
import '../styles/home.css';
import axios from 'axios';

const HomePage = () => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [roomImages, setRoomImages] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const user = localStorage.getItem("user");
    try {
      if (user && user !== "undefined") {
        setUser(JSON.parse(user));
      } else {
        navigate('/home');
      }
    } catch (error) {
      console.error("Invalid user JSON:", error);
      navigate('/');
    }
  }, [navigate]);
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await axiosInstance.get(API_PATHS.ROOMS.LIST_ROOMS);
        setRooms(res.data);

        res.data.forEach(room => {
          handleGetImage(room.roomId);
        });
  
      } catch (err) {
        setError('Failed to fetch rooms. Please try again.');
        console.error('Error fetching rooms:', err);
      }
    };

    fetchRooms();
  }, []);

  const handleGetImage = async (roomId) => {
    try {
      const response = await axiosInstance.get(`${API_PATHS.IMAGES.GET_IMAGE(roomId)}`);
      setRoomImages(prev => ({ ...prev, [roomId]: response.data.imgUrl }));
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };
  
  useEffect(() => {
    if (error) {
      setVisible(true);
      const timer = setTimeout(() => setVisible(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);
  
  const getActiveRooms = () => {
    return rooms.filter(room => (room?.hostId?.userId !== user?.userId));
  };
  const filteredRooms = getActiveRooms().filter(room =>
    room?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    room?.hostId?.address?.city?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {error && (
        <div
          className={`fixed right-10 bottom-10 w-full max-w-xl px-4 py-2 rounded-lg text-center shadow-md transition-all duration-500 ease-in-out
            ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}
            bg-red-100 text-red-800`}
        >
          {error}
        </div>
      )}

      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-9xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="text-2xl font-bold text-indigo-600">RoomFinder</div>

          <div className="relative">
            <button
              className="flex items-center space-x-2 p-2 rounded-full border border-gray-300 hover:shadow-md transition"
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
            >
              <Menu size={18} className="text-gray-600" />
              <div className="bg-indigo-500 rounded-full p-1">
                <User size={18} className="text-white" />
              </div>
            </button>

            {isProfileMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200 animate-fade-in">
                
                <div className="p-3 border-b border-gray-200"> 
                  <p className="font-medium">{user?.firstName}</p>
                  <p className="text-sm text-gray-500">{user?.email}</p>
                </div>
                <ul className="py-1">
                  <li><Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">Profile</Link></li>
                  <li><Link to="/favorites" className="block px-4 py-2 hover:bg-gray-100">Favorites</Link></li>
                  <li><Link to="/bookings" className="block px-4 py-2 hover:bg-gray-100">Bookings</Link></li>
                  <li><Link to="/" className="block px-4 py-2 hover:bg-gray-100 text-red-500">Log out</Link></li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Hero section */}
      <div className="bg-indigo-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 animate-slide-in">Welcome Back !! {user?.firstName}</h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">Search through thousands of rooms available for rent in your area</p>
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center px-6 py-4 rounded-full bg-white shadow-lg">
              <Search size={24} className="text-gray-400 mr-3" />
              <input
                type="text"
                placeholder="Where are you looking for a room?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="outline-none w-full bg-transparent text-gray-800 text-lg"
              />
              <button onClick={() => setSearchTerm(searchQuery)}
              className="ml-4 px-6 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 font-medium transition-all">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Room Listings */}
      <main className="container mx-auto px-4 py-8 ">
        <h2 className="text-2xl font-bold mb-6">Featured Rooms</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {getActiveRooms().map(room => (
            <div key={room.roomId} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all hover:scale-105">
              <div className="relative">
                <img
                  src={roomImages[room.roomId]}
                  alt={room.title}
                  className="w-full h-40 object-cover"
                />
                <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-100">
                  <Heart size={16} className="text-gray-500" />
                </button>
              </div>
              <div className="p-3">
                <div className="flex justify-between items-start">
                  <h3 className="text-base font-medium line-clamp-1">{room.title}</h3>
                  <div className="flex items-center">
                    <Star size={14} className="text-yellow-500 mr-1" />
                    <span className="text-sm">{room.rating}</span>
                  </div>
                </div>
                <p className="text-gray-600 text-sm">{room.hostId.address.city}</p>
                <p className="inline-block bg-indigo-100 text-indigo-800 font-medium px-3 py-1 rounded-full text-sm mt-2">{room.roomType}</p>
                <div className="mt-2 pt-2 border-t border-gray-100 flex justify-between items-center">
                  <p className="font-semibold">₹{room.price}<span className="text-gray-500 text-xs">/month</span></p>
                  <Link to={`/viewroom/${room.roomId}`} className="px-2 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 text-xs transition">
                    View
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white p-6 mt-12">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-6 md:mb-0">
              <h3 className="text-xl font-bold mb-2">RoomFinder</h3>
              <p className="text-gray-400">Find your perfect room, anywhere.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h4 className="font-medium mb-3">Company</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-white">About</a></li>
                  <li><a href="#" className="hover:text-white">Careers</a></li>
                  <li><a href="#" className="hover:text-white">Blog</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-3">Support</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-white">Help Center</a></li>
                  <li><a href="#" className="hover:text-white">Contact Us</a></li>
                  <li><a href="#" className="hover:text-white">Safety Center</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-3">Legal</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-white">Terms</a></li>
                  <li><a href="#" className="hover:text-white">Privacy</a></li>
                  <li><a href="#" className="hover:text-white">Cookies</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="pt-8 mt-8 border-t border-gray-700 text-center text-gray-400">
            <p>&copy; 2025 RoomFinder. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;

