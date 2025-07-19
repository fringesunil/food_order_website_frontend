import axios from 'axios';
import React from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

function CartitemsCard(props) {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { cart } = props;
  const { cart_items } = cart;

  const handleDeleteItem = async (itemId) => {
    if (cart.cart_items.length === 1) {
      try {
        await deleteCart(cart._id);
        enqueueSnackbar("Cart deleted", {
          variant: "error",
          autoHideDuration: 3000,
          anchorOrigin: { vertical: "top", horizontal: "center" }
        });
        console.log(`Cart deleted===>${cart._id}`);
      } catch (err) {
        console.error('Error deleting cart:', err);
      }
    } else {
      const updatedCartItems = cart.cart_items.filter(item => item._id !== itemId);
      try {
        await updateCart(cart._id, { cart_items: updatedCartItems });
        enqueueSnackbar("Item removed from cart", {
          variant: "success",
          autoHideDuration: 3000,
          anchorOrigin: { vertical: "top", horizontal: "center" }
        });
        console.log(`Cart item deleted===>${itemId}`);
      } catch (err) {
        console.error('Error updating cart:', err);
      }
    }
  };
  

  const handleQuantityChange = async (itemId, action) => {
    const updatedCartItems = cart.cart_items.map(item => {
      if (item._id === itemId) {
        const newQuantity = action === 'increment' ? item.quantity + 1 : item.quantity - 1;
        return { ...item, quantity: Math.max(1, newQuantity) }; 
      }
      return item;
    });

    try {
      await updateCart(cart._id, { cart_items: updatedCartItems });
      console.log(`Cart item updated===>${itemId}, New Quantity: ${updatedCartItems.find(item => item._id === itemId).quantity}`);
    } catch (err) {
      console.error('Error updating cart:', err);
    }
  };

  const deleteCart = async (cartId) => {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_BASE_URL}/cart/${cartId}`);
      if (response.status === 200) {
        navigate(`/home/cart`);
      }
    } catch (error) {
      console.error('Error deleting cart:', error);
    }
  };

  const updateCart = async (cartId, updatedCartData) => {
    try {
      const response = await axios.patch(`${import.meta.env.VITE_BASE_URL}/cart/${cartId}`, updatedCartData);
      if (response.status === 200) {
        navigate(`/home/cart`);
      }
    } catch (error) {
      console.error('Error updating cart:', error);
    }
  };

  return (
    <div className="space-y-4">
      {cart_items.map((item) => {
        const { menu_id, quantity } = item;
        const { name, price, image } = menu_id;

        return (
          <div key={item._id} className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors duration-200">
            <div className="flex items-center space-x-4">
              {/* Image */}
              <div className="flex-shrink-0">
                <img 
                  src={image} 
                  alt={name} 
                  className="w-20 h-20 md:w-24 md:h-24 rounded-lg object-cover shadow-sm"
                />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800 truncate">
                      {name}
                    </h3>
                    <p className="text-orange-600 font-medium">
                      ₹{price}
                    </p>
                  </div>
                  
                  {/* Delete Button */}
                  <button
                    onClick={() => handleDeleteItem(item._id)}
                    className="flex-shrink-0 ml-4 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors duration-200"
                    title="Remove item"
                  >
                    <FaTrashAlt size={16} />
                  </button>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center space-x-3">
                    <button 
                      onClick={() => handleQuantityChange(item._id, 'decrement')} 
                      disabled={quantity <= 1}
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 ${
                        quantity <= 1
                          ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                          : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                      }`}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                      </svg>
                    </button>
                    
                    <span className="text-lg font-semibold text-gray-800 min-w-[2rem] text-center">
                      {quantity}
                    </span>
                    
                    <button 
                      onClick={() => handleQuantityChange(item._id, 'increment')}
                      className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 hover:bg-orange-200 flex items-center justify-center transition-colors duration-200"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                  </div>

                  {/* Total Price */}
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Total</p>
                    <p className="text-lg font-bold text-gray-800">
                      ₹{(price * quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default CartitemsCard;
