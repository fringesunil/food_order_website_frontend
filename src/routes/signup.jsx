import React from 'react'
import { Link } from "react-router-dom";
import SignupForm from '../components/SignupForm';
import { SnackbarProvider } from 'notistack';
import { FaUserPlus, FaUtensils } from "react-icons/fa";

export default function Signup() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("https://images.pexels.com/photos/10749578/pexels-photo-10749578.jpeg?auto=compress&cs=tinysrgb&w=600")'
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-orange-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl"></div>

      {/* Signup Card */}
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-500 rounded-full mb-4">
              <FaUserPlus className="text-white text-2xl" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Join Us</h1>
            <p className="text-gray-300">Create your account to get started</p>
          </div>

          {/* Signup Form */}
          <SnackbarProvider maxSnack={3}> 
            <SignupForm />
          </SnackbarProvider>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-300">
              Already have an account?{' '}
              <Link 
                to="/" 
                className="text-orange-400 hover:text-orange-300 font-semibold transition-colors duration-200 hover:underline"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
