// import { Navigate, useNavigate, useParams,Link } from 'react-router-dom';
// import { useEffect, useState } from 'react';
// import axiosInstance from '../../apis/axiosinstance';
// import { API_PATHS } from '../../apis/apipaths';
// import { ArrowLeft, Heart,Menu,User } from 'lucide-react';

// const ViewRoom = () => {
//   const { id } = useParams();
//   const [room, setRoom] = useState(null);
//   const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
//   const navigate=useNavigate();
//   const [showReviewForm, setShowReviewForm] = useState(false);
//   const [user, setUser] = useState(null);
//   const [reviewText,setReviewText]=useState('');
//   const [starss,setstarss]=useState('');
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
//   const checkBookingStatus = async (userId, roomId) => {
//     try {
//         const response = await axiosInstance.get(`/bookings/user/${userId}`);
//         console.log(response.data);
//         const bookings = response.data;
//         return bookings.some(booking => 
//           parseInt(booking.roomId?.roomId) === parseInt(roomId));
//     } catch (error) {
//         console.error("Error checking booking status:", error);
//         return false;
//     }
// };
// const handleAddReview = async (userId, roomId) => {
//   const hasBooked = await checkBookingStatus(userId, roomId);
//   if (!hasBooked) {
//       alert("You must book the room before leaving a review.");
//       return;
//   }

//   // Open the review form container/modal
//   setShowReviewForm(true);  // Assuming you're using state management like React's useState
// };

// const handleSubmitReview = async (reviewData) => {
//   try {
//     console.log(reviewData);
//       const response = await axiosInstance.post('/reviews/add', reviewData);
      
//       if (response.status === 200) {
//           alert("Review added successfully!");
//           setShowReviewForm(false);  // Close the review form after submission
//       } else {
//           alert("Failed to add review. Please try again.");
//       }
//   } catch (error) {
//       console.error("Error posting review:", error);
//       alert("An error occurred while posting the review.");
//   }
// };


//   useEffect(() => {
//     const fetchRoom = async () => {
//       try {
//         const res = await axiosInstance.get(`${API_PATHS.ROOMS.GET_ROOM_BY_ID}/${id}`);
//         setRoom(res.data);
//       } catch (err) {
//         console.error('Error fetching room:', err);
//       }
//     };

//     fetchRoom();
//   }, [id]);

//   if (!room) return <div className="p-8">Loading...</div>;

//   return (
//     <div className="p-0">
//         <header className="bg-white shadow-sm sticky top-0 z-50">
//         <div className="max-w-9xl mx-auto px-4 py-3 flex justify-between items-center">
//           <div className="text-2xl font-bold text-blue-600">RoomFinder</div>

//           <div className="relative">
//             <button
//               className="flex items-center space-x-2 p-2 rounded-full border border-gray-300"
//               onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
//             >
//               <Menu size={18} className="text-gray-600" />
//               <div className="bg-blue-500 rounded-full p-1">
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
//       <div className="flex justify-between items-start">
//         <button className="p-2 bg-white rounded-full shadow ml-8 mt-3" onClick={() =>navigate(-1)}>
//         <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
//           </svg>
//         </button>
       
//         <div className="flex-1 ml-4 mt-4">
//           <div className="flex flex-col md:flex-row gap-6">
//             {/* Image section */}
//             <div className="w-full md:w-1/2 relative">
//               <img
//                 src={room.image || "https://placehold.co/400x240?text=Room+Image"}
//                 alt={room.title}
//                 className="rounded-lg w-full object-cover h-60"
//               />
//               <button className="absolute top-3 left-3 bg-white p-2 rounded-full shadow">
//                 <Heart className="text-gray-500" />
//               </button>
//             </div>

