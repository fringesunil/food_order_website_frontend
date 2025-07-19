import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaUser, FaHistory, FaEnvelope, FaPhone, FaMapMarkerAlt, FaFacebook, FaTwitter, FaInstagram, FaHeart } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img 
                src="https://res.cloudinary.com/drinn62yk/image/upload/v1728691154/tqxzwkst8yelcpgpg8el.png" 
                alt="Brand Logo" 
                className="w-16 h-8 object-contain filter brightness-0 invert" 
              />
              <h3 className="text-xl font-bold font-ruge tracking-wide">Food Order</h3>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Delicious food delivered to your door. Taste the freshness in every bite with our premium restaurant partners.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://facebook.com" 
                className="w-10 h-10 bg-orange-500 hover:bg-orange-600 rounded-full flex items-center justify-center transition-all duration-200 transform hover:scale-110"
                title="Facebook"
              >
                <FaFacebook size={18} />
              </a>
              <a 
                href="https://twitter.com" 
                className="w-10 h-10 bg-orange-500 hover:bg-orange-600 rounded-full flex items-center justify-center transition-all duration-200 transform hover:scale-110"
                title="Twitter"
              >
                <FaTwitter size={18} />
              </a>
              <a 
                href="https://instagram.com" 
                className="w-10 h-10 bg-orange-500 hover:bg-orange-600 rounded-full flex items-center justify-center transition-all duration-200 transform hover:scale-110"
                title="Instagram"
              >
                <FaInstagram size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-orange-400 mb-4 flex items-center">
              <FaHome className="mr-2" />
              Quick Links
            </h4>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/home/hotels" 
                  className="text-gray-300 hover:text-orange-400 transition-colors duration-200 flex items-center group"
                >
                  <span className="w-2 h-2 bg-orange-400 rounded-full mr-3 group-hover:scale-150 transition-transform duration-200"></span>
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/home/profile" 
                  className="text-gray-300 hover:text-orange-400 transition-colors duration-200 flex items-center group"
                >
                  <span className="w-2 h-2 bg-orange-400 rounded-full mr-3 group-hover:scale-150 transition-transform duration-200"></span>
                  Profile
                </Link>
              </li>
              <li>
                <Link 
                  to="/home/profile/orderhistory" 
                  className="text-gray-300 hover:text-orange-400 transition-colors duration-200 flex items-center group"
                >
                  <span className="w-2 h-2 bg-orange-400 rounded-full mr-3 group-hover:scale-150 transition-transform duration-200"></span>
                  Order History
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-orange-400 mb-4 flex items-center">
              <FaEnvelope className="mr-2" />
              Contact Us
            </h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-300">
                <FaEnvelope className="text-orange-400 flex-shrink-0" />
                <a 
                  href="mailto:fringecreationstech@gmail.com" 
                  className="hover:text-orange-400 transition-colors duration-200"
                >
                  fringecreationstech@gmail.com
                </a>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <FaPhone className="text-orange-400 flex-shrink-0" />
                <a 
                  href="tel:+919961857227" 
                  className="hover:text-orange-400 transition-colors duration-200"
                >
                  +91 9961857227
                </a>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <FaMapMarkerAlt className="text-orange-400 flex-shrink-0" />
                <span>Thrissur, Kerala</span>
              </div>
            </div>
          </div>

          {/* Newsletter/App Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-orange-400 mb-4">
              Download Our App
            </h4>
            <p className="text-gray-300 leading-relaxed">
              Get the best food ordering experience with our mobile app. Order faster, track deliveries, and enjoy exclusive offers.
            </p>
            <div className="space-y-2">
              <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 transform hover:scale-105">
                Download App
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-700">
        <div className="container mx-auto px-4 md:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              &copy; 2024 Fringe Creations Tech. All rights reserved.
            </p>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>Made with</span>
              <FaHeart className="text-red-500 animate-pulse" />
              <span>in India</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
