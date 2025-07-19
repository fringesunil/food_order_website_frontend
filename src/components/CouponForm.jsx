import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import CircularProgress from '@mui/material/CircularProgress';  
import { SnackbarProvider, useSnackbar } from 'notistack';  

export default function CouponForm({ cartId }) {
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState(null);
  const [copiedCoupon, setCopiedCoupon] = useState("");
  const [loading, setLoading] = useState(false); 
  const { enqueueSnackbar } = useSnackbar(); 

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);  
    const userId = localStorage.getItem('userId');
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/cart?user_id=${userId}`);
    
      if (response.data[0].discount !== 0) {
          enqueueSnackbar("Coupon Already Applied!", { 
            variant: 'error',  
            autoHideDuration: 2000,
            anchorOrigin: { vertical: 'top', horizontal: 'center' } 
          });
          return; 
      }

      const body = { ...data, cartId: cartId };

      axios.post(`${import.meta.env.VITE_BASE_URL}/coupon/apply-coupon`, body)
        .then(response => {
          if (response.status === 200) {
            enqueueSnackbar("Coupon Applied Successfully", {
              variant: 'success',
              autoHideDuration: 3000,
              anchorOrigin: { vertical: 'top', horizontal: 'center' }
            });
            navigate(`/home/cart`);
          }
        })
        .catch(error => {
          enqueueSnackbar("Coupon Expired!", {
            variant: 'error',
            autoHideDuration: 3000,
            anchorOrigin: { vertical: 'top', horizontal: 'center' }
          });
          console.error("Error applying coupon:", error);
        });
    } catch (error) {
      console.error(error);
      enqueueSnackbar("Failed to apply coupon. Please try again.", { variant: 'error' });
    } finally {
      setLoading(false);  
    }
  };

  const openDialog = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/coupon`);
      setDialogContent(response.data); 
      setIsDialogOpen(true); 
    } catch (error) {
      console.error(error);
    }
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setDialogContent(null);
  };

  const copyToClipboard = (couponCode) => {
    navigator.clipboard.writeText(couponCode).then(() => {
      setCopiedCoupon(couponCode); 
      setTimeout(() => setCopiedCoupon(""), 2000); 
    });
  };

  console.log(watch("couponCode")); 

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <input
              type="text"
              id="couponcode"
              {...register("couponCode", { required: true })}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-400 transition-all duration-200 bg-white"
              placeholder="Enter coupon code"
              disabled={loading} 
            />
            {errors.couponCode && (
              <p className="text-red-500 text-sm mt-1">Coupon code is required</p>
            )}
          </div>
          <button
            type="button"
            onClick={openDialog}
            className="px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors duration-200 border-2 border-gray-200 hover:border-gray-300"
            disabled={loading}  
          >
            View Coupons
          </button>
        </div>
        
        <button
          className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center space-x-2 ${
            loading
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-orange-500 hover:bg-orange-600 text-white hover:shadow-lg transform hover:-translate-y-0.5'
          }`}
          type="submit"
          disabled={loading}
        >
          {loading ? (
            <>
              <CircularProgress size={20} color="inherit" />
              <span>Applying...</span>
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
              </svg>
              <span>Apply Coupon</span>
            </>
          )}
        </button>
      </form>

      {/* Coupon Dialog */}
      {isDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4" onClick={closeDialog}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[80vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
            {/* Dialog Header */}
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Available Coupons</h2>
                <button
                  onClick={closeDialog}
                  className="text-white hover:text-orange-200 transition-colors duration-200"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Dialog Content */}
            <div className="p-6 max-h-[60vh] overflow-y-auto">
              {dialogContent ? (
                <div className="space-y-4">
                  {dialogContent.map((coupon, index) => (
                    <div key={index} className="bg-gradient-to-r from-orange-50 to-orange-100 border border-orange-200 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-lg font-bold text-gray-800 font-mono">
                          {coupon.coupon_code}
                        </h3>
                        <span className="bg-green-500 text-white text-sm px-3 py-1 rounded-full font-semibold">
                          {coupon.discount_percentage}% OFF
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-gray-600 text-sm">
                          Get {coupon.discount_percentage}% discount on your order
                        </p>
                        <button
                          onClick={() => copyToClipboard(coupon.coupon_code)}
                          className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
                            copiedCoupon === coupon.coupon_code
                              ? 'bg-green-500 text-white'
                              : 'bg-orange-500 text-white hover:bg-orange-600'
                          }`}
                        >
                          {copiedCoupon === coupon.coupon_code ? "Copied!" : "Copy"}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading coupons...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}


