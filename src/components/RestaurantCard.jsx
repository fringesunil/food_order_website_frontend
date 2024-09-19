import React from 'react';
import { Link } from "react-router-dom";

function RestaurantCard(props) {
  const hotel =props.hotel
    return (
      <article>
        <div className='w-[16rem] h-fit bg-[#D9D9D9] border-2-white rounded-lg mx-2.5 px-1'>
            <Link to={`/home/menu`}>
            <img  src={hotel.image} alt="Restaurant" className='w-[20rem] h-44' />
            </Link>
      
      <div className='flex flex-row justify-between'>
      <h2>{hotel.name}</h2>
      {/* <span>4</span> */}
      </div>
        <h2>{hotel.location}</h2>
        </div>
      </article>
            
        
    );
}

export default RestaurantCard;