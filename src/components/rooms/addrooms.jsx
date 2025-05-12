// import {useState,useEffect} from 'react';
// import { useNavigate } from 'react-router-dom';
// import { API_PATHS } from '../../apis/apipaths';
// import axiosInstance from '../../apis/axiosinstance';
// const AddRooms = () => {
//   const navigate = useNavigate();
//   const [errorMessage, setErrorMessage] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");
  
//   const [formData, setFormData] = useState({
//         "numberOfGuests": '',
//         "availabilty": true,
//         "descriptionOfRoom": '',
//         "title": '',
//         "price": '',
//         "roomType":'',
//       })
//       const user = JSON.parse(localStorage.getItem("user"));
//       const [imageFile, setImageFile] = useState(null);
//       const [image, setImages] = useState([]);
      
//       const handleSubmit = async (e) => {
//         e.preventDefault();
//         const payload = {
//           ...formData,
//           numberOfGuests: parseInt(formData.numberOfGuests),
//           price: parseFloat(formData.price),
//           availabilty: Boolean(formData.availabilty),
//           hostid: user?.userId,
//           roomType:String(formData.roomType)
//         };
//         console.log(payload);
//         try {
//           const response = await axiosInstance.post(API_PATHS.ROOMS.ADD, payload);
//           const roomId = response.data.roomId; // Assuming backend returns roomId
//           setSuccessMessage("Room added successfully!");

//           // Upload image if selected
//           if (imageFile) {
//             const formDataImg = new FormData();
//             formDataImg.append("file", imageFile);
//             formDataImg.append("roomId", roomId);

//             await axiosInstance.post(API_PATHS.IMAGES.UPLOAD_IMAGES, formDataImg, {
//               headers: {
//                 "Content-Type": "multipart/form-data",
//               },
//             });
//           }
//           console.log("Room added successfully:", response.data);
//           setSuccessMessage("Room added successfully!");
//           navigate("/profile");
//           setTimeout(() => {
//             window.location.reload(); // reloads the page
//           }, 1000);
//         }
        
//         catch (error) {
//           setErrorMessage("Failed to add room. Please check your inputs.");
//           console.log("Payload data: ", payload);
//           console.error("Error adding room:", error.response?.data || error.message);
//         }
//       };
      

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
//       <div className="min-h-screen flex bg-gray-100">
//         {/* Back arrow button */}
//         <button 
//           onClick={() => navigate('/profile')} 
//           className="absolute top-6 left-6 z-30 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition duration-300"
//           aria-label="Go back"
//         >
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
//           </svg>
//         </button>
//       </div>
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-xl space-y-4"
//       >
//         <h2 className="text-2xl font-bold text-center text-gray-800">Add Room</h2>
//         <input
//           type="hidden"
//           value={formData.hostId}
//           readOnly
//           name="hostId"
//         />
//         <div>
//           <label className="block font-semibold text-gray-700 mb-1">Title</label>
//           <input
//             type="text"
//             value={formData.title}
//             onChange={(e) => setFormData({ ...formData, title: e.target.value })}
//             placeholder="Enter the title"
//             className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
//           />
//         </div>

//         <div>
//         <label className="block text-sm font-medium text-gray-700 mb-2">Room Type</label>
//         <div className="flex gap-4">
//           {['AC', 'NON_AC', 'LUXARY','PREMIUM'].map((type) => (
//             <button
//               key={type}
//               type="button"
//               onClick={() => setFormData({ ...formData, roomType: type })}
//               className={`px-6 py-2 rounded-lg border transition-all duration-200 
//                 ${formData.roomType === type
//                   ? 'bg-indigo-500 text-white border-indigo-500'
//                   : 'bg-white text-gray-800 border-gray-300 hover:border-indigo-400'}`}
//             >
//               <span>{type}</span>
//             </button>
//           ))}
//         </div>
//       </div>
//         <div>
//           <label className="block font-semibold text-gray-700 mb-1">Capacity</label>
//           <input
//             type="number"
//             min={1}
//             max={10000000}
//             value={formData.numberOfGuests}
//             onChange={(e) => setFormData({ ...formData, numberOfGuests: e.target.value })}
//             placeholder="Enter capacity"
//             className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
//           />
//         </div>

//         <div>
//           <label className="block font-semibold text-gray-700 mb-1">Price</label>
//           <input
//             type="number"
//             min={1}
//             max={10000000}
//             value={formData.price}
//             onChange={(e) => setFormData({ ...formData, price: e.target.value })}
//             placeholder="Enter price"
//             className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
//           />
//         </div>

