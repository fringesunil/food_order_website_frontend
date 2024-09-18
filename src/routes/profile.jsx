import React from 'react'
import { Link } from "react-router-dom";

export default function Profile() {
  return (
    <main className='bg-[#B0A1BA] h-screen'>
    <section >
        <div className='flex justify-center items-center flex-col'>
        <img src="https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&w=600" alt="profile picture" className='w-[10rem] h-[10rem] my-1 mx-6 rounded-full mb-4' />
        <h1 className='mb-4 font-bold'>Fringe Sunil</h1>
        <button className="w-[25rem] bg-[#A5B5BF] text-black font-bold py-2 px-4 rounded  border-2 border-black mb-4" type="button">
           <Link to={`/home/profile/address`}>
           Manage Address
           </Link>
            </button>
            <button className="w-[25rem] bg-[#A5B5BF] text-black font-bold py-2 px-4 rounded  border-2 border-black mb-4" type="button">
           <Link to={`/`}>
           Logout
           </Link>
            </button>
        </div>
       
    </section>
  </main>
  )
}
