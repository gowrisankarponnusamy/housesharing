// src/routes/AppRoutes.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../components/home';
import Profile from '../components/profile';
import Login from '../components/login'; 
import Addrooms from '../components/rooms/addrooms';
import Register from '../components/register';
import ViewRoom from '../components/rooms/viewrooms';
import EditProfile from '../components/editprofile';
import MyRooms from '../components/rooms/myrooms';
import Booking from '../components/rooms/booking';
import MyBooking from '../components/rooms/mybookings';
import '../styles/home.css'; // Ensure this path is correct
import RoomRentalLandingPage from '../components/landingpage';
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<RoomRentalLandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/home" element={<Home />} />
      <Route path="/favourites" element={<Home />}></Route>
      <Route path="/add" element={<Addrooms/>}></Route>
      <Route path="/reg" element={<Register/>}></Route>
      <Route path="/viewroom/:id" element={<ViewRoom/>}></Route>
      <Route path="/editprofile" element={<EditProfile/>}></Route>
      <Route path="/myroom" element={<MyRooms/>}></Route>
      <Route path="/book/:roomId" element={<Booking/>}/>
      <Route path="/bookings" element={<MyBooking/>}/>
    </Routes>
  );
};

export default AppRoutes;