//         <div>
//           <label className="block font-semibold text-gray-700 mb-1">Description</label>
//           <textarea
//             placeholder="Type here..."
//             rows="3"
//             value={formData.descriptionOfRoom}
//             onChange={(e) => setFormData({ ...formData, descriptionOfRoom: e.target.value })}
//             className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
//           ></textarea>
//         </div>

//         <div>
//         <label
//             htmlFor="imageUpload"
//             className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-indigo-400 rounded-lg cursor-pointer bg-indigo-50 hover:bg-indigo-100 transition"
//         >
//             <svg
//             className="w-10 h-10 text-indigo-500 mb-2"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2"
//             viewBox="0 0 24 24"
//             >
//             <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M3 15a4 4 0 004 4h10a4 4 0 004-4M7 10l5-5 5 5M12 15V3"
//             />
//             </svg>
//             <p className="text-sm text-indigo-600">Click to upload or drag & drop</p>
//             <p className="text-xs text-gray-400 mt-1">PNG, JPG, JPEG </p>
//             <input
//             id="imageUpload"
//             type="file"
//             accept="image/*"
//             className="hidden"
//             onChange={(e) => {
//               const files = Array.from(e.target.files);
//               const previews = files.map(file => ({
//                 file,
//                 preview: URL.createObjectURL(file)
//               }));
//               setImages(prev => [...prev, ...previews]);
//             }}
//             />
//         </label>
//        <div className="grid grid-cols-3 gap-3 mt-4">
//         {image.map((img, idx) => (
//           <div key={idx} className="relative group">
//             <img
//               src={img.preview}
//               alt={`Upload ${idx}`}
//               className="w-full h-24 object-cover rounded-lg border"
//             />
//             <button
//               type="button"
//               onClick={() =>
//                 setImages((prev) => prev.filter((_, i) => i !== idx))
//               }
//               className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
//               title="Remove"
//             >
//               ✕
//             </button>
//           </div>
//         ))}
//       </div>
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
//         >
//           Add
//         </button>
//       </form>
//       {successMessage && (
//         <div className="absolute top-4 w-full max-w-xl bg-green-100 text-green-800 px-4 py-2 rounded-lg text-center shadow-md">
//           {successMessage}
//         </div>
//       )}
//       {errorMessage && (
//         <div className="absolute top-4 w-full max-w-xl bg-red-100 text-red-800 px-4 py-2 rounded-lg text-center shadow-md">
//           {errorMessage}
//         </div>
//       )}

//     </div>
//   );  
// };

