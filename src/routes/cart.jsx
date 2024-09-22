import React from 'react';
import { Link, useLoaderData, useNavigate } from 'react-router-dom';
import CartitemsCard from '../components/CartitemsCard';
import axios from 'axios';
import CouponForm from '../components/CouponForm';

export async function loader() {
  const userId = localStorage.getItem('userId');
  const response = await axios.get(`http://localhost:3000/cart?user_id=${userId}`);
  const carts = response.data;
  return { carts };
}

export default function Cart() {
  const { carts } = useLoaderData();
  const navigate = useNavigate();
  const totalAmount = carts.length > 0 ? carts[0].total_amount : 0; 
  const gstAmount = carts.length > 0 ? carts[0].gst_amount : 0;
  const discount = carts.length > 0 ? carts[0].discount : 0;

  const handleCreateOrder = async () => {
    const userId = localStorage.getItem('userId');
    const cartItems = carts.length > 0 ? carts[0].cart_items.map(item => ({
      menu_id: item.menu_id._id, 
      quantity: item.quantity, 
    })) : [];
    const orderData = {
      user_id: userId,
      total_amount:totalAmount,
      discount:discount,
      gst_amount:gstAmount,
      cart_items: cartItems,
    };

    try {
      const response = await axios.post(`http://localhost:3000/order`, orderData);
      if(response.status==200){
        const response = await  axios.delete(`http://localhost:3000/cart/${carts[0]._id}`)
        if(response.status==200){
          navigate(`/home/hotels`)
        }
      }

      alert('Order Placed Sucessfully');
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to add item to cart');
    }
  };

  return (
    <main className='bg-[#B0A1BA] h-screen'>
      <section>
        <div className='flex flex-row'>
          <div className='w-[59rem] h-screen bg-transparent border-r border-black px-3 py-1'>
            {carts && carts.length > 0 ? ( 
              carts.map(cart => (
                <CartitemsCard key={cart._id} cart={cart} /> 
              ))
            ) : (
              <p className='py-52 px-52'>No items in the cart.</p> 
            )}
          </div>
          <div className='w-[59rem] h-screen bg-transparent border-r border-black px-3 py-1'>
            <h2>Coupon Code</h2>
              <CouponForm cartId={carts && carts.length > 0 ?carts[0]._id:0}/>
            <h2>Bill Details</h2>
            <div className='flex justify-between'>
              <span>Item Total</span>
              <span>₹ {totalAmount}</span>
            </div>
            <div className='flex justify-between'>
              <span>Discount</span>
              <span>₹ {discount}</span>
            </div>
            <div className='flex justify-between'>
              <span>GST</span>
              <span>₹ {gstAmount.toFixed(2)}</span>
            </div>
            <div className='flex justify-between font-bold'>
              <span>To Pay</span>
              <span>₹ {(totalAmount + gstAmount).toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <button className="w-full bg-[#A5B5BF] text-black font-bold py-2 px-4 rounded-full border-2 border-black" type="button" onClick={handleCreateOrder}>
                  Proceed To Pay
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
