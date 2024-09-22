import React from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import CartitemsCard from '../components/CartitemsCard';
import axios from 'axios';

export async function loader() {
  const userId = localStorage.getItem('userId');
  const response = await axios.get(`http://localhost:3000/cart?user_id=${userId}`);
  const carts = response.data;
  return { carts };
}

export default function Cart() {
  const { carts } = useLoaderData();
  const totalAmount = carts.length > 0 ? carts[0].total_amount : 0; 
  const gstAmount = carts.length > 0 ? carts[0].gst_amount : 0;

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
              <p>No items in the cart.</p> 
            )}
          </div>
          <div className='w-[59rem] h-screen bg-transparent border-r border-black px-3 py-1'>
            <h2>Coupon Code</h2>
            <input
              type="text"
              id="couponcode"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter coupon code"
            />
            <div className="flex items-center justify-between py-2">
              <button className="w-full bg-[#A5B5BF] text-black font-bold py-2 px-4 rounded-full border-2 border-black" type="button">
                <Link to={`/home/hotels`}>
                  Apply
                </Link>
              </button>
            </div>
            <h2>Bill Details</h2>
            <div className='flex justify-between'>
              <span>Item Total</span>
              <span>₹ {totalAmount}</span>
            </div>
            <div className='flex justify-between'>
              <span>Discount</span>
              <span>₹ 0</span>
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
              <button className="w-full bg-[#A5B5BF] text-black font-bold py-2 px-4 rounded-full border-2 border-black" type="button">
                <Link to={`/home/hotels`}>
                  Proceed To Pay
                </Link>
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