// export default AddRooms;
import {useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { API_PATHS } from '../../apis/apipaths';
import axiosInstance from '../../apis/axiosinstance';

const AddRooms = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  
  const [formData, setFormData] = useState({
    "numberOfGuests": '',
    "availabilty": true,
    "descriptionOfRoom": '',
    "title": '',
    "price": '',
    "roomType":'',
  });
  
  const user = JSON.parse(localStorage.getItem("user"));
  const [imageFile, setImageFile] = useState(null);
  const [image, setImages] = useState([]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      numberOfGuests: parseInt(formData.numberOfGuests),
      price: parseFloat(formData.price),
      availabilty: Boolean(formData.availabilty),
      hostid: user?.userId,
      roomType: String(formData.roomType)
    };
    // console.log(payload);
    try {
      const response = await axiosInstance.post(API_PATHS.ROOMS.ADD, payload);
      const roomId = response.data.roomId; // Assuming backend returns roomId
      setSuccessMessage("Room added successfully!");

      // Upload image if selected
      if (image) {
        // console.log("Image file: ", image);
        for (const img of image) {
          const formDataImg = new FormData();
          formDataImg.append("file", img.file); // Use the file from the state
          formDataImg.append("roomId", roomId);
        
          await axiosInstance.post(API_PATHS.IMAGES.UPLOAD_IMAGES, formDataImg, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
        }
      }
      console.log("Room added successfully:");
      setSuccessMessage("Room added successfully!");
      // navigate("/profile");
      // setTimeout(() => {
      //   window.location.reload(); // reloads the page
      // }, 1000);
    }
    catch (error) {
      setErrorMessage("Failed to add room. Please check your inputs.");
      // console.log("Payload data: ", payload);
      console.error("Error adding room:", error.response?.data || error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white flex flex-col items-center justify-center px-4 py-12">
      {/* Back button with improved styling */}
      <div className="absolute top-6 left-6">
        <button 
          onClick={() => navigate('/profile')} 
          className="group flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-md hover:shadow-lg transition duration-300 border border-indigo-100"
          aria-label="Go back to profile"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600 group-hover:text-indigo-800 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span className="text-indigo-600 group-hover:text-indigo-800 font-medium transition-colors">Back to Profile</span>
        </button>
      </div>
      
      {/* Page title */}
      <div className="w-full max-w-xl mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Add a New Room</h1>
        <p className="text-gray-600">Fill in the details to list your room for guests</p>
      </div>
      
      {/* Notification messages */}
      {successMessage && (
        <div className="w-full max-w-xl mb-6 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded shadow-md flex items-center">
          <svg className="h-5 w-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
          </svg>
          {successMessage}
        </div>
      )}
      
      {errorMessage && (
        <div className="w-full max-w-xl mb-6 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded shadow-md flex items-center">
          <svg className="h-5 w-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
          </svg>
          {errorMessage}
        </div>
      )}
      
      {/* Form card with improved styling */}
      <form 
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-xl rounded-2xl shadow-xl overflow-hidden border border-gray-100"
      >
        {/* Form header */}
        <div className="bg-indigo-600 px-6 py-4">
          <h2 className="text-xl font-bold text-white">Room Details</h2>
          <p className="text-indigo-200 text-sm mt-1">All fields marked with * are required</p>
        </div>
        
        {/* Form body */}
        <div className="p-6 space-y-6">
          <input
            type="hidden"
            value={formData.hostId}
            readOnly
            name="hostId"
          />
          
          {/* Title field */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Room Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="E.g., Cozy Studio in Downtown"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              required
            />
          </div>
          
          {/* Room Type selection */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Room Type <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 gap-3 md:flex md:flex-wrap md:gap-4">
              {['AC', 'NON_AC', 'LUXARY', 'PREMIUM'].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setFormData({ ...formData, roomType: type })}
                  className={`px-4 py-3 rounded-lg border transition-all duration-200 text-center 
                    ${formData.roomType === type
                      ? 'bg-indigo-600 text-white border-indigo-600 font-medium shadow-md'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-indigo-50 hover:border-indigo-300'}`}
                >
                  {type.replace('_', ' ')}
                </button>
              ))}
            </div>
          </div>
          
          {/* Two columns for capacity and price on larger screens */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Capacity field */}
            <div>
              <label className="block font-medium text-gray-700 mb-2">
                Capacity <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                </div>
                <input
                  type="number"
                  min={1}
                  max={10000000}
                  value={formData.numberOfGuests}
                  onChange={(e) => setFormData({ ...formData, numberOfGuests: e.target.value })}
                  placeholder="Number of guests"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                  required
                />
              </div>
            </div>
            
            {/* Price field */}
            <div>
              <label className="block font-medium text-gray-700 mb-2">
                Price per Night <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">$</span>
                </div>
                <input
                  type="number"
                  min={1}
                  max={10000000}
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="0.00"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                  required
                />
              </div>
            </div>
          </div>
          
          {/* Description field */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Room Description <span className="text-red-500">*</span>
            </label>
            <textarea
              placeholder="Describe your room, amenities, neighborhood, etc."
              rows="4"
              value={formData.descriptionOfRoom}
              onChange={(e) => setFormData({ ...formData, descriptionOfRoom: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              required
            ></textarea>
          </div>
          
          {/* Image upload section with improved UI */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Room Photos
            </label>
            <label
              htmlFor="imageUpload"
              className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-indigo-300 rounded-lg cursor-pointer bg-indigo-50 hover:bg-indigo-100 transition"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg className="w-12 h-12 text-indigo-500 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-sm text-indigo-600 font-medium">Click to upload or drag & drop</p>
                <p className="text-xs text-gray-500 mt-1">PNG, JPG, JPEG (max 10MB)</p>
              </div>
              <input
                  id="imageUpload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const files = Array.from(e.target.files);
                    const previews = files.map(file => ({
                      file,
                      preview: URL.createObjectURL(file)
                    }));
                    setImages(prev => [...prev, ...previews]);
                  }}
                />
            </label>
            
            {/* Image preview section */}
            {image.length > 0 && (
              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Uploaded Photos</h3>
                <div className="grid grid-cols-3 gap-3">
                  {image.map((img, idx) => (
                    <div key={idx} className="relative group h-24 rounded-lg overflow-hidden">
                      <img
                        src={img.preview}
                        alt={`Upload ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                        <button
                          type="button"
                          onClick={() => setImages((prev) => prev.filter((_, i) => i !== idx))}
                          className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform scale-90 group-hover:scale-100"
                          title="Remove"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Form footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end">
          <button
            type="submit"
            className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add Room
          </button>
        </div>
      </form>
    </div>
  );  
};

export default AddRooms;