import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

const AddresslistCard = (props) => {
    const navigate = useNavigate();
    const { address} = props;

    const handleDelete = async (addressId) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this Address?");
      
        if (isConfirmed) {
        try {
          const response = await axios.delete(`${import.meta.env.VITE_BASE_URL}/address/${addressId}`);
          if (response.status === 200) {
            window.location.reload();
          }
        } catch (error) {
          console.error('Error deleting the menu:', error);
        }
      }
      };
    
      const handleEdit = (addressId) => {
        navigate(`/home/profile/address/edit/${addressId}`);
    };  

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-100 overflow-hidden">
      {/* Address Header */}
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 px-6 py-4 border-b border-blue-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-800">{address.name}</h2>
          </div>
          <div className="flex items-center space-x-2">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
              Delivery Address
            </span>
          </div>
        </div>
      </div>

      {/* Address Content */}
      <div className="p-6">
        <div className="space-y-3 mb-6">
          <div className="flex items-start space-x-3">
            <svg className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <div>
              <p className="text-sm text-gray-500">Flat/House No.</p>
              <p className="text-gray-800 font-medium">{address.flat_no}</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <svg className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            </svg>
            <div>
              <p className="text-sm text-gray-500">Street Address</p>
              <p className="text-gray-800 font-medium">{address.street}</p>
            </div>
          </div>

          {address.land_mark && (
            <div className="flex items-start space-x-3">
              <svg className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <div>
                <p className="text-sm text-gray-500">Landmark</p>
                <p className="text-gray-800 font-medium">{address.land_mark}</p>
              </div>
            </div>
          )}

          <div className="flex items-start space-x-3">
            <svg className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            </svg>
            <div>
              <p className="text-sm text-gray-500">City & State</p>
              <p className="text-gray-800 font-medium">{address.city}, {address.state}</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <button
            className="flex-1 bg-green-500 text-white px-4 py-3 rounded-xl hover:bg-green-600 transition-all duration-200 flex items-center justify-center space-x-2 font-semibold"
            onClick={() => handleEdit(address._id)}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            <span>Edit</span>
          </button>
          <button
            className="flex-1 bg-red-500 text-white px-4 py-3 rounded-xl hover:bg-red-600 transition-all duration-200 flex items-center justify-center space-x-2 font-semibold"
            onClick={() => handleDelete(address._id)}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            <span>Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddresslistCard;
