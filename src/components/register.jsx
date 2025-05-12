import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import pro from '../images/key.jpg'
import axiosInstance from '../apis/axiosinstance';
import { API_PATHS } from '../apis/apipaths';
import { FaUser, FaPhoneAlt, FaEnvelope, FaLock, FaMapMarkerAlt } from 'react-icons/fa'; // Importing icons

const Register = () => {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [formData, setFormData] = useState({
      "firstName": '',
      "lastName": '',
      "phNo": '',
      "email": '',
      "password": '',
      "confirmPassword": '',
      "address": {
        "hNo": '',
        "city": '',
        "add1": '',
        "add2": '',
        "state": '',
        "zipCode": '',
      }
    })
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
      const { name, value } = e.target;
      if (name in formData.address) {
        setFormData((prev) => ({
          ...prev,
          address: {
            ...prev.address,
            [name]: value,
          }
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          [name]: value
        }));
      }
    }

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        if (formData.password !== formData.confirmPassword) {
          setMessage("Passwords do not match");
          return;
        }
        const response = await axiosInstance.post(API_PATHS.USERS.ADD_USER, formData);
        setSuccessMessage("Registered successfully");
        setTimeout(() => {
          window.location.reload(); // reloads the page
        }, 1000);
        navigate("/")
      }
      catch (error) {
        setErrorMessage("Enter the correct details")
        console.error("Error adding room:", error.response?.data || error.message);
      }
    };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Left side with form */}
      <div className="w-full lg:w-2/3 flex items-center justify-center p-4 md:p-8 ">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-4xl space-y-4 object-cover transition-transform duration-300 ease-in-out hover:scale-105"
        >
          <div className="flex justify-center mb-6">
            <div className="p-3 bg-indigo-100 rounded-full">
              <FaUser className="h-10 w-10 text-indigo-500" />
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Create Your Account</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">First Name</label>
              <div className="flex items-center border rounded-lg">
                <FaUser className="ml-2 text-gray-400" />
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Your first name"
                  className="w-full px-4 py-2 focus:ring-0 focus:outline-none"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Last Name</label>
              <div className="flex items-center border rounded-lg">
                <FaUser className="ml-2 text-gray-400" />
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Your last name"
                  className="w-full px-4 py-2 focus:ring-0 focus:outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Phone Number</label>
              <div className="flex items-center border rounded-lg">
                <FaPhoneAlt className="ml-2 text-gray-400" />
                <input
                  type="tel"
                  name="phNo"
                  value={formData.phNo}
                  onChange={handleChange}
                  placeholder="1234567890"
                  pattern="[0-9]{10}"
                  maxLength={10}
                  className="w-full px-4 py-2 focus:ring-0 focus:outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
              <div className="flex items-center border rounded-lg">
                <FaEnvelope className="ml-2 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  placeholder="abc@gmail.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 focus:ring-0 focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
              <div className="relative flex items-center border rounded-lg">
                <FaLock className="ml-2 text-gray-400" />
                <input
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 focus:ring-0 focus:outline-none"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Confirm Password</label>
              <div className="relative flex items-center border rounded-lg">
                <FaLock className="ml-2 text-gray-400" />
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Enter password again"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-2 focus:ring-0 focus:outline-none"
                  required
                />
              </div>
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-semibold text-gray-700 mb-1">Address</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center border rounded-lg">
                <FaMapMarkerAlt className="ml-2 text-gray-400" />
                <input
                  type="text"
                  name="hNo"
                  value={formData.address.hNo}
                  onChange={handleChange}
                  placeholder="House no"
                  className="w-full px-4 py-2 focus:ring-0 focus:outline-none"
                />
              </div>
              <div className="flex items-center border rounded-lg">
                <FaMapMarkerAlt className="ml-2 text-gray-400" />
                <input
                  type="text"
                  name="city"
                  value={formData.address.city}
                  onChange={handleChange}
                  placeholder="City/Town/Village"
                  className="w-full px-4 py-2 focus:ring-0 focus:outline-none"
                />
              </div>
            </div>
          </div>

          <textarea
            name="add1"
            value={formData.address.add1}
            onChange={handleChange}
            placeholder="Address 1 (area and street)"
            className="w-full px-4 py-2 min-h-[80px] border rounded-lg focus:ring-0 focus:outline-none"
          ></textarea>

          <textarea
            name="add2"
            value={formData.address.add2}
            onChange={handleChange}
            placeholder="Address 2 (area and street)"
            className="w-full px-4 py-2 min-h-[80px] border rounded-lg focus:ring-0 focus:outline-none"
          ></textarea>
          {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4"></div> */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
            <input
              type="text"
              name="zipCode"
              value={formData.address.zipCode}
              onChange={handleChange}
              placeholder="Pincode"
              className="w-full px-4 py-2 focus:ring-0 focus:outline-none border rounded-lg"
            />
            <select 
              name="state"
              value={formData.address.state}
              onChange={handleChange}
              className="w-full px-4 py-2 focus:ring-0 focus:outline-none text-gray-500 border rounded-lg"
            >
              <option value="">--Select State--</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Delhi">Delhi</option>
            </select>
          </div>

          {message && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <span className="block sm:inline">{message}</span>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-indigo-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-600 transition duration-300"
          >
            CREATE ACCOUNT
          </button>
          
          <p className="text-center text-gray-500 mt-4">
            Already have an account?{" "}
            <a
              onClick={() => navigate('/')}
              className="text-indigo-500 hover:underline font-medium cursor-pointer"
            >
              Login here
            </a>
          </p>
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

      {/* Right side with decorative image */}
      <div className="hidden lg:flex lg:w-1/2 bg-indigo-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-indigo-700 opacity-30 z-10"></div>
        <img 
          src={pro}
          alt="Room rental illustration" 
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-105"
        />
        <div className="absolute bottom-12 left-12 z-20 text-white">
          <h2 className="text-3xl font-bold mb-2">Create Account</h2>
          <p className="text-lg opacity-90">Join our community today</p>
        </div>
      </div>
    </div>
  )
}

export default Register;
