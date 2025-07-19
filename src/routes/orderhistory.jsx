import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaTrashAlt, FaReceipt, FaCalendarAlt, FaRupeeSign, FaUser } from 'react-icons/fa'; 

export default function OrderHistory() {
  const userId = localStorage.getItem('userId');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/order?user_id=${userId}`);
        setOrders(response.data);
      } catch (err) {
        setError(err.response ? err.response.data.message : err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderHistory();
  }, []);

  const handleDelete = async (orderId) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BASE_URL}/order/${orderId}`); 
      setOrders(orders.filter(order => order._id !== orderId)); 
    } catch (err) {
      setError(err.response ? err.response.data.message : err.message);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getOrderStatus = (order) => {
    // You can customize this based on your order status logic
    return 'Delivered';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">Loading Orders</h3>
          <p className="text-gray-500">Please wait while we fetch your order history</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Error Loading Orders</h3>
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-8 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold font-ruge tracking-wide mb-2">
                Order History
              </h1>
              <p className="text-orange-100 text-lg">
                Track your past orders and deliveries
              </p>
            </div>
            <div className="hidden md:block">
              <svg className="w-16 h-16 text-orange-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 md:px-8 py-8">
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Orders</p>
                <p className="text-3xl font-bold text-gray-800">{orders.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <FaReceipt className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Spent</p>
                <p className="text-3xl font-bold text-gray-800">
                  ₹{orders.reduce((sum, order) => sum + order.total_amount, 0).toFixed(2)}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <FaRupeeSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Average Order</p>
                <p className="text-3xl font-bold text-gray-800">
                  ₹{orders.length > 0 ? (orders.reduce((sum, order) => sum + order.total_amount, 0) / orders.length).toFixed(2) : '0.00'}
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <FaCalendarAlt className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Orders Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Your Orders</h2>
            <span className="text-gray-600">{orders.length} order{orders.length !== 1 ? 's' : ''}</span>
          </div>

          {orders.length > 0 ? (
            <div className="space-y-6">
              {orders.map((order) => (
                <div 
                  key={order._id} 
                  className="bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-200"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                    {/* Order Info */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-gray-800 mb-2">
                            Order #{order._id.slice(-8).toUpperCase()}
                          </h3>
                                                     <div className="flex items-center space-x-4 text-sm text-gray-600">
                             <div className="flex items-center space-x-1">
                               <FaUser className="w-4 h-4" />
                               <span>{order.user_id.name}</span>
                             </div>
                           </div>
                        </div>
                        
                        {/* Status Badge */}
                        <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(getOrderStatus(order))}`}>
                          {getOrderStatus(order)}
                        </span>
                      </div>

                      {/* Order Details */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-white rounded-lg p-3">
                          <p className="text-sm text-gray-500 mb-1">Total Amount</p>
                          <p className="text-lg font-bold text-gray-800">₹{order.total_amount.toFixed(2)}</p>
                        </div>
                        <div className="bg-white rounded-lg p-3">
                          <p className="text-sm text-gray-500 mb-1">GST</p>
                          <p className="text-lg font-bold text-gray-800">₹{order.gst_amount.toFixed(2)}</p>
                        </div>
                        <div className="bg-white rounded-lg p-3">
                          <p className="text-sm text-gray-500 mb-1">Discount</p>
                          <p className="text-lg font-bold text-green-600">-₹{order.discount.toFixed(2)}</p>
                        </div>
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="flex-shrink-0">
                      <button 
                        onClick={() => handleDelete(order._id)} 
                        className="p-3 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-xl transition-all duration-200"
                        title="Delete Order"
                      >
                        <FaTrashAlt size={18} /> 
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <svg className="w-24 h-24 mx-auto text-gray-300 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  No orders yet
                </h3>
                <p className="text-gray-500 mb-6">
                  You haven't placed any orders yet. Start exploring restaurants to place your first order!
                </p>
                <a
                  href="/home/hotels"
                  className="inline-flex items-center px-6 py-3 bg-orange-500 text-white font-semibold rounded-xl hover:bg-orange-600 transition-colors duration-200"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Browse Restaurants
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="fixed top-20 right-10 w-32 h-32 bg-orange-200 rounded-full opacity-20 blur-3xl pointer-events-none"></div>
      <div className="fixed bottom-20 left-10 w-40 h-40 bg-orange-300 rounded-full opacity-20 blur-3xl pointer-events-none"></div>
    </div>
  );
}
