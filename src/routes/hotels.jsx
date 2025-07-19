import React, { useState } from 'react';
import RestaurantCard from '../components/RestaurantCard';
import axios from 'axios';
import { useLoaderData } from 'react-router-dom';
import Slider from 'react-slick'; 
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export async function loader() {
  const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/restaurants`);
  const hotels = response.data;
  return { hotels };
}

export default function Hotels() {
  const { hotels } = useLoaderData();
  const [searchTerm, setSearchTerm] = useState('');

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    fade: true,
    cssEase: 'linear',
  };

  const sliderImages = [
    'https://res.cloudinary.com/drinn62yk/image/upload/v1728692158/Orange_Asian_Food_Facebook_Cover_hvhieh.png',
    'https://res.cloudinary.com/drinn62yk/image/upload/v1728692387/Simple_Photo_Modern_Pizza_Food_Facebook_Cover_fd7ud9.png',
    'https://res.cloudinary.com/drinn62yk/image/upload/v1728692387/Green_Stripe_Cloth_Flatlay_Healthy_Food_Facebook_Cover_mcwnxr.png',
  ];

  const filteredHotels = hotels.filter((hotel) =>
    hotel.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100">
      {/* Hero Section with Slider */}
      <section className="relative h-[500px] overflow-hidden">
        <div className="absolute inset-0 bg-black/20 z-10"></div>
        <Slider {...sliderSettings} className="h-full">
          {sliderImages.map((image, index) => (
            <div key={index} className="relative h-[500px]">
              <img 
                src={image} 
                alt={`Slide ${index}`} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
            </div>
          ))}
        </Slider>
        

      </section>

      {/* Search Section */}
      <section className="py-12 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Find Your Perfect Meal
            </h3>
            <p className="text-gray-600 text-lg">
              Search through our curated collection of restaurants
            </p>
          </div>
          
          <div className="relative max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search restaurants by name..."
                className="w-full px-6 py-4 pl-14 text-lg border-2 border-gray-200 rounded-2xl shadow-lg focus:outline-none focus:ring-4 focus:ring-orange-300 focus:border-orange-400 transition-all duration-300 bg-white/80 backdrop-blur-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <svg 
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="px-4 md:px-8 pb-16">
        <div className="max-w-7xl mx-auto">
          {/* Results Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h4 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                Available Restaurants
              </h4>
              <p className="text-gray-600">
                {filteredHotels.length} restaurant{filteredHotels.length !== 1 ? 's' : ''} found
              </p>
            </div>
            
            {searchTerm && (
              <div className="mt-4 md:mt-0">
                <span className="inline-flex items-center px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">
                  Searching for: "{searchTerm}"
                </span>
              </div>
            )}
          </div>

          {/* Restaurants Grid */}
          {filteredHotels.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 md:gap-8">
              {filteredHotels.map((hotel) => (
                <div key={hotel._id} className="transform hover:scale-105 transition-transform duration-300">
                  <RestaurantCard hotel={hotel} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <svg 
                  className="w-24 h-24 mx-auto text-gray-300 mb-6"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <h5 className="text-xl font-semibold text-gray-600 mb-2">
                  No restaurants found
                </h5>
                <p className="text-gray-500">
                  Try adjusting your search terms or browse all available restaurants
                </p>
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="mt-4 px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-200"
                  >
                    Clear Search
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Decorative Elements */}
      <div className="fixed top-20 right-10 w-32 h-32 bg-orange-200 rounded-full opacity-20 blur-3xl pointer-events-none"></div>
      <div className="fixed bottom-20 left-10 w-40 h-40 bg-orange-300 rounded-full opacity-20 blur-3xl pointer-events-none"></div>
    </div>
  );
}
