import React from 'react'
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
        
        </div>
      </div>
    </section>
    
  </main>
  )
}
