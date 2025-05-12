// import { useEffect, useState } from 'react';
// import { useNavigate,Link } from 'react-router-dom';
// import { Trash2 } from 'lucide-react';
// import axiosInstance from '../../apis/axiosinstance';
// import { API_PATHS } from '../../apis/apipaths';

// const UserBookings = () => {
//   const [bookings, setBookings] = useState([]);
//   const user = JSON.parse(localStorage.getItem('user'));
//   const [successMessage, setSuccessMessage] = useState('');
//   const navigate =useNavigate();
//   useEffect(() => {
//     if (user?.userId) {
//       axiosInstance
//         .get(API_PATHS.BOOKINGS.MY_BOOKING_ID(user.userId))
//         .then((res) => {
//           setBookings(res.data);
//         })
//         .catch((err) => {
//           console.error('Failed to fetch bookings:', err);
//         });
//     }
//   }, []);
//   const handleCancel = (booking) => {
//     axiosInstance
//       .delete(API_PATHS.BOOKINGS.CANCEL_ROOM, { data: booking })
//       .then(() => {
//         setSuccessMessage('Booking cancelled successfully.');
//         setTimeout(() => setSuccessMessage(''), 1500); // hide after 1s
//         axiosInstance
//           .get(API_PATHS.BOOKINGS.MY_BOOKING_ID(user.userId))
//           .then((res) => setBookings(res.data));
//       })
//       .catch((err) => {
//         console.error('Cancel failed:', err);
//       });
//   };
//   return (
//     <div className="p-6 max-w-7xl mx-auto">
        
//         {successMessage && (
//       <div className="mb-4 p-3 bg-green-100 text-green-700 rounded ease-in-out duration-300">
//         {successMessage}
//       </div>
//     )}
    
//       <h2 className="text-2xl text-blue-600 font-bold mb-2">My Bookings</h2>
//       <div className="flex justify-between items-start">
//         <button className="p-2 bg-white rounded-full shadow mb-3" onClick={() =>navigate(-1)}>
//         <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
//           </svg>
//         </button>
//     </div>

//       {bookings.length === 0 ? (
//         <p>No bookings yet.</p>
//       ) : (
//         <div className="space-y-6">
//           {bookings.map((booking) => (
//             <div
//               key={booking.bookingId}
//               className="border p-4 rounded-lg shadow-md flex gap-4 bg-white"
//             >
//               <div className="w-32 h-32 bg-gray-100 rounded-md overflow-hidden">
//                 <img
//                 //   src={booking.room.imageUrl || "https://picsum.photos/150"}
//                   alt="Room"
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//               <div className="flex-grow">
//                 <h3 className="text-xl text-blue-600 font-semibold">{booking.roomId?.title}</h3>
//                 <p className="text-sm text-gray-500">
//                   Type: {booking.roomId?.roomType} | Guests: {booking.noOfPeople}
//                 </p>
//                 <p className="text-sm mt-2">
//                   From: <strong>{new Date(booking.from).toLocaleDateString()}</strong>
//                 </p>
//                 <p className="text-sm mt-2">
//                   To: <strong>{new Date(booking.to).toLocaleDateString()}</strong>
//                 </p>
//                 <p className="text-sm mt-1">Price: ₹{booking.roomId?.price}</p>
//               </div>
//               {/* Optional Cancel button  */}
//               {/* import { Trash2 } from 'lucide-react'; // Make sure you have lucide-react installed */}

//               <div className="flex flex-col items-start gap-2">
//                 <button
//                     onClick={() => handleCancel(booking)}
//                     className="px-2 py-1 mt-4 bg-red-500 text-white rounded hover:bg-red-600 text-x flex items-center gap-1 transition duration-200 ease-in-out"
//                 >
//                     <Trash2 size={16} />
//                     Cancel
//                 </button>
//                 <Link
//                     to={`/viewroom/${booking.roomId?.roomId}`}
//                     className="px-2 py-1 mt-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-s"
//                 >
//                     Details...
//                 </Link>
//                 </div>
//             </div>
//           ))}
//         </div>
//       )}
        
