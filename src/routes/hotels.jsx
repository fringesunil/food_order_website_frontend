import React from 'react'
import RestaurantCard from '../components/RestaurantCard'

export default function Hotels() {
  return (
  <main className='bg-[#B0A1BA] h-screen'>
    <section className='py-2 px-2'>
    <h1 className='px-2 py-2'>Restaurants</h1>
      <div className='grid grid-cols-5 gap-4'>
      <RestaurantCard/>
      <RestaurantCard/>
      <RestaurantCard/>
      <RestaurantCard/>
      <RestaurantCard/>
      <RestaurantCard/>
      <RestaurantCard/>
      </div>
    </section>
  </main>
  )
}
