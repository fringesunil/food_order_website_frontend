import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from '@mui/material'; 
import { useSnackbar } from 'notistack';
import { FaUser, FaEnvelope, FaLock, FaPhone, FaEye, FaEyeSlash } from "react-icons/fa";

export default function SignupForm() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const password = watch("password");

  const onSubmit = (data) => {
    setLoading(true);
    axios.post(`${import.meta.env.VITE_BASE_URL}/user`, data)
      .then(response => {
        if (response.status === 200) {
          localStorage.setItem('userId', response.data._id);
          enqueueSnackbar("Sign-up Successful!", {
            variant: 'success',
            autoHideDuration: 3000,
            anchorOrigin: { vertical: 'top', horizontal: 'center' }
          });
          navigate(`/home/hotels`);
        }
      })
      .catch(error => {
        if (error.response) {
          const { status } = error.response;
          if (status === 401) {
            enqueueSnackbar("Password mismatch!", {
              variant: 'error',
              autoHideDuration: 3000,
              anchorOrigin: { vertical: 'top', horizontal: 'center' }
            });
          } else if (status === 400) {
            enqueueSnackbar("Email already exists", {
              variant: 'error',
              autoHideDuration: 3000,
              anchorOrigin: { vertical: 'top', horizontal: 'center' }
            });
          } else {
            enqueueSnackbar("An unexpected error occurred!", {
              variant: 'error',
              autoHideDuration: 3000,
              anchorOrigin: { vertical: 'top', horizontal: 'center' }
            });
          }
        } else {
          enqueueSnackbar("An error occurred. Please check your network connection.", {
            variant: 'error',
            autoHideDuration: 3000,
            anchorOrigin: { vertical: 'top', horizontal: 'center' }
          });
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Name Field */}
      <div>
        <label htmlFor="name" className="block text-white text-sm font-semibold mb-2 flex items-center">
          <FaUser className="mr-2 text-orange-400" />
          Full Name
        </label>
        <input
          type="text"
          id="name"
          {...register("name", { 
            required: "Name is required",
            minLength: {
              value: 2,
              message: "Name must be at least 2 characters"
            }
          })}
          className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 ${
            errors.name ? 'border-red-400' : 'border-gray-600'
          }`}
          placeholder="Enter your full name"
        />
        {errors.name && (
          <p className="mt-1 text-red-400 text-sm flex items-center">
            <span className="w-1 h-1 bg-red-400 rounded-full mr-2"></span>
            {errors.name.message}
          </p>
        )}
      </div>

      {/* Email Field */}
      <div>
        <label htmlFor="email" className="block text-white text-sm font-semibold mb-2 flex items-center">
          <FaEnvelope className="mr-2 text-orange-400" />
          Email Address
        </label>
        <input
          type="email"
          id="email"
          {...register("email", { 
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address"
            }
          })}
          className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 ${
            errors.email ? 'border-red-400' : 'border-gray-600'
          }`}
          placeholder="Enter your email"
        />
        {errors.email && (
          <p className="mt-1 text-red-400 text-sm flex items-center">
            <span className="w-1 h-1 bg-red-400 rounded-full mr-2"></span>
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Password Field */}
      <div>
        <label htmlFor="password" className="block text-white text-sm font-semibold mb-2 flex items-center">
          <FaLock className="mr-2 text-orange-400" />
          Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            {...register("password", { 
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters"
              }
            })}
            className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 pr-12 ${
              errors.password ? 'border-red-400' : 'border-gray-600'
            }`}
            placeholder="Create a password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200"
          >
            {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
          </button>
        </div>
        {errors.password && (
          <p className="mt-1 text-red-400 text-sm flex items-center">
            <span className="w-1 h-1 bg-red-400 rounded-full mr-2"></span>
            {errors.password.message}
          </p>
        )}
      </div>

      {/* Confirm Password Field */}
      <div>
        <label htmlFor="confirm_password" className="block text-white text-sm font-semibold mb-2 flex items-center">
          <FaLock className="mr-2 text-orange-400" />
          Confirm Password
        </label>
        <div className="relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            id="confirm_password"
            {...register("confirm_password", { 
              required: "Please confirm your password",
              validate: value => value === password || "Passwords do not match"
            })}
            className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 pr-12 ${
              errors.confirm_password ? 'border-red-400' : 'border-gray-600'
            }`}
            placeholder="Confirm your password"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200"
          >
            {showConfirmPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
          </button>
        </div>
        {errors.confirm_password && (
          <p className="mt-1 text-red-400 text-sm flex items-center">
            <span className="w-1 h-1 bg-red-400 rounded-full mr-2"></span>
            {errors.confirm_password.message}
          </p>
        )}
      </div>

      {/* Mobile Number Field */}
      <div>
        <label htmlFor="mobile_number" className="block text-white text-sm font-semibold mb-2 flex items-center">
          <FaPhone className="mr-2 text-orange-400" />
          Mobile Number
        </label>
        <input
          type="tel"
          id="mobile_number"
          {...register("mobile_number", { 
            required: "Mobile number is required",
            pattern: {
              value: /^[0-9]{10}$/,
              message: "Please enter a valid 10-digit mobile number"
            }
          })}
          className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 ${
            errors.mobile_number ? 'border-red-400' : 'border-gray-600'
          }`}
          placeholder="Enter your mobile number"
        />
        {errors.mobile_number && (
          <p className="mt-1 text-red-400 text-sm flex items-center">
            <span className="w-1 h-1 bg-red-400 rounded-full mr-2"></span>
            {errors.mobile_number.message}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-transparent disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
      >
        {loading ? (
          <div className="flex items-center justify-center space-x-2">
            <CircularProgress size={20} style={{ color: '#ffffff' }} />
            <span>Creating Account...</span>
          </div>
        ) : (
          "Create Account"
        )}
      </button>
    </form>
  );
}