//             {/* Details section */}
//             <div className="w-full md:w-1/2">
//               <h2 className="text-2xl font-bold">{room.title}</h2>
//               <p className="text-green-600 font-medium">{room.roomType}</p>
//               <p className="text-xl font-semibold mt-2">₹ {room.price}</p>
//               <p className="text-gray-500 text-sm">For 1 Day</p>
//               <p className="text-black-700 text-l mt-2"><span className='font-bold'>Host Name:</span>  {user.firstName}{" "}{user.lastName}</p>
//               <p className="text-black-700 text-l mt-2"><span className='font-bold'>Host Number:</span>  {user.phNo}</p>
//               <p className='font-bold text-xl'>{user.address.city}</p>
//               <button onClick={() => navigate(`/book/${id}`)} className="mt-2 px-4 py-2 bg-blue-600 text-white rounded">
//                 Book Now
//               </button>

//               {/* <details className="mt-4">
//                 <summary className="font-medium cursor-pointer">Description</summary>
//                 <p className="text-sm mt-2">{room.descriptionOfRoom}</p>
//               </details> */}
//             </div>
//           </div>

//           {/* Reviews Section */}
//           <div className="mt-12">
//           <details className="mt-4">
//                 <summary className="font-medium cursor-pointer">Description</summary>
//                 <p className="text-m mt-2 ml-6">{room.descriptionOfRoom}</p>
//               </details>
//             <p className='font-bold text-xl'>{user.address.hNo}{","}{user.address.add1}{","}{user.address.add2}{","}{user.address.city}{","}{user.address.state}{"-"}{user.address.zipCode}</p> 
//             <h3 className="text-lg font-semibold mb-4 mt-4">Latest Reviews</h3>
//             {/* Add reviews listing here */}
//             {/* "hNo":"16","add1":"plot 16","add2":"nagar","city":"chennai","state":"Tamil Nadu","zipCode":600075 */}
//             {user && room && (
//               <button 
//                 onClick={() => handleAddReview(user?.userId, id)} 
//                 className="mt-4 px-4 py-2 bg-green-600 text-white rounded"
//               >
//                 Add Review
//               </button>
//             )}
//             {showReviewForm && (
//               <div className="review-form-container">
//                   <h3>Leave a Review</h3>
//                   <textarea 
//                       placeholder="Write your review here..." 
//                       value={reviewText} 
//                       onChange={e => setReviewText(e.target.value)}
//                   />
//                   <input 
//                       type="number" 
//                       placeholder="starss (1-5)" 
//                       value={starss} 
//                       onChange={e => setstarss(e.target.value)}
//                       min="1" max="5"
//                   />
//                   <button onClick={() => handleSubmitReview({roomId:{roomId: id},reviewerId:user, stars:starss, review: reviewText })}>
//                       Submit Review
//                   </button>
//               </div>
//           )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

//  export default ViewRoom;