//     </div>
//   );
// };
// export default UserBookings;
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Trash2, ArrowLeft, Calendar, Users, Home } from 'lucide-react';
import axiosInstance from '../../apis/axiosinstance';
import { API_PATHS } from '../../apis/apipaths';

const UserBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem('user'));
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.userId) {
      setLoading(true);
      axiosInstance
        .get(API_PATHS.BOOKINGS.MY_BOOKING_ID(user.userId))
        .then((res) => {
          setBookings(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error('Failed to fetch bookings:', err);
          setLoading(false);
        });
    }
  }, []);

  const handleCancel = (booking) => {
    axiosInstance
      .delete(API_PATHS.BOOKINGS.CANCEL_ROOM, { data: booking })
      .then(() => {
        setSuccessMessage('Booking cancelled successfully.');
        setTimeout(() => setSuccessMessage(''), 2000);
        axiosInstance
          .get(API_PATHS.BOOKINGS.MY_BOOKING_ID(user.userId))
          .then((res) => setBookings(res.data));
      })
      .catch((err) => {
        console.error('Cancel failed:', err);
      });
  };

  const formatDate = (dateString) => {
    const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {successMessage && (
          <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 text-green-700 rounded shadow-sm transition-all ease-in-out duration-300">
            <div className="flex items-center">
              <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              {successMessage}
            </div>
          </div>
        )}

        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            <button 
              className="p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all mr-4" 
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="h-5 w-5 text-blue-600" />
            </button>
            <h1 className="text-3xl font-bold text-gray-800">My Bookings</h1>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-60">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
          </div>
        ) : bookings.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <div className="mb-4 flex justify-center">
              <Calendar className="h-16 w-16 text-gray-300" />
            </div>
            <h3 className="text-xl font-medium text-gray-700 mb-2">No Bookings Yet</h3>
            <p className="text-gray-500 mb-6">You haven't made any room bookings yet.</p>
            <Link 
              to="/rooms" 
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Browse Rooms
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {bookings.map((booking) => (
              <div
                key={booking.bookingId}
                className="border border-gray-200 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow bg-white overflow-hidden"
              >
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="w-full md:w-40 h-40 bg-gray-100 rounded-lg overflow-hidden">
                    <img
                      src={booking.roomId?.imageUrl || "https://via.placeholder.com/150?text=Room"}
                      alt="Room"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-2xl text-blue-600 font-semibold mb-2">{booking.roomId?.title || "Room"}</h3>
                    
                    <div className="flex flex-wrap gap-4 mb-4">
                      <div className="flex items-center text-gray-600">
                        <Home size={16} className="mr-1" />
                        <span>{booking.roomId?.roomType || "Standard"}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Users size={16} className="mr-1" />
                        <span>{booking.noOfPeople} guests</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <p className="text-xs uppercase text-blue-600 font-medium">Check In</p>
                        <p className="text-gray-800 font-medium">
                          {formatDate(booking.from)}
                        </p>
                      </div>
                      <div className="bg-blue-50 p-3 rounded-lg">  
                        <p className="text-xs uppercase text-blue-600 font-medium">Check Out</p>
                        <p className="text-gray-800 font-medium">
                          {formatDate(booking.to)}
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between">
                      <div className="text-lg font-semibold">
                        <span className="text-gray-500">Price:</span> 
                        <span className="text-blue-600 ml-1">₹{booking.roomId?.price}</span>
                      </div>
                      
                      <div className="flex gap-3 mt-2 md:mt-0">
                        <button
                          onClick={() => handleCancel(booking)}
                          className="px-3 py-2 bg-red-50 text-red-600 rounded-md hover:bg-red-100 flex items-center gap-1 transition-colors"
                        >
                          <Trash2 size={16} />
                          <span>Cancel</span>
                        </button>
                        <Link
                          to={`/viewroom/${booking.roomId?.roomId}`}
                          className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserBookings;