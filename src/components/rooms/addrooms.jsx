import {useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { API_PATHS } from '../../apis/apipaths';
import axiosInstance from '../../apis/axiosinstance';
const AddRooms = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [formData, setFormData] = useState({
        "room_id": '',
        "hostId": '',
        "numberOfGuests": '',
        "availabilty": true,
        "descriptionOfRoom": '',
        "title": '',
        "price": '',
        "roomType":'',
      })
      useEffect(() => {
        const stored = localStorage.getItem("user");
        if (stored && stored !== "undefined") {
          const user = JSON.parse(stored);
          if (user?.userId) {
            setFormData((prevData) => ({
              ...prevData,
              hostId: user.userId,
            }));
          }
        }
      }, []);
      
      const handleSubmit = async (e) => {
        e.preventDefault();
      
        const payload = {
          ...formData,
          numberOfGuests: parseInt(formData.numberOfGuests),
          price: parseFloat(formData.price),
          availabilty: Boolean(formData.availabilty),
          hostId: parseInt(formData.hostId),
          roomType:String(formData.roomType)
        };
      
        try {
          const response = await axiosInstance.post(API_PATHS.ROOMS.ADD, payload);
          console.log("Room added successfully:", response.data);
          setSuccessMessage("Room added successfully!");
          navigate("/add");
          setTimeout(() => {
            window.location.reload(); // reloads the page
          }, 1000);
        }
         
        catch (error) {
          setErrorMessage("Failed to add room. Please check your inputs.");
          console.log("Payload data: ", payload);
          console.error("Error adding room:", error.response?.data || error.message);
        }
      };
      

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="min-h-screen flex bg-gray-100">
        {/* Back arrow button */}
        <button 
          onClick={() => navigate('/profile')} 
          className="absolute top-6 left-6 z-30 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition duration-300"
          aria-label="Go back"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
      </div>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-xl space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">Add Room</h2>
        <input
          type="hidden"
          value={formData.hostId}
          readOnly
          name="hostId"
        />
        <div>
          <label className="block font-semibold text-gray-700 mb-1">Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Enter the title"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Room Type</label>
        <div className="flex gap-4">
          {['AC', 'NON_AC', 'LUXARY'].map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setFormData({ ...formData, roomType: type })}
              className={`px-6 py-2 rounded-lg border transition-all duration-200 
                ${formData.roomType === type
                  ? 'bg-blue-500 text-white border-blue-500'
                  : 'bg-white text-gray-800 border-gray-300 hover:border-blue-400'}`}
            >
              <span>{type}</span>
            </button>
          ))}
        </div>
      </div>
        <div>
          <label className="block font-semibold text-gray-700 mb-1">Capacity</label>
          <input
            type="number"
            min={1}
            max={10000000}
            value={formData.numberOfGuests}
            onChange={(e) => setFormData({ ...formData, numberOfGuests: e.target.value })}
            placeholder="Enter capacity"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-1">Price</label>
          <input
            type="number"
            min={1}
            max={10000000}
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            placeholder="Enter price"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-1">Description</label>
          <textarea
            placeholder="Type here..."
            rows="3"
            value={formData.descriptionOfRoom}
            onChange={(e) => setFormData({ ...formData, descriptionOfRoom: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          ></textarea>
        </div>

        {/* <div>
        <label
            htmlFor="imageUpload"
            className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-blue-400 rounded-lg cursor-pointer bg-blue-50 hover:bg-blue-100 transition"
        >
            <svg
            className="w-10 h-10 text-blue-500 mb-2"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 15a4 4 0 004 4h10a4 4 0 004-4M7 10l5-5 5 5M12 15V3"
            />
            </svg>
            <p className="text-sm text-blue-600">Click to upload or drag & drop</p>
            <p className="text-xs text-gray-400 mt-1">PNG, JPG, JPEG </p>
            <input
            id="imageUpload"
            type="file"
            accept="image/*"
            className="hidden"
            />
        </label>
        </div> */}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Add
        </button>
      </form>
      {successMessage && (
        <div className="absolute top-4 w-full max-w-xl bg-green-100 text-green-800 px-4 py-2 rounded-lg text-center shadow-md">
          {successMessage}
        </div>
      )}
      {errorMessage && (
        <div className="absolute top-4 w-full max-w-xl bg-red-100 text-red-800 px-4 py-2 rounded-lg text-center shadow-md">
          {errorMessage}
        </div>
      )}

    </div>
  );  
};

export default AddRooms;
