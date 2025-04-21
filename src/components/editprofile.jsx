import { useState, useEffect } from 'react';
import axiosInstance from '../apis/axiosinstance';
import { API_PATHS } from '../apis/apipaths';
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phNo: '',
    email: '',
    password: '',
    confirmPassword: '',
    address: {
      hNo: '',
      city: '',
      add1: '',
      add2: '',
      state: '',
      zipCode: ''
    }
  });

  const [message, setMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axiosInstance.get(`${API_PATHS.USERS.GET_USER_BY_ID}/${userId}`);

        // Handle case where address is null or undefined
        const userData = res.data;
        const userAddress = userData.address || {
          hNo: '',
          city: '',
          add1: '',
          add2: '',
          state: '',
          zipCode: ''
        };

        setFormData({
          ...userData,
          password: '',
          confirmPassword: '',
          address: userAddress
        });
      } catch (error) {
        setMessage("Failed to load user data");
        console.error(error);
      }
    };

    if (userId) fetchUser();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name in formData.address) {
      setFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [name]: value
        }
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      await axiosInstance.put(`${API_PATHS.USERS.UPDATE_USER}/${userId}`, formData);
      setSuccessMessage("Profile updated successfully");
      setTimeout(() => navigate("/dashboard"), 2000);
    } catch (error) {
      setMessage("Error updating profile");
      console.error(error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" className="input" />
          <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" className="input" />
          <input type="tel" name="phNo" value={formData.phNo} onChange={handleChange} placeholder="Phone" className="input" />
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="input" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="New Password" className="input" />
          <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm Password" className="input" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" name="hNo" value={formData.address.hNo} onChange={handleChange} placeholder="House No." className="input" />
          <input type="text" name="city" value={formData.address.city} onChange={handleChange} placeholder="City" className="input" />
        </div>

        <textarea name="add1" value={formData.address.add1} onChange={handleChange} placeholder="Address Line 1" className="textarea" />
        <textarea name="add2" value={formData.address.add2} onChange={handleChange} placeholder="Address Line 2" className="textarea" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" name="zipCode" value={formData.address.zipCode} onChange={handleChange} placeholder="Zip Code" className="input" />
          <select name="state" value={formData.address.state} onChange={handleChange} className="input text-gray-600">
            <option value="">--Select State--</option>
            <option value="Tamil Nadu">Tamil Nadu</option>
            <option value="Karnataka">Karnataka</option>
            <option value="Maharashtra">Maharashtra</option>
            <option value="Delhi">Delhi</option>
          </select>
        </div>

        {message && <p className="text-red-500">{message}</p>}
        {successMessage && <p className="text-green-600">{successMessage}</p>}

        <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
