import React from 'react'
import { Link } from "react-router-dom";
import AddressCart from '../components/AddressCard';

export default function Address() {
  return (
    <main className='bg-[#B0A1BA] h-screen'>
      <AddressCart/>
     {/* <form>
          <div className="mb-2 px-36 py-2">
            <label htmlFor="name" className="block text-black text-sm font-bold mb-2">Name</label>
            <input type="name" id="name" className="shadow appearance-none border rounded w-[70rem] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
          </div>
          <div className="mb-2 px-36 py-2">
            <label htmlFor="flatno" className="block text-black text-sm font-bold mb-2">Flat no</label>
            <input type="flatno" id="flatno" className="shadow appearance-none border rounded w-[70rem] py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"/>
          </div>
          <div className="mb-2 px-36 py-2">
            <label htmlFor="area" className="block text-black text-sm font-bold mb-2">Area</label>
            <input type="area" id="area" className="shadow appearance-none border rounded w-[70rem] py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"/>
          </div>
          <div className="mb-2 px-36 py-2">
            <label htmlFor="Landmark" className="block text-black text-sm font-bold mb-2">Landmark</label>
            <input type="Landmark" id="Landmark" className="shadow appearance-none border rounded w-[70rem] py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"/>
          </div>
         <div className='flex'>
         <div className="mb-2 px-36 py-2">
            <label htmlFor="city" className="block text-black text-sm font-bold mb-2">Town/City</label>
            <input type="city" id="city" className="shadow appearance-none border rounded w-[30rem] py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"/>
          </div>
          <div className="mb-2 px-4 py-2">
            <label htmlFor="state" className="block text-black text-sm font-bold mb-2">State</label>
            <input type="state" id="state" className="shadow appearance-none border rounded w-[30rem] py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"/>
          </div>
         </div>
          <div className="flex items-center justify-between py-2 px-36">
          <button className="w-[70rem] bg-blue-500 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
           <Link to={`/home/profile`}>
           Save
           </Link>
           
            </button>
          </div>
         
        </form> */}
  </main>
  )
}
