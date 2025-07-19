import React, { useState } from 'react';
import { Link, useLoaderData, useNavigate } from 'react-router-dom';
import CartitemsCard from '../components/CartitemsCard';
import axios from 'axios';
import CouponForm from '../components/CouponForm';
import CircularProgress from '@mui/material/CircularProgress';
import { SnackbarProvider, useSnackbar } from 'notistack';

export async function loader() {
  const userId = localStorage.getItem('userId');
  const cartResponse = await axios.get(`${import.meta.env.VITE_BASE_URL}/cart?user_id=${userId}`);
  const addressResponse = await axios.get(`${import.meta.env.VITE_BASE_URL}/address?user_id=${userId}`);
  const carts = cartResponse.data;
  const addresses = addressResponse.data;
  return { carts, addresses };
}

export default function Cart() {
  const { carts, addresses } = useLoaderData();
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const totalAmount = carts.length > 0 ? carts[0].total_amount : 0;
  const gstAmount = carts.length > 0 ? carts[0].gst_amount : 0;
  const discount = carts.length > 0 ? carts[0].discount : 0;

  const handleAddressSelect = (addressId) => {
    setSelectedAddress(addressId);
  };

  const handleCreateOrder = async () => {
    if (carts.length === 0) {
      enqueueSnackbar("No item found in cart", { variant: "error", autoHideDuration: 3000, anchorOrigin: { vertical: 'top', horizontal: 'center' } });
      return;
    } else if (!selectedAddress) {
      enqueueSnackbar("Please select an address", { variant: "error", autoHideDuration: 3000, anchorOrigin: { vertical: 'top', horizontal: 'center' } });
      return;
    }

    const userId = localStorage.getItem('userId');
    const cartItems = carts.length > 0 ? carts[0].cart_items.map(item => ({
      menu_id: item.menu_id._id,
      quantity: item.quantity,
    })) : [];

    const orderData = {
      user_id: userId,
      total_amount: totalAmount,
      discount: discount,
      gst_amount: gstAmount,
      cart_items: cartItems,
      address_id: selectedAddress,
    };

    try {
      setLoading(true);
      const { data } = await axios.post(`${import.meta.env.VITE_BASE_URL}/order/initorder`, { total_amount: totalAmount + gstAmount });

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: data.currency,
        name: 'Fringe Creations',
        description: 'Order Payment',
        order_id: data.id,
        handler: async function (paymentResponse) {
          const razorpay_payment_id = paymentResponse.razorpay_payment_id;
          const razorpay_order_id = paymentResponse.razorpay_order_id;
          const razorpay_signature = paymentResponse.razorpay_signature;
          const orderResponse = await axios.post(`${import.meta.env.VITE_BASE_URL}/order`, {
            ...orderData,
            razorpay_payment_id,
            razorpay_order_id,
            razorpay_signature,
          });

          if (orderResponse.status === 200) {
            await axios.delete(`${import.meta.env.VITE_BASE_URL}/cart/${carts[0]._id}`);
            navigate(`/home/hotels`);
            enqueueSnackbar("Order Placed Successfully", { variant: "success", autoHideDuration: 3000, anchorOrigin: { vertical: 'top', horizontal: 'center' } });
          }
        },
        theme: {
          color: '#000000',
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('Error:', error);
      enqueueSnackbar("Failed to proceed with payment", { variant: "error", autoHideDuration: 3000, anchorOrigin: { vertical: 'top', horizontal: 'center' } });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100">
      <SnackbarProvider maxSnack={3}>
        {/* Header Section */}
        <section className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-8 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold font-ruge tracking-wide mb-2">
                  Your Cart
                </h1>
                <p className="text-orange-100 text-lg">
                  Review your items and complete your order
                </p>
              </div>
              <div className="hidden md:block">
                <svg className="w-16 h-16 text-orange-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m6 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                </svg>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items Section */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">
                    Cart Items
                  </h2>
                  <span className="text-gray-600">
                    {carts && carts.length > 0 ? carts[0].cart_items.length : 0} item{carts && carts.length > 0 && carts[0].cart_items.length !== 1 ? 's' : ''}
                  </span>
                </div>

                {carts && carts.length > 0 ? (
                  <div className="space-y-4">
                    <SnackbarProvider maxSnack={3}>
                      {carts.map(cart => (
                        <CartitemsCard key={cart._id} cart={cart} />
                      ))}
                    </SnackbarProvider>
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <div className="max-w-md mx-auto">
                      <svg className="w-24 h-24 mx-auto text-gray-300 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m6 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                      </svg>
                      <h3 className="text-xl font-semibold text-gray-600 mb-2">
                        Your cart is empty
                      </h3>
                      <p className="text-gray-500 mb-6">
                        Looks like you haven't added any items to your cart yet
                      </p>
                      <Link
                        to="/home/hotels"
                        className="inline-flex items-center px-6 py-3 bg-orange-500 text-white font-semibold rounded-xl hover:bg-orange-600 transition-colors duration-200"
                      >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Browse Restaurants
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Order Summary Section */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 space-y-6">
                {/* Coupon Section */}
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                    </svg>
                    Coupon Code
                  </h3>
                  <CouponForm cartId={carts && carts.length > 0 ? carts[0]._id : 0} />
                </div>

                {/* Address Section */}
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Delivery Address
                  </h3>
                  
                  {addresses && addresses.length > 0 ? (
                    <div className="space-y-3">
                      {addresses.map(address => (
                        <div 
                          key={address._id} 
                          className={`border-2 rounded-xl p-4 cursor-pointer transition-all duration-200 ${
                            selectedAddress === address._id 
                              ? 'border-orange-500 bg-orange-50' 
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          onClick={() => handleAddressSelect(address._id)}
                        >
                          <div className="flex items-start space-x-3">
                            <input
                              type="radio"
                              className="mt-1 h-4 w-4 text-orange-600 border-gray-300 focus:ring-orange-500"
                              checked={selectedAddress === address._id}
                              onChange={() => handleAddressSelect(address._id)}
                            />
                            <div className="flex-1">
                              <p className="font-medium text-gray-800">{address.name}</p>
                              <p className="text-gray-600 text-sm">
                                {address.flat_no}, {address.street}, {address.city}, {address.state}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <svg className="w-12 h-12 mx-auto text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      </svg>
                      <p className="text-gray-500 mb-4">No addresses found</p>
                      <button
                        className="w-full bg-orange-500 text-white font-semibold py-3 px-4 rounded-xl hover:bg-orange-600 transition-colors duration-200"
                        onClick={() => navigate('/home/profile/address/add', { state: { fromCart: true } })}
                      >
                        Add Address
                      </button>
                    </div>
                  )}
                </div>

                {/* Bill Details */}
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Bill Details
                  </h3>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between text-gray-600">
                      <span>Item Total</span>
                      <span>₹{totalAmount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span>-₹{discount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>GST</span>
                      <span>₹{gstAmount.toFixed(2)}</span>
                    </div>
                    <div className="border-t border-gray-200 pt-3">
                      <div className="flex justify-between text-lg font-bold text-gray-800">
                        <span>To Pay</span>
                        <span>₹{(totalAmount + gstAmount).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Proceed to Pay Button */}
                <button
                  onClick={handleCreateOrder}
                  disabled={loading || carts.length === 0}
                  className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-200 flex items-center justify-center space-x-2 ${
                    loading || carts.length === 0
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-orange-500 hover:bg-orange-600 text-white hover:shadow-lg transform hover:-translate-y-0.5'
                  }`}
                >
                  {loading ? (
                    <>
                      <CircularProgress size={24} color="inherit" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                      <span>Proceed to Pay</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="fixed top-20 right-10 w-32 h-32 bg-orange-200 rounded-full opacity-20 blur-3xl pointer-events-none"></div>
        <div className="fixed bottom-20 left-10 w-40 h-40 bg-orange-300 rounded-full opacity-20 blur-3xl pointer-events-none"></div>
      </SnackbarProvider>
    </div>
  );
}

