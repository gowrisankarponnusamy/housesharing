import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axiosInstance from '../../apis/axiosinstance';
import { API_PATHS } from '../../apis/apipaths';

const BookRoom = () => {
  const { roomId } = useParams(); // Room ID from URL
  const navigate = useNavigate();

  const [userId, setUserId] = useState(''); // Assume we get it from localStorage or session
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [capacity, setCapacity] = useState(1);

  const userid = localStorage.getItem("user");
  useEffect(() => {
    console.log(userid);
    if (userid) {
      axiosInstance.get(API_PATHS.USERS.USER_ID(userid)).then((res) => {
        setUserId(res.data.userId);
      }).catch((err) => {
        console.error("User ID fetch failed:", err);
      });
    }
  }, []);

  const handleBooking = async () => {
    const payload = {
      roomId: {roomId: parseInt(roomId)}, // Send roomId as a direct value
      userId: {userId: parseInt(userid?.userId)}, // Send userId as a direct value
      from: fromDate,
      to: toDate,
      noOfPeople: capacity,
    };
  
    console.log(payload); // Debugging payload
  
    try {
      const res = await axiosInstance.post(API_PATHS.BOOKINGS.BOOK_ROOM, payload);
      alert("Room booked successfully!");
      navigate("/viewroom"); // Redirect to booking history or another page
    } catch (err) {
      console.error("Booking failed:", err);
      alert(err?.response?.data?.message || "Booking failed. Please try again.");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Book Room</h2>

      <div className="mb-3">
        <label className="block">From Date</label>
        <input type="date" className="border p-2 w-full" value={fromDate} onChange={e => setFromDate(e.target.value)} />
      </div>

      <div className="mb-3">
        <label className="block">To Date</label>
        <input type="date" className="border p-2 w-full" value={toDate} onChange={e => setToDate(e.target.value)} />
      </div>

      <div className="mb-3">
        <label className="block">Capacity</label>
        <input type="number" className="border p-2 w-full" value={capacity} onChange={e => setCapacity(e.target.value)} />
      </div>

      <button onClick={handleBooking} className="bg-blue-600 text-white px-4 py-2 rounded">
        Book Now
      </button>
    </div>
  );
};

export default BookRoom;
