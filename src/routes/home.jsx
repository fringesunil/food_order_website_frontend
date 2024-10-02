import React from 'react'
import { Link, Outlet } from "react-router-dom";
import { FaHome, FaShoppingCart, FaUser } from "react-icons/fa";

export default function Home() {
  return (
    <>
    <header className="shadow-lg h-20 px-10 bg-[#B0A1BA] border border-black">
      <div className="container flex flex-row justify-between items-center h-full mx-auto">
        <h1>Food Order Website</h1>
        <nav>
          <ul className="flex flex-row gap-6">
            <li>
              <Link to={"/home/hotels"}>
                <FaHome size={24} />  
              </Link>
            </li>
            <li>
              <Link to={"/home/cart"}>
                <FaShoppingCart size={24} />  
              </Link>
            </li>
            <li>
              <Link to={"/home/profile"}>
                <FaUser size={24} /> 
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
    <Outlet />
    <footer></footer>
  </>

  )
}
