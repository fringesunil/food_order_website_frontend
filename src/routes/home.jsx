import React from 'react'
import { Link, Outlet } from "react-router-dom";
import { FaHome, FaShoppingCart, FaUser } from "react-icons/fa";
import Footer from '../components/Footer';

export default function Home() {
  return (
    <>
    <header className="bg-gradient-to-r from-gray-900 to-gray-800 shadow-lg border-b-4 border-gray-700">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-row justify-between items-center h-20">
          {/* Logo Section */}
          <div className="flex items-center space-x-4">
            <img 
              src="https://res.cloudinary.com/drinn62yk/image/upload/v1728691154/tqxzwkst8yelcpgpg8el.png" 
              alt="Brand Logo" 
              className="w-28 h-12 object-contain" 
            />
            <div className="hidden md:block">
              <h1 className="text-white text-xl font-bold font-ruge tracking-wide">
                Food Order
              </h1>
              <p className="text-gray-300 text-sm">
                Delicious food delivered to your door
              </p>
            </div>
          </div>

          {/* Navigation */}
          <nav>
            <ul className="flex flex-row gap-6">
              <li>
                <Link 
                  to="/home/hotels"
                  className="flex items-center justify-center w-12 h-12 bg-white/20 hover:bg-white/30 rounded-xl transition-all duration-200 group"
                  title="Home"
                >
                  <FaHome size={20} className="text-white group-hover:scale-110 transition-transform duration-200" />  
                </Link>
              </li>
              <li>
                <Link 
                  to="/home/cart"
                  className="flex items-center justify-center w-12 h-12 bg-white/20 hover:bg-white/30 rounded-xl transition-all duration-200 group relative"
                  title="Cart"
                >
                  <FaShoppingCart size={20} className="text-white group-hover:scale-110 transition-transform duration-200" />
                 
                </Link>
              </li>
              <li>
                <Link 
                  to="/home/profile"
                  className="flex items-center justify-center w-12 h-12 bg-white/20 hover:bg-white/30 rounded-xl transition-all duration-200 group"
                  title="Profile"
                >
                  <FaUser size={20} className="text-white group-hover:scale-110 transition-transform duration-200" /> 
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
    <Outlet />
    <Footer/>
  </>
  )
}