//new
import { Navigate, useNavigate, useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axiosInstance from '../../apis/axiosinstance';
import { API_PATHS } from '../../apis/apipaths';
import { ArrowLeft, Heart, Menu, User, Star } from 'lucide-react';

const ViewRoom = () => { 
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [user, setUser] = useState(null);
  const [reviewText, setReviewText] = useState('');
  const [starss, setstarss] = useState('');
  const [image, setImage] = useState('');
  const [review,setReview]=useState('');
  useEffect(() => {
    const user = localStorage.getItem("user");
    // console.log("Raw user from localStorage:", user);
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

  const checkBookingStatus = async (userId, roomId) => {
    try {
      const response = await axiosInstance.get(`/bookings/user/${userId}`);
      console.log(response.data);
      
      const bookings = response.data;
      return bookings.some(booking => 
        parseInt(booking.roomId?.roomId) === parseInt(roomId));
    } catch (error) {
      console.error("Error checking booking status:", error);
      return false;
    }
  };
  
  const handleAddReview = async (userId, roomId) => {
    const hasBooked = await checkBookingStatus(userId, roomId);
    if (!hasBooked) {
      alert("You must book the room before leaving a review.");
      return;
    }
    setShowReviewForm(true);
  };

  const handleSubmitReview = async (reviewData) => {
    try {
      // console.log(reviewData);
      const response = await axiosInstance.post('/reviews/add', reviewData);
      
      if (response.status === 200) {
        alert("Review added successfully!");
        setShowReviewForm(false);
      } else {
        alert("Failed to add review. Please try again.");
      }
    } catch (error) {
      console.error("Error posting review:", error);
      alert("An error occurred while posting the review.");
    }
  };

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const res = await axiosInstance.get(`${API_PATHS.ROOMS.GET_ROOM_BY_ID}/${id}`);
        setRoom(res.data);
        const imageResponse = await axiosInstance.get(`${API_PATHS.IMAGES.GET_IMAGE(id)}`);
        setImage(imageResponse.data.imgUrl);
        const reviewResponse = await axiosInstance.get(`${API_PATHS.REVIEWS.GET_REVIEW_BY_ID(id)}`);
        setReview(reviewResponse.data);
        console.log(reviewResponse.data);
      } catch (err) { 
        console.error('Error fetching room:', err);
      }
    };

    fetchRoom();
  }, [id]);

  if (!room) return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <div className="text-lg font-semibold text-gray-700">Loading...</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-9xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-indigo-700">RoomFinder</div>

          <div className="relative">
            <button
              className="flex items-center space-x-2 p-2 rounded-full border border-gray-300 hover:border-indigo-400 transition-colors"
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
            >
              <Menu size={18} className="text-gray-700" />
              <div className="bg-indigo-600 rounded-full p-1">
                <User size={18} className="text-white" />
              </div>
            </button>

            {isProfileMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl z-10 border border-gray-200 overflow-hidden">
                <div className="p-4 border-b border-gray-200 bg-indigo-50">
                  <p className="font-medium text-gray-800">{user?.firstName}</p>
                  <p className="text-sm text-gray-600">{user?.email}</p>
                </div>
                <ul className="py-1">
                  <li><Link to="/profile" className="block px-4 py-2 hover:bg-indigo-50 text-gray-700">Profile</Link></li>
                  <li><Link to="/favorites" className="block px-4 py-2 hover:bg-indigo-50 text-gray-700">Favorites</Link></li>
                  <li><Link to="/bookings" className="block px-4 py-2 hover:bg-indigo-50 text-gray-700">Bookings</Link></li>
                  <li><Link to="/" className="block px-4 py-2 hover:bg-indigo-50 text-red-600 font-medium">Log out</Link></li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex items-center mb-6">
          <button 
            className="p-3 bg-white rounded-full shadow-md hover:bg-indigo-50 transition-colors" 
            onClick={() => navigate(-1)}
          >
            <ArrowLeft size={20} className="text-indigo-600" />
          </button>
          <h1 className="ml-4 text-2xl font-bold text-gray-800">Room Details</h1>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Image section */}
            <div className="w-full md:w-1/2 relative">
              <img
                src={image || "https://placehold.co/400x240?text=Room+Image"}
                alt={room.title}
                className="w-full object-cover h-80 md:h-full"
              />
              <button className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors">
                <Heart className="text-pink-500" size={20} />
              </button>
            </div>

            {/* Details section */}
            <div className="w-full md:w-1/2 p-6">
              <div className="flex flex-col h-full justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">{room.title}</h2>
                  <div className="inline-block bg-indigo-100 text-indigo-800 font-medium px-3 py-1 rounded-full text-sm mt-2">
                    {room.roomType}
                  </div>
                  
                  <div className="mt-4 flex items-end">
                    <span className="text-2xl font-bold text-indigo-700">₹ {room.price}</span>
                    <span className="text-gray-600 text-sm ml-2">For 1 Day</span>
                  </div>
                  
                  <div className="mt-6 space-y-2 border-t pt-4 border-gray-100">
                    <p className="text-gray-800">
                      <span className="font-semibold">Host Name:</span> {room.hostId.firstName} {room.hostId.lastName} 
                    </p>
                    <p className="text-gray-800">
                      <span className="font-semibold">Host Number:</span> {room.hostId.phNo}
                    </p>
                    <p className="text-xl font-semibold text-gray-800 mt-2">{room.hostId.address.city}</p>
                  </div>
                </div>
                
                <button 
                  onClick={() => navigate(`/book/${id}`)} 
                  className="mt-6 w-full px-4 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Description Section */}
        <div className="mt-8 bg-white rounded-xl shadow-md p-6">
          <details className="group">
            <summary className="font-semibold text-lg text-gray-800 cursor-pointer flex items-center">
              <span>Description</span>
              <svg className="ml-2 w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <p className="text-gray-700 mt-4 leading-relaxed">{room.descriptionOfRoom}</p>
          </details>
        </div>

        {/* Address Section */}
        <div className="mt-6 bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Address</h3>
          <p className="text-gray-700">
            {room.hostId.address.hNo}, {room.hostId.address.add1}, {room.hostId.address.add2}, 
            <br />
            {room.hostId.address.city}, {room.hostId.address.state} - {room.hostId.address.zipCode}
          </p>
        </div>

        {/* Reviews Section */}
        <div className="mt-6 bg-white rounded-xl shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-gray-800">Latest Reviews</h3>
            {review && review.length > 0 && (
              <div className="flex items-center">
                <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full flex items-center">
                  <Star size={16} className="text-yellow-500 fill-current mr-1" />
                  <span className="font-medium">
                    {review.reduce((acc, r) => acc + parseFloat(r.stars), 0) / review.length}
                  </span>
                  <span className="text-xs ml-1 text-gray-600">({review.length})</span>
                </div>
              </div>
            )}
          </div>

          {/* Reviews content */}
          <div className={`${review && review.length > 0 ? 'space-y-6' : 'text-center py-8'}`}>
            {review && review.length > 0 ? (
              review.map((rev, index) => (
                <div key={index} className="border-b border-gray-100 pb-6 last:border-0">
                  <div className="flex items-center mb-3">
                    <div className="bg-indigo-100 rounded-full p-2 mr-3">
                      <User size={16} className="text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-gray-800 font-semibold">{rev.reviewerId.firstName} {rev.reviewerId.lastName}</p>
                      <div className="flex items-center mt-1">
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              size={14} 
                              className={i < rev.stars ? "fill-current" : "text-gray-300"}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-gray-500 ml-2">Posted {new Date().toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 pl-11">{rev.review}</p>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center">
                <div className="bg-gray-100 p-4 rounded-full mb-3">
                  <Star size={24} className="text-gray-400" />
                </div>
                <p className="text-gray-400 font-medium">No reviews yet</p>
                <p className="text-gray-400 text-sm">Be the first to review this room</p>
              </div>
            )}
          </div>
          
          {user && room && (
            <button 
              onClick={() => handleAddReview(user?.userId, id)} 
              className="mt-8 w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-lg hover:from-indigo-700 hover:to-indigo-800 transition-colors font-medium flex items-center justify-center shadow-md"
            >
              <Star size={18} className="mr-2" />
              Write a Review
            </button>
          )}
        </div>

        {/* Review Form Modal */}
        {showReviewForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Leave a Review</h3>
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Your Review</label>
                <textarea 
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                  placeholder="Write your review here..." 
                  value={reviewText} 
                  onChange={e => setReviewText(e.target.value)}
                  rows={4}
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Rating (1-5 stars)</label>
                <input 
                  type="number" 
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                  placeholder="Rating (1-5)" 
                  value={starss} 
                  onChange={e => setstarss(e.target.value)}
                  min="1" max="5"
                />
              </div>
              
              <div className="flex justify-end space-x-3">
                <button 
                  onClick={() => setShowReviewForm(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => handleSubmitReview({
                    roomId: {roomId: id},
                    reviewerId: {userId:user?.userId}, 
                    stars: starss, 
                    review: reviewText 
                  })}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Submit Review
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewRoom;