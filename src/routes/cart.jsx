import React from 'react'
import { Link, Outlet } from "react-router-dom";
import CartitemsCard from '../components/CartitemsCard'

export default function Cart() {
  return (
    <main className='bg-[#B0A1BA] h-screen'>
    <section >
       
      <div className='flex flex-row'>
      <div className='w-[59rem] h-screen bg-transparent border-r border-black px-3 py-1'>
          <CartitemsCard/>
          <CartitemsCard/>
        </div>
        <div className='w-[59rem] h-screen bg-transparent border-r border-black px-3 py-1'>
          <h2>Coupon Code</h2>
          <input type="couponcode" id="couponcode" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"/>
          <div className="flex items-center justify-between py-2">
          <button className="w-full bg-[#A5B5BF] text-black font-bold py-2 px-4 rounded-full  border-2 border-black" type="button">
           <Link to={`/home/hotels`}>
           Apply
           </Link>
            </button>
          </div>
          <h2>Bill Details</h2>
          <div className='flex justify-between'>
          <span>Item Total</span>
          <span>₹ 80</span>
          </div>
          <div className='flex justify-between'>
          <span>Discount</span>
          <span>₹ 0</span>
          </div>
          <div className='flex justify-between'>
          <span>Gst</span>
          <span>₹ 14</span>
          </div>
          <div className='flex justify-between font-bold'>
          <span>To Pay</span>
          <span>₹ 94</span>
          </div>
          <div className="flex items-center justify-between py-2">
          <button className="w-full bg-[#A5B5BF] text-black font-bold py-2 px-4 rounded-full  border-2 border-black" type="button">
           <Link to={`/home/hotels`}>
           Proceed To Pay
           </Link>
            </button>
          </div>
        </div>
      </div>
    </section>
    
  </main>
  )
}
