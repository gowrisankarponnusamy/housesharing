// import { useParams, useNavigate } from 'react-router-dom';
// import { useEffect, useState } from 'react';
// import axiosInstance from '../../apis/axiosinstance';
// import { API_PATHS } from '../../apis/apipaths';
// const BookRoom = () => {
//   const { roomId } = useParams(); // Room ID from URL
//   const navigate = useNavigate();

//   const [userId, setUserId] = useState(''); // Assume we get it from localStorage or session
//   const [fromDate, setFromDate] = useState('');
//   const [toDate, setToDate] = useState('');
//   const [capacity, setCapacity] = useState(1);

//   const user = JSON.parse(localStorage.getItem("user"));
//   useEffect(() => {
//     console.log(user);
//     if (user) {
//       axiosInstance.get(API_PATHS.USERS.USER_ID(user.userId)).then((res) => {
//         setUserId(res.data.userId);
//       }).catch((err) => {
//         console.error("User ID fetch failed:", err);
//       });
//     }
//   }, []);
//   console.log(user?.userId);

//   const handleBooking = async () => { 
//     const payload = {
//       roomId: {roomId}, // Send roomId as a direct value
//       userId: user, // Send userId as a direct value
//       from: fromDate,
//       to: toDate,
//       noOfPeople: capacity,
//     };
  
//     console.log(payload); // Debugging payload
  
//     try {
//       const res = await axiosInstance.post(API_PATHS.BOOKINGS.BOOK_ROOM, payload);
//       alert("Room booked successfully!");
//       navigate(`/viewroom/${roomId}`); // Redirect to booking history or another page
//     } catch (err) {
//       console.error("Booking failed:", err);
//       alert(err?.response?.data?.message || "Booking failed. Please try again.");
//     }
//   };

//   return (
//     <div className="p-6 max-w-md mx-auto bg-white rounded shadow">
//       <h2 className="text-xl font-bold mb-4">Book Room</h2>

//       <div className="mb-3">
//         <label className="block">From Date</label>
//         <input type="date" className="border p-2 w-full" value={fromDate} onChange={e => setFromDate(e.target.value)} />
//       </div>

//       <div className="mb-3">
//         <label className="block">To Date</label>
//         <input type="date" className="border p-2 w-full" value={toDate} onChange={e => setToDate(e.target.value)} />
//       </div>

//       <div className="mb-3">
//         <label className="block">Capacity</label>
//         <input type="number" className="border p-2 w-full" value={capacity} onChange={e => setCapacity(e.target.value)} />
//       </div>

//       <button onClick={handleBooking} className="bg-blue-600 text-white px-4 py-2 rounded">
//         Book Now
//       </button>
//     </div>
//   );
// };

import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axiosInstance from '../../apis/axiosinstance';
import { API_PATHS } from '../../apis/apipaths';

