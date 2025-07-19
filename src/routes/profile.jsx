import axios from 'axios';
import React, { useRef, useState } from 'react';
import { Link, useLoaderData, useNavigate } from "react-router-dom";

export async function loader() {
  const userId = localStorage.getItem('userId');
  const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/user/${userId}`);
  const user = response.data;
  return { user };
}

export default function Profile() {
  const navigate = useNavigate()
  const { user } = useLoaderData();
  const [profileImage, setProfileImage] = useState(user.image);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleProfileImageClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploading(true);
      const formData = new FormData();
      formData.append('image', file);
      
      try {
        const userId = localStorage.getItem('userId');
        const response = await axios.patch(`${import.meta.env.VITE_BASE_URL}/user/${userId}`, formData);
        
        const newImageUrl = response.data.imageUrl;
        setProfileImage(newImageUrl); 
      } catch (error) {
        console.error('Error uploading profile picture:', error);
      } finally {
        setUploading(false);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/logout`);
      localStorage.removeItem('userId');
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-8 px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-ruge tracking-wide mb-2">
            My Profile
          </h1>
          <p className="text-orange-100 text-lg">
            Manage your account settings and preferences
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 md:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          {/* Profile Header */}
          <div className="text-center mb-8">
            <div className="relative inline-block">
              <div className="relative">
                <img 
                  src={profileImage ? profileImage : 'https://t3.ftcdn.net/jpg/06/33/54/78/360_F_633547842_AugYzexTpMJ9z1YcpTKUBoqBF0CUCk10.jpg'}
                  alt="profile picture"
                  className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-orange-200 shadow-lg cursor-pointer hover:border-orange-300 transition-all duration-200"
                  onClick={handleProfileImageClick}
                />
                
                {/* Upload Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200 cursor-pointer" onClick={handleProfileImageClick}>
                  {uploading ? (
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                  ) : (
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  )}
                </div>
              </div>
              
              {/* Upload Indicator */}
              {uploading && (
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-orange-500 text-white text-xs px-3 py-1 rounded-full">
                  Uploading...
                </div>
              )}
            </div>
            
            <input 
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }} 
              onChange={handleFileChange}
              accept="image/*"
            />
            
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mt-6 mb-2">
              {user.name}
            </h2>
            <p className="text-gray-600">
              {user.email}
            </p>
          </div>

          {/* Profile Actions */}
          <div className="space-y-4">
            {/* Order History Button */}
            <Link 
              to="/home/profile/orderhistory"
              className="block w-full"
            >
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-6 hover:from-blue-100 hover:to-blue-200 transition-all duration-200 group cursor-pointer">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center group-hover:bg-blue-600 transition-colors duration-200">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div className="text-left">
                      <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-800 transition-colors duration-200">
                        Order History
                      </h3>
                      <p className="text-gray-600 text-sm">
                        View your past orders and track current deliveries
                      </p>
                    </div>
                  </div>
                  <svg className="w-6 h-6 text-gray-400 group-hover:text-blue-500 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>

            {/* Manage Address Button */}
            <Link 
              to="/home/profile/address"
              className="block w-full"
            >
              <div className="bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-xl p-6 hover:from-green-100 hover:to-green-200 transition-all duration-200 group cursor-pointer">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center group-hover:bg-green-600 transition-colors duration-200">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div className="text-left">
                      <h3 className="text-lg font-semibold text-gray-800 group-hover:text-green-800 transition-colors duration-200">
                        Manage Address
                      </h3>
                      <p className="text-gray-600 text-sm">
                        Add, edit, or remove your delivery addresses
                      </p>
                    </div>
                  </div>
                  <svg className="w-6 h-6 text-gray-400 group-hover:text-green-500 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>

            {/* Logout Button */}
            <button 
              onClick={handleLogout}
              className="w-full bg-gradient-to-r from-red-50 to-red-100 border border-red-200 rounded-xl p-6 hover:from-red-100 hover:to-red-200 transition-all duration-200 group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center group-hover:bg-red-600 transition-colors duration-200">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <h3 className="text-lg font-semibold text-gray-800 group-hover:text-red-800 transition-colors duration-200">
                      Logout
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Sign out of your account
                    </p>
                  </div>
                </div>
                <svg className="w-6 h-6 text-gray-400 group-hover:text-red-500 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>
          </div>


        </div>
      </div>

      {/* Decorative Elements */}
      <div className="fixed top-20 right-10 w-32 h-32 bg-orange-200 rounded-full opacity-20 blur-3xl pointer-events-none"></div>
      <div className="fixed bottom-20 left-10 w-40 h-40 bg-orange-300 rounded-full opacity-20 blur-3xl pointer-events-none"></div>
    </div>
  );
}
