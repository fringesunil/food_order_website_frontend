import React, { useState } from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';

function MenuCard(props) {
  const userId = localStorage.getItem('userId');
  const { menu } = props;
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar(); 

  const handleIncrement = () => {
    setCount(prevCount => prevCount + 1);
  };

  const handleDecrement = () => {
    if (count > 0) {
      setCount(prevCount => prevCount - 1);
    }
  };

  const handleAddToCart = async () => {
    if (count === 0) {
      enqueueSnackbar('Please select at least one item.', { 
        variant: "warning", 
        autoHideDuration: 3000,
        anchorOrigin: { vertical: 'top', horizontal: 'center' }
      });
      return;
    }
    
    const newCartItem = {
      menu_id: menu._id,
      quantity: count,
    };

    setLoading(true); 

    try {
      let response = await axios.get(`${import.meta.env.VITE_BASE_URL}/cart?user_id=${userId}`);
      let cartData;
      if (response.data && response.data.length > 0) {
        cartData = response.data[0];
        const existingCartItem = cartData.cart_items.find(item => item.menu_id._id === menu._id);
        if (existingCartItem) {
          enqueueSnackbar("Item already added in cart", { 
            variant: "error", 
            autoHideDuration: 3000,
            anchorOrigin: { vertical: 'top', horizontal: 'center' }
          }); 
          return;
        } else {
          cartData.cart_items.push(newCartItem);
        }
        cartData.total_amount += menu.price * count;
        await axios.patch(`${import.meta.env.VITE_BASE_URL}/cart/${cartData._id}`, cartData);
        enqueueSnackbar("Item added to cart successfully", { 
          variant: "success", 
          autoHideDuration: 3000,
          anchorOrigin: { vertical: 'top', horizontal: 'center' }
        }); 
      } else {
        cartData = {
          user_id: userId,
          cart_items: [newCartItem],
          total_amount: menu.price * count,
        };
  
        await axios.post(`${import.meta.env.VITE_BASE_URL}/cart`, cartData);
        enqueueSnackbar("Item added to cart successfully", { 
          variant: "success", 
          autoHideDuration: 3000,
          anchorOrigin: { vertical: 'top', horizontal: 'center' }
        });
      }
     
    } catch (error) {
      console.error('Error:', error);
      enqueueSnackbar("Failed to add item to cart", { 
        variant: "error", 
        autoHideDuration: 3000,
        anchorOrigin: { vertical: 'top', horizontal: 'center' }
      });
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={menu.image} 
          alt={menu.name} 
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        {/* Title and Price */}
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-bold text-gray-800 leading-tight flex-1 mr-3">
            {menu.name}
          </h3>
          <span className="text-xl font-bold text-orange-600 whitespace-nowrap">
            ₹{menu.price}
          </span>
        </div>

        {/* Quantity Controls */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <button 
              onClick={handleDecrement}
              className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors duration-200 text-gray-600 hover:text-gray-800"
              disabled={count === 0}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
              </svg>
            </button>
            
            <span className="text-lg font-semibold text-gray-800 min-w-[2rem] text-center">
              {count}
            </span>
            
            <button 
              onClick={handleIncrement}
              className="w-10 h-10 rounded-full bg-orange-100 hover:bg-orange-200 flex items-center justify-center transition-colors duration-200 text-orange-600 hover:text-orange-700"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={loading || count === 0}
          className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center space-x-2 ${
            count === 0 
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : loading
              ? 'bg-orange-400 text-white cursor-wait'
              : 'bg-orange-500 hover:bg-orange-600 text-white hover:shadow-lg transform hover:-translate-y-0.5'
          }`}
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>Adding...</span>
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m6 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
              </svg>
              <span>Add to Cart</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default MenuCard;
