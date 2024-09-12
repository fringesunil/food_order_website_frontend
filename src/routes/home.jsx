import React from 'react'
import { Link, Outlet } from "react-router-dom";

export default function Home() {
  return (
    <>
       <header className="shadow-lg h-20 px-10 bg-[#B0A1BA] border border-black">
       <div className="container flex flex-row justify-between items-center h-full mx-auto">
       <h1>Food Order Website</h1>
        <nav >
            <ul className="flex flex-row gap-6 ">
                <li>
                    <Link to={"/home/hotels"}>Home</Link>
                </li>
                <li>
                <Link to={"/home/cart"}>Cart</Link>
                </li>
                <li>
                <Link to={"/home/profile"}>Profile</Link>
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
