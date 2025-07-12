import { Link } from 'react-router';
import { FaFacebookF, FaInstagram, FaWhatsapp, FaXTwitter } from 'react-icons/fa6';
import useAuth from '../Hook/useAuth';
import Lottie from 'lottie-react';
import animationData from '../assets/Goal copy.json'


const Footer = () => {
  const { user } = useAuth(); // ✅ 1. Check if user is logged in for conditional link

  return (
    <footer className="bg-green-100 border-t border-green-100 text-gray-800 py-10">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* ✅ Left: Address Info */}
        <div>
          <h3 className="text-lg font-semibold mb-2 text-green-800">Address</h3>
          <p>Ad Bangla Media,<br />Bhatipara House, 35/2 Kumarpara Rd,<br />Sylhet 3100</p>
          <p className="mt-2">
            <span className="font-medium">Phone:</span> 01302-750374<br />
            <span className="font-medium">Email:</span> info@goalclub.com
          </p>
        </div>

        {/* ✅ Middle: Navigation Links */}
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-semibold mb-2 text-green-800">Quick Links</h3>
          <Link to="/" className="hover:text-green-600 transition-all">Home</Link>
          <Link to="/courts" className="hover:text-green-600 transition-all">Courts</Link>
          {user ? (
            <Link to="/dashboard" className="hover:text-green-600 transition-all">dashboard</Link>
          ) : (
            <Link to="/login" className="hover:text-green-600 transition-all">Login</Link>
          )}
        </div>

        {/* ✅ Right: Social Icons */}
        <div>
          <h3 className="text-lg font-semibold mb-2 text-green-800">Follow Us</h3>
          <div className="flex gap-4 my-2 ">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
              className="w-10 h-10 bg-green-700 text-white rounded-full flex items-center justify-center hover:bg-green-800 transition-all shadow-md"
            >
              <FaFacebookF />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
              className="w-10 h-10 bg-pink-500 text-white rounded-full flex items-center justify-center hover:bg-pink-600 transition-all shadow-md"
            >
              <FaInstagram />
            </a>
            <a href="https://wa.me/01302750374" target="_blank" rel="noopener noreferrer"
              className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center hover:bg-green-700 transition-all shadow-md"
            >
              <FaWhatsapp />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
              className="w-10 h-10 bg-gray-900 text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-all shadow-md"
            >
              <FaXTwitter />
            </a>
          </div>
          <Lottie  animationData={animationData}></Lottie>
        </div>

      </div>

      {/* ✅ Optional bottom line */}
      <div className="text-center mt-10 text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Goal Sports Club. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
