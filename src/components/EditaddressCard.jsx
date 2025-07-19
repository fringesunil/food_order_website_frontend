import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { useSnackbar } from 'notistack';

export default function EditaddressCard(props) {
    const address = props.useraddress;
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar(); 

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const [loading, setLoading] = useState(false); 

    const onSubmit = (data) => {
        setLoading(true); 
        axios.patch(`${import.meta.env.VITE_BASE_URL}/address/${address._id}`, data)
            .then(response => {
                setLoading(false); 
                navigate(`/home/profile/address`);
                enqueueSnackbar('Address updated successfully!', { 
                    variant: 'success',
                    autoHideDuration: 3000,
                    anchorOrigin: { vertical: "top", horizontal: "center" }
                }); 
            })
            .catch(error => {
                setLoading(false); 
                enqueueSnackbar('Failed to update address. Please try again.', { 
                    variant: 'error',
                    autoHideDuration: 3000,
                    anchorOrigin: { vertical: "top", horizontal: "center" }
                }); 
                console.log(error);
            });
    };

    return (
        <div className="min-h-screen py-8 px-4 md:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl md:text-5xl font-bold font-ruge tracking-wide text-gray-800 mb-4">
                        Edit Address
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Update your delivery address details
                    </p>
                </div>

                {/* Form Card */}
                <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        {/* Name Field */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                                <svg className="w-4 h-4 mr-2 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                Full Name
                            </label>
                            <input 
                                defaultValue={address.name}
                                type="text" 
                                id="name" 
                                {...register("name", { required: true })} 
                                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-300 transition-all duration-200 ${
                                    errors.name ? 'border-red-300 focus:border-red-400' : 'border-gray-200 focus:border-orange-400'
                                }`}
                                placeholder="Enter your full name"
                            />
                            {errors.name && (
                                <p className="text-red-500 text-sm mt-1 flex items-center">
                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Name is required
                                </p>
                            )}
                        </div>

                        {/* Flat/House Number Field */}
                        <div>
                            <label htmlFor="flatno" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                                <svg className="w-4 h-4 mr-2 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                                Flat/House Number
                            </label>
                            <input 
                                defaultValue={address.flat_no}
                                type="text" 
                                id="flatno" 
                                {...register("flat_no", { required: true })} 
                                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-300 transition-all duration-200 ${
                                    errors.flat_no ? 'border-red-300 focus:border-red-400' : 'border-gray-200 focus:border-orange-400'
                                }`}
                                placeholder="e.g., Flat 101, House No. 123"
                            />
                            {errors.flat_no && (
                                <p className="text-red-500 text-sm mt-1 flex items-center">
                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Flat/House number is required
                                </p>
                            )}
                        </div>

                        {/* Street/Area Field */}
                        <div>
                            <label htmlFor="area" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                                <svg className="w-4 h-4 mr-2 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                </svg>
                                Street/Area
                            </label>
                            <input 
                                defaultValue={address.street}
                                type="text" 
                                id="area" 
                                {...register("street", { required: true })} 
                                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-300 transition-all duration-200 ${
                                    errors.street ? 'border-red-300 focus:border-red-400' : 'border-gray-200 focus:border-orange-400'
                                }`}
                                placeholder="e.g., Main Street, Sector 15"
                            />
                            {errors.street && (
                                <p className="text-red-500 text-sm mt-1 flex items-center">
                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Street/Area is required
                                </p>
                            )}
                        </div>

                        {/* Landmark Field */}
                        <div>
                            <label htmlFor="Landmark" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                                <svg className="w-4 h-4 mr-2 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                Landmark (Optional)
                            </label>
                            <input 
                                defaultValue={address.land_mark}
                                type="text" 
                                id="Landmark" 
                                {...register("land_mark", { required: true })} 
                                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-300 transition-all duration-200 ${
                                    errors.land_mark ? 'border-red-300 focus:border-red-400' : 'border-gray-200 focus:border-orange-400'
                                }`}
                                placeholder="e.g., Near Central Park, Behind Mall"
                            />
                            {errors.land_mark && (
                                <p className="text-red-500 text-sm mt-1 flex items-center">
                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Landmark is required
                                </p>
                            )}
                        </div>

                        {/* City and State Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* City Field */}
                            <div>
                                <label htmlFor="city" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                                    <svg className="w-4 h-4 mr-2 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    </svg>
                                    City
                                </label>
                                <input 
                                    defaultValue={address.city}
                                    type="text" 
                                    id="city" 
                                    {...register("city", { required: true })} 
                                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-300 transition-all duration-200 ${
                                        errors.city ? 'border-red-300 focus:border-red-400' : 'border-gray-200 focus:border-orange-400'
                                    }`}
                                    placeholder="Enter city name"
                                />
                                {errors.city && (
                                    <p className="text-red-500 text-sm mt-1 flex items-center">
                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        City is required
                                    </p>
                                )}
                            </div>

                            {/* State Field */}
                            <div>
                                <label htmlFor="state" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                                    <svg className="w-4 h-4 mr-2 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4a4 4 0 014-4h6a4 4 0 014 4v4" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 3v4a4 4 0 004 4h2a4 4 0 004-4V3" />
                                    </svg>
                                    State
                                </label>
                                <input 
                                    defaultValue={address.state}
                                    type="text" 
                                    id="state" 
                                    {...register("state", { required: true })} 
                                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-300 transition-all duration-200 ${
                                        errors.state ? 'border-red-300 focus:border-red-400' : 'border-gray-200 focus:border-orange-400'
                                    }`}
                                    placeholder="Enter state name"
                                />
                                {errors.state && (
                                    <p className="text-red-500 text-sm mt-1 flex items-center">
                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        State is required
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-6">
                            <button
                                className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-200 flex items-center justify-center space-x-2 ${
                                    loading
                                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                        : 'bg-orange-500 hover:bg-orange-600 text-white hover:shadow-lg transform hover:-translate-y-0.5'
                                }`}
                                type="submit"
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <CircularProgress size={24} color="inherit" />
                                        <span>Updating Address...</span>
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                        </svg>
                                        <span>Update Address</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Back Button */}
                <div className="text-center mt-6">
                    <button
                        onClick={() => navigate(-1)}
                        className="inline-flex items-center px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors duration-200"
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Go Back
                    </button>
                </div>
            </div>

            {/* Decorative Elements */}
            <div className="fixed top-20 right-10 w-32 h-32 bg-orange-200 rounded-full opacity-20 blur-3xl pointer-events-none"></div>
            <div className="fixed bottom-20 left-10 w-40 h-40 bg-orange-300 rounded-full opacity-20 blur-3xl pointer-events-none"></div>
        </div>
    );
}
