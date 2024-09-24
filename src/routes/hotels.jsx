import React from 'react'
import RestaurantCard from '../components/RestaurantCard'
import axios from 'axios';
import { useLoaderData } from 'react-router-dom';

export async function loader() {
 const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/restaurants`)
 const hotels = response.data
  return { hotels };
}

export default function Hotels() {
  const {hotels}=useLoaderData()
  return (
  <main className='bg-[#B0A1BA] h-screen'>
    <section className='py-2 px-2'>
    <h1 className='px-2 py-2'>Restaurants</h1>
      <div className='grid grid-cols-5 gap-4'>
        {
          hotels.map(hotel=>{
            return<RestaurantCard key={hotel._id} hotel={hotel}/>
          })
        }
      </div>
    </section>
  </main>
  )
}
