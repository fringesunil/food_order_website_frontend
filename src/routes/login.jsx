import React from 'react'
import { Link, Outlet } from "react-router-dom";

export default function Login() {
  return (
    <div className='flex justify-end items-center min-h-screen bg-[url("https://images.pexels.com/photos/10749578/pexels-photo-10749578.jpeg?auto=compress&cs=tinysrgb&w=600")] bg-cover'>
      <div className='w-4/12 h-3/5 bg-transparent border border-2-white rounded-lg mx-8 px-3'>
        <h1 className='flex justify-center text-white'>Login</h1>
        <form>
          <div className="mb-4">
            <label htmlFor="email" className="block text-white text-sm font-bold mb-2">Email Id</label>
            <input type="email" id="email" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-white text-sm font-bold mb-2">Password</label>
            <input type="password" id="password" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"/>
          </div>
          <div className="flex items-center justify-between py-2">
          <button className="w-full bg-blue-500 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
           <Link to={`/home/hotels`}>
           Login
           </Link>
            </button>
          </div>
          <div>
          <Link className='flex justify-end pb-2 text-white' to={"/signup"}>Don’t Have an Account? Signup</Link>
          </div>
        </form>
      </div>
    </div>
  )
}
