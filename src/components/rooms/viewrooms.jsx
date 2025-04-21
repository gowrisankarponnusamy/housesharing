import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axiosInstance from '../../apis/axiosinstance';
import { API_PATHS } from '../../apis/apipaths';
import { ArrowLeft, Heart,Menu,User } from 'lucide-react';

const ViewRoom = () => {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const navigate=useNavigate();
  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const res = await axiosInstance.get(`${API_PATHS.ROOMS.GET_ROOM_BY_ID}/${id}`);
        setRoom(res.data);
      } catch (err) {
        console.error('Error fetching room:', err);
      }
    };

    fetchRoom();
  }, [id]);

  if (!room) return <div className="p-8">Loading...</div>;

  return (
    <div className="p-0">
        <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-9xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="text-2xl font-bold text-blue-600">RoomFinder</div>

          <div className="relative">
            <button
              className="flex items-center space-x-2 p-2 rounded-full border border-gray-300"
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
            >
              <Menu size={18} className="text-gray-600" />
              <div className="bg-blue-500 rounded-full p-1">
                <User size={18} className="text-white" />
              </div>
            </button>

            {isProfileMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                <div className="p-3 border-b border-gray-200">
                  <p className="font-medium">John Doe</p>
                  <p className="text-sm text-gray-500">john.doe@example.com</p>
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
      <div className="flex justify-between items-start">
        <button className="p-2 bg-white rounded-full shadow ml-8 mt-3" onClick={() =>navigate('/home')}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
       
        <div className="flex-1 ml-4 mt-4">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Image section */}
            <div className="w-full md:w-1/2 relative">
              <img
                src={room.image || "https://placehold.co/400x240?text=Room+Image"}
                alt={room.title}
                className="rounded-lg w-full object-cover h-60"
              />
              <button className="absolute top-3 left-3 bg-white p-2 rounded-full shadow">
                <Heart className="text-gray-500" />
              </button>
            </div>

            {/* Details section */}
            <div className="w-full md:w-1/2">
              <h2 className="text-2xl font-bold">{room.title}</h2>
              <p className="text-green-600 font-medium">{room.type}</p>
              <p className="text-xl font-semibold mt-2">₹ {room.price}</p>
              <p className="text-gray-500 text-sm">For 1 Day</p>

              <div className="mt-4 flex gap-2">
                <input type="date" className="border rounded px-2 py-1" />
                <input type="date" className="border rounded px-2 py-1" />
              </div>
              <button onClick={() => navigate(`/book/${id}`)} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">
                Book Now
              </button>

              <details className="mt-4">
                <summary className="font-medium cursor-pointer">Description</summary>
                <p className="text-sm mt-2">{room.descriptionOfRoom}</p>
              </details>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="mt-12">
            <h3 className="text-lg font-semibold mb-4">Latest Reviews</h3>
            {/* Add reviews listing here */}
            <button className="px-4 py-2 bg-blue-600 text-white rounded">Add Review</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewRoom;
