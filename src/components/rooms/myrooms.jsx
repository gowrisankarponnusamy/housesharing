import React, { useEffect, useState } from "react";
import axiosInstance from "../../apis/axiosinstance";
import { API_PATHS } from "../../apis/apipaths";

const MyRooms = () => {
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
      const userData = JSON.parse(localStorage.getItem("user"));
      const userId = userData?.userId;
  
      if (userId) {
        axiosInstance
          .get(`/rooms/myrooms/${userId}`)
          .then((res) => {
            setRooms(res.data);
          })
          .catch((err) => {
            console.error("Failed to fetch rooms:", err);
          });
      } else {
        console.warn("User not logged in or user data missing.");
      }
    }, []);
  
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Posted Rooms</h2>
      {rooms.length === 0 ? (
        <p className="text-gray-500">You haven’t posted any rooms yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {rooms.map((room) => (
            <div key={room.roomid} className="bg-white shadow-md rounded-xl overflow-hidden">
              <img
                src={room.imageUrl}
                alt={room.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold">{room.title}</h3>
                <p className="text-gray-600 mt-1">₹{room.price} / month</p>
                <div className="flex justify-between items-center mt-4">
                  <button className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600">
                    Edit
                  </button>
                  <button className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyRooms;