// Helper function to format dates without timezone issues
const formatDateForInput = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// Custom Calendar Component
const CustomCalendar = ({ 
  bookedDates, 
  selectedFromDate, 
  selectedToDate, 
  onFromDateSelect, 
  onToDateSelect,
  isSelecting 
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [calendarDays, setCalendarDays] = useState([]);
  
  useEffect(() => {
    generateCalendarDays();
  }, [currentMonth, bookedDates, selectedFromDate, selectedToDate]);
  
  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    // Get first day of the month
    const firstDay = new Date(year, month, 1);
    const startingDay = firstDay.getDay(); // 0 = Sunday, 1 = Monday, etc.
    
    // Get days in month
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    // Generate days array
    const days = [];
    
    // Add empty slots for days before the first of the month
    for (let i = 0; i < startingDay; i++) {
      days.push({ date: null, empty: true });
    }
    
    // Add days of the month
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    for (let i = 1; i <= daysInMonth; i++) {
      const currentDate = new Date(year, month, i);
      const dateStr = formatDateForInput(currentDate);
      
      // Check if date is booked
      const isBooked = bookedDates.includes(dateStr);
      
      // Check if date is in past
      const isPast = currentDate < today;
      
      // Check if date is selected
      const isFromDate = selectedFromDate === dateStr;
      const isToDate = selectedToDate === dateStr;
      const isInRange = selectedFromDate && selectedToDate && 
                        dateStr >= selectedFromDate && 
                        dateStr <= selectedToDate;
      
      days.push({
        date: currentDate,
        dateStr,
        day: i,
        isBooked,
        isPast,
        isFromDate,
        isToDate,
        isInRange,
        isDisabled: isBooked || isPast
      });
    }
    
    setCalendarDays(days);
  };
  
  const goToPrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };
  
  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };
  
  const handleDateClick = (day) => {
    // console.log('Selected date:', day.date, 'Formatted as:', day.dateStr);
    if (day.isDisabled) return;
    
    if (isSelecting === 'from') {
      onFromDateSelect(day.dateStr);
    } else if (isSelecting === 'to') {
      // Don't allow to-date before from-date
      if (selectedFromDate && day.dateStr < selectedFromDate) return;
      onToDateSelect(day.dateStr);
    }
  };
  
  return (
    <div className="bg-white p-4 rounded-lg border border-indigo-100 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <button 
          onClick={goToPrevMonth} 
          className="p-1 rounded-full hover:bg-indigo-100 text-indigo-800 focus:outline-none"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </button>
        <h3 className="text-indigo-800 font-medium">
          {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </h3>
        <button 
          onClick={goToNextMonth} 
          className="p-1 rounded-full hover:bg-indigo-100 text-indigo-800 focus:outline-none"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      
      <div className="grid grid-cols-7 gap-1 text-center text-xs text-indigo-700 font-medium mb-2">
        <div>Sun</div>
        <div>Mon</div>
        <div>Tue</div>
        <div>Wed</div>
        <div>Thu</div>
        <div>Fri</div>
        <div>Sat</div>
      </div>
      
      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((day, index) => (
          <div 
            key={index} 
            onClick={() => day.date && handleDateClick(day)}
            className={`h-8 flex items-center justify-center text-sm rounded cursor-pointer
              ${day.empty ? 'invisible' : ''}
              ${day.isDisabled ? 'text-gray-300 cursor-not-allowed bg-gray-50' : 'hover:bg-indigo-50'}
              ${day.isFromDate ? 'bg-indigo-600 text-white hover:bg-indigo-700' : ''}
              ${day.isToDate ? 'bg-indigo-600 text-white hover:bg-indigo-700' : ''}
              ${day.isInRange && !day.isFromDate && !day.isToDate ? 'bg-indigo-100' : ''}
              ${day.isBooked ? 'line-through' : ''}
            `}
            title={day.isBooked ? 'Already Booked' : day.isPast ? 'Past Date' : ''}
          >
            {day.day}
          </div>
        ))}
      </div>
      
      <div className="mt-3 flex items-center text-xs">
        <span className="flex items-center mr-3">
          <span className="w-3 h-3 bg-indigo-600 rounded-full mr-1"></span>
          <span>Selected</span>
        </span>
        <span className="flex items-center mr-3">
          <span className="w-3 h-3 bg-indigo-100 rounded-full mr-1"></span>
          <span>In Range</span>
        </span>
        <span className="flex items-center">
          <span className="w-3 h-3 bg-gray-50 rounded-full mr-1 line-through"></span>
          <span>Booked</span>
        </span>
      </div>
    </div>
  );
};

