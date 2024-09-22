import React, { useState } from 'react';
import axios from 'axios';

function MenuCard(props) {
  const userId = localStorage.getItem('userId');
  const { menu} = props;
  const [count, setCount] = useState(0);

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
  
    try {
      let response = await axios.get(`http://localhost:3000/cart?user_id=${userId}`);
      let cartData;
      if (response.data && response.data.length > 0) {

        cartData = response.data[0];
        cartData.cart_items.push(newCartItem);
        cartData.total_amount += menu.price * count;
        await axios.patch(`http://localhost:3000/cart/${cartData._id}`, cartData);
      } else {
        cartData = {
          user_id: userId,
          cart_items: [newCartItem],
          total_amount: menu.price * count, 
        };
  
        await axios.post(`http://localhost:3000/cart`, cartData);
      }
  
      alert('Item added to cart successfully');
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to add item to cart');
    }
  };
  
  
  

  return (
    
    <article>
      <div className='w-[16rem] h-fit bg-transparent border border-black rounded-lg mx-4 px-3 py-1'>
        <img src={menu.image} alt="Menu image" className='w-[20rem] h-[09rem] rounded-lg' />
        <div className='flex flex-row justify-between pb-2'>
          <h2>{menu.name}</h2>
          <span>₹ {menu.price}</span>
        </div>
        <div className='pb-2'>
          <div className='item-count flex items-center space-x-4 border border-black w-[7rem] px-4 rounded-full'>
            <button className='px-1' onClick={handleDecrement}>-</button>
            <span>{count}</span>
            <button onClick={handleIncrement}>+</button>
          </div>
        </div>
        <button
          className='item-count flex items-center space-x-4 border border-black w-[7rem] px-3 rounded-[8px] bg-[#A5B5BF]'
          onClick={handleAddToCart}
        >
          Add to cart
        </button>
      </div>
    </article>
  );
}

export default MenuCard;
