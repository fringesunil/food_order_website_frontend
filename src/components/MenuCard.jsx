import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function MenuCard(props) {
  const userId = localStorage.getItem('userId');
  const { menu } = props;
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);

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
      alert('Please select at least one item.');
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
          existingCartItem.quantity += count;
        } else {
          cartData.cart_items.push(newCartItem);
        }
        cartData.total_amount += menu.price * count;
        await axios.patch(`${import.meta.env.VITE_BASE_URL}/cart/${cartData._id}`, cartData);
      } else {
        cartData = {
          user_id: userId,
          cart_items: [newCartItem],
          total_amount: menu.price * count,
        };
  
        await axios.post(`${import.meta.env.VITE_BASE_URL}/cart`, cartData);
      }
      toast.success("Item added to cart successfully", {
        position: "top-center",
        autoClose: 3000,
      });
    } catch (error) {
      console.error('Error:', error);
      toast.error("Failed to add item to cart", {
        position: "top-center",
        autoClose: 3000,
      });
    } finally {
      setLoading(false); 
    }
  };

  return (
    <article>
      <div className='w-[16rem] h-[20rem] bg-transparent border border-black rounded-lg mx-4 px-3 py-1'>
        <img src={menu.image} alt="Menu image" className='w-[20rem] h-[09rem] rounded-lg' />
        <div className='flex flex-row justify-between pb-8'>
          <h2 className='w-[10rem] break-words'>{menu.name}</h2>
          <span>₹ {menu.price}</span>
        </div>
        <div className='pb-4'>
          <div className='item-count flex items-center space-x-4 border border-black w-[7rem] px-4 rounded-full'>
            <button className='px-1' onClick={handleDecrement}>-</button>
            <span>{count}</span>
            <button onClick={handleIncrement}>+</button>
          </div>
        </div>
        <button
          className='item-count flex items-center space-x-4 border border-black w-[7rem] px-3 rounded-[8px] bg-[#A5B5BF]'
          onClick={handleAddToCart}
          disabled={loading} 
        >
          {loading ? 'Adding...' : 'Add to cart'} 
        </button>
        <ToastContainer limit={1}/>
      </div>
    </article>
  );
}

export default MenuCard;