// Main BookRoom Component
const BookRoom = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();

  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [capacity, setCapacity] = useState(1);
  const [bookedDates, setBookedDates] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [dateError, setDateError] = useState('');
  const [isSelecting, setIsSelecting] = useState('from'); // 'from' or 'to'
  const [roomDetails, setRoomDetails] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));
  
  useEffect(() => {
    const fetchRoomDetails = async () => {
      try {
        const response = await axiosInstance.get(`${API_PATHS.ROOMS.GET_ROOM_BY_ID}/${roomId}`);
        setRoomDetails(response.data);
      } catch (error) {
        console.error("Failed to fetch room details", error);
      }
    };
    
    const fetchBookedDates = async () => {
      setIsLoading(true);
      try {
        const response = await axiosInstance.get(`${API_PATHS.BOOKINGS.MY_BOOKING_ID(roomId)}`);
        
        const allBookedDates = [];
        response.data.forEach(booking => {
          if (booking.status === "BOOKED") {
            const start = new Date(booking.from);
            const end = new Date(booking.to);
            
            const currentDate = new Date(start);
            while (currentDate <= end) {
              allBookedDates.push(formatDateForInput(new Date(currentDate)));
              currentDate.setDate(currentDate.getDate() + 1);
            }
          }
        });
        
        setBookedDates(allBookedDates);
      } catch (error) {
        console.error("Failed to fetch bookings", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (roomId) {
      fetchRoomDetails();
      fetchBookedDates();
    }
  }, [roomId]);

  const handleFromDateSelect = (dateStr) => {
    // console.log('From date selected:', dateStr);
    setFromDate(dateStr);
    setIsSelecting('to');
    
    // If to-date is before the new from-date, clear it
    if (toDate && toDate < dateStr) {
      setToDate('');
    }
    
    // Clear any existing error
    setDateError('');
  };
  
  const handleToDateSelect = (dateStr) => {
    // console.log('To date selected:', dateStr);
    setToDate(dateStr);
    setIsSelecting('from'); // Reset selection mode
    
    // Clear any existing error
    setDateError('');
  };

  const validateDateRange = () => {
    if (!fromDate || !toDate) {
      setDateError("Please select both check-in and check-out dates");
      return false;
    }

    const startDate = new Date(fromDate);
    const endDate = new Date(toDate);
    
    // Check each day in the range to ensure none are booked
    const currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      const dateStr = formatDateForInput(currentDate);
      if (bookedDates.includes(dateStr)) {
        setDateError("Your selected date range includes already booked dates. Please choose different dates.");
        return false;
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }

    // Clear any existing error
    setDateError("");
    return true;
  };

  const handleBooking = async () => {
    if (!validateDateRange()) {
      return;
    }

    setIsLoading(true);
    
    const payload = {
      roomId: { roomId: parseInt(roomId) },
      userId: { userId: user.userId },
      from: fromDate,
      to: toDate,
      noOfPeople: parseInt(capacity),
      status: "BOOKED"
    };
  
    try {
      const res = await axiosInstance.post(API_PATHS.BOOKINGS.BOOK_ROOM, payload);
      alert("Room booked successfully!");
      navigate(`/viewroom/${roomId}`);
    } catch (err) {
      console.error("Booking failed:", err);
      if (err.response && err.response.status === 400) {
        setDateError("This room is already booked for these dates. Please select different dates.");
      } else {
        setDateError(err?.response?.data?.message || "Booking failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-indigo-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 space-y-6 border border-indigo-100">
        <div className="text-center">
          <h2 className="text-2xl font-extrabold text-indigo-800 mb-2">Book Your Room</h2>
          {roomDetails && (
            <p className="text-sm text-indigo-500 mb-2">
              {roomDetails.roomName} - {roomDetails.city}
            </p>
          )}
          <p className="text-xs text-gray-500">
            Select your check-in and check-out dates below
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center p-6">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-600"></div>
          </div>
        ) : (
          <>
            <div className="flex justify-center mb-4">
              <div className="p-2 bg-indigo-100 rounded-lg inline-flex text-sm">
                <button 
                  onClick={() => setIsSelecting('from')} 
                  className={`px-3 py-1 rounded ${isSelecting === 'from' ? 'bg-indigo-600 text-white' : 'text-indigo-800'}`}
                >
                  Select Check-in
                </button>
                <button 
                  onClick={() => setIsSelecting('to')} 
                  className={`px-3 py-1 rounded ${isSelecting === 'to' ? 'bg-indigo-600 text-white' : 'text-indigo-800'}`}
                >
                  Select Check-out
                </button>
              </div>
            </div>

            {dateError && (
              <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded text-sm">
                {dateError}
              </div>
            )}

            <CustomCalendar 
              bookedDates={bookedDates}
              selectedFromDate={fromDate}
              selectedToDate={toDate}
              onFromDateSelect={handleFromDateSelect}
              onToDateSelect={handleToDateSelect}
              isSelecting={isSelecting}
            />

            <div className="space-y-5">
              <div className="flex space-x-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-indigo-700 mb-1">Check-in</label>
                  <div className="p-2 border border-indigo-300 rounded-md bg-gray-50 text-sm">
                    {fromDate ? new Date(fromDate).toLocaleDateString() : 'Not selected'}
                  </div>
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-indigo-700 mb-1">Check-out</label>
                  <div className="p-2 border border-indigo-300 rounded-md bg-gray-50 text-sm">
                    {toDate ? new Date(toDate).toLocaleDateString() : 'Not selected'}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-indigo-700 mb-1">Number of Guests</label>
                <input 
                  type="number" 
                  min="1"
                  className="appearance-none block w-full px-3 py-2 border border-indigo-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  value={capacity} 
                  onChange={e => setCapacity(e.target.value)} 
                />
              </div>
            </div>

            <div>
              <button 
                onClick={handleBooking} 
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200 disabled:bg-indigo-300 disabled:cursor-not-allowed"
                disabled={isLoading || !fromDate || !toDate}
              >
                {isLoading ? 'Processing...' : 'Confirm Booking'}
              </button>
            </div>

            <div className="text-center">
              <button 
                onClick={() => navigate(`/viewroom/${roomId}`)} 
                className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
              >
                Return to Room Details
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BookRoom;