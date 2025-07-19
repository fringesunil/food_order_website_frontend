import React from 'react'
import { Link, useLoaderData } from "react-router-dom";
import AddresslistCard from '../components/AddressListCard';
import axios from 'axios';

export async function loader() {
    const userId = localStorage.getItem('userId');
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/address?user_id=${userId}`);
    const useraddress = response.data;
    return { useraddress };
  }

export default function AddressList() {
    const {useraddress}=useLoaderData();
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-8 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold font-ruge tracking-wide mb-2">
                My Addresses
              </h1>
              <p className="text-orange-100 text-lg">
                Manage your delivery addresses
              </p>
            </div>
            <div className="hidden md:block">
              <svg className="w-16 h-16 text-orange-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 md:px-8 py-8">
        {/* Header with Add Button */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div className="mb-4 sm:mb-0">
            <h2 className="text-2xl font-bold text-gray-800">
              Delivery Addresses
            </h2>
            <p className="text-gray-600">
              {useraddress.length} address{useraddress.length !== 1 ? 'es' : ''} saved
            </p>
          </div>
          
          <Link 
            to={{ pathname: "/home/profile/address/add", state: { fromCart: false } }}
            className="inline-flex items-center px-6 py-3 bg-orange-500 text-white font-semibold rounded-xl hover:bg-orange-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add New Address
          </Link>
        </div>

        {/* Addresses Grid */}
        {useraddress.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {useraddress.map(address => (
              <AddresslistCard key={address._id} address={address}/>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <svg className="w-24 h-24 mx-auto text-gray-300 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              </svg>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No addresses saved
              </h3>
              <p className="text-gray-500 mb-6">
                You haven't added any delivery addresses yet. Add your first address to get started!
              </p>
              <Link 
                to={{ pathname: "/home/profile/address/add", state: { fromCart: false } }}
                className="inline-flex items-center px-6 py-3 bg-orange-500 text-white font-semibold rounded-xl hover:bg-orange-600 transition-colors duration-200"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Your First Address
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Decorative Elements */}
      <div className="fixed top-20 right-10 w-32 h-32 bg-orange-200 rounded-full opacity-20 blur-3xl pointer-events-none"></div>
      <div className="fixed bottom-20 left-10 w-40 h-40 bg-orange-300 rounded-full opacity-20 blur-3xl pointer-events-none"></div>
    </div>
  )
}
