import { useState, useEffect } from 'react';
import house from '../images/house.png';
import pro from '../images/key.jpg';
import room from '../images/room.jpg';
import { useNavigate,Link } from 'react-router-dom';
export default function RoomRentalLandingPage() {
  const [email, setEmail] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    house,
    pro,
    room
  ];
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000);
    
    return () => clearInterval(timer);
  }, []);
  const navigate= useNavigate();
  const handleSubscribe = (e) => {
    e.preventDefault();
    alert(`Thank you for subscribing with ${email}!`);
    setEmail('');
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800">
      {/* Header */}
      <header className="bg-indigo-600 text-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold">Room<span className="text-white">Finder</span></h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#features" className="hover:text-indigo-200 transition">Features</a>
              <a href="#how-it-works" className="hover:text-indigo-200 transition">How It Works</a>
              <a href="#testimonials" className="hover:text-indigo-200 transition">Testimonials</a>
              <a href="#pricing" className="hover:text-indigo-200 transition">Pricing</a>
            </nav>
            <div className="flex space-x-4">
              <a className="px-4 py-2 rounded hover:bg-indigo-700 transition" onClick={()=>navigate('/login')}>Login</a>
              <a  className="bg-white text-indigo-600 px-4 py-2 rounded font-medium hover:bg-indigo-50 transition" onClick={()=>navigate('/reg')}>Sign Up</a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section with Image Slider */}
      <section className="py-16 bg-indigo-600 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h2 className="text-4xl font-bold mb-6">Find Your Perfect Room in Minutes</h2>
              <p className="text-xl mb-8">Browse thousands of rooms, connect with roommates, and secure your ideal living space with ease.</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/login" className="bg-white text-indigo-600 px-6 py-3 rounded text-lg font-semibold hover:bg-indigo-50 transition text-center">Get Started</Link>
                <a href="#how-it-works" className="bg-indigo-700 text-white px-6 py-3 rounded text-lg font-semibold hover:bg-indigo-800 transition text-center">Learn More</a>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="bg-white p-2 rounded shadow-xl relative">
                {/* Image Slider */}
                <div className="relative h-80 overflow-hidden rounded">
                  {slides.map((slide, index) => (
                    <div 
                      key={index}
                      className={`absolute w-full h-full transition-opacity duration-1000 ${
                        index === currentSlide ? 'opacity-100' : 'opacity-0'
                      }`}
                    >
                      <img 
                        src={slide} 
                        alt={`Room example ${index + 1}`} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                  
                  {/* Slider indicators */}
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                    {slides.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-3 h-3 rounded-full ${
                          index === currentSlide ? 'bg-indigo-600' : 'bg-white bg-opacity-50'
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-indigo-600">Why Choose RoomFinder?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded shadow-md border border-gray-100">
              <div className="text-indigo-600 mb-4">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-indigo-600">Easy Search</h3>
              <p className="text-gray-700">Find rooms that match your criteria with our powerful search filters and intuitive interface.</p>
            </div>
            <div className="bg-white p-6 rounded shadow-md border border-gray-100">
              <div className="text-indigo-600 mb-4">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-indigo-600">Secure Payments</h3>
              <p className="text-gray-700">Our secure payment system ensures that your transactions are protected every step of the way.</p>
            </div>
            <div className="bg-white p-6 rounded shadow-md border border-gray-100">
              <div className="text-indigo-600 mb-4">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-indigo-600">Instant Messaging</h3>
              <p className="text-gray-700">Connect with potential roommates or landlords through our real-time messaging system.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-indigo-600">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-indigo-100 text-indigo-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-indigo-600">Create an Account</h3>
              <p className="text-gray-700">Sign up in minutes with your email or social media accounts.</p>
            </div>
            <div className="text-center">
              <div className="bg-indigo-100 text-indigo-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-indigo-600">Search Rooms</h3>
              <p className="text-gray-700">Browse available rooms based on location, price, and amenities.</p>
            </div>
            <div className="text-center">
              <div className="bg-indigo-100 text-indigo-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-indigo-600">Contact Hosts</h3>
              <p className="text-gray-700">Message hosts directly to ask questions or schedule viewings.</p>
            </div>
            <div className="text-center">
              <div className="bg-indigo-100 text-indigo-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">4</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-indigo-600">Book Your Room</h3>
              <p className="text-gray-700">Secure your room with our easy booking and payment system.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-indigo-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Find Your Perfect Room?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">Join thousands of satisfied users who found their ideal living space through RoomFinder.</p>
          <form onSubmit={handleSubscribe} className="max-w-md mx-auto flex flex-col sm:flex-row gap-2">
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email" 
              className="flex-grow px-4 py-3 rounded focus:outline-none text-gray-800" 
              required
            />
            <button type="submit" className="bg-white text-indigo-600 px-6 py-3 rounded font-semibold hover:bg-indigo-50 transition whitespace-nowrap">Get Started</button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-indigo-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Room<span className="text-white">Finder</span></h3>
              <p className="text-indigo-200">Finding your perfect room has never been easier.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#about" className="text-indigo-200 hover:text-white transition">About Us</a></li>
                <li><a href="#careers" className="text-indigo-200 hover:text-white transition">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2">
                <li><a href="#help" className="text-indigo-200 hover:text-white transition">Help Center</a></li>
                <li><a href="#safety" className="text-indigo-200 hover:text-white transition">Safety Center</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#terms" className="text-indigo-200 hover:text-white transition">Terms of Service</a></li>
                <li><a href="#privacy" className="text-indigo-200 hover:text-white transition">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-indigo-700 mt-8 pt-8 flex justify-between items-center">
            <p className="text-indigo-200">© 2025 RoomFinder. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}