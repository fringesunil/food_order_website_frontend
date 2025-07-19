import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import { useSnackbar } from 'notistack';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = (data) => {
    setLoading(true);
    axios.post(`${import.meta.env.VITE_BASE_URL}/auth/login`, data, { withCredentials: true })
      .then(response => {
        setLoading(false);
        localStorage.setItem('userId', response.data.data._id);
        enqueueSnackbar("Login Successful!", {
          variant: "success",
          autoHideDuration: 3000,
          anchorOrigin: { vertical: "top", horizontal: "center" }
        });
        navigate(`/home/hotels`);
      })
      .catch(error => {
        setLoading(false);
        if (error.response) {
          const { status } = error.response;
          if (status === 401) {
            enqueueSnackbar("Wrong Password", {
              variant: "error",
              autoHideDuration: 3000,
              anchorOrigin: { vertical: "top", horizontal: "center" }
            });
          } else if (status === 404) {
            enqueueSnackbar("User Account not found", {
              variant: "error",
              autoHideDuration: 3000,
              anchorOrigin: { vertical: "top", horizontal: "center" }
            });
          }
        }
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Email Field */}
      <div>
        <label htmlFor="email" className="block text-white text-sm font-semibold mb-2 flex items-center">
          <FaEnvelope className="mr-2 text-orange-400" />
          Email Address
        </label>
        <div className="relative">
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
        </div>
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
            placeholder="Enter your password"
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

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-transparent disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
      >
        {loading ? (
          <div className="flex items-center justify-center space-x-2">
            <CircularProgress size={20} style={{ color: '#ffffff' }} />
            <span>Signing In...</span>
          </div>
        ) : (
          "Sign In"
        )}
      </button>
    </form>
  );
}

