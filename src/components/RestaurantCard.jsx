import React from 'react';

function RestaurantCard(props) {
    return (
      <article>
        <div className='w-[16rem] h-fit bg-[#D9D9D9] border-2-white rounded-lg mx-8 px-3'>
        <img  src="https://images.pexels.com/photos/1410235/pexels-photo-1410235.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Restaurant" className='w-[20rem] h-44' />
      <div className='flex flex-row justify-between'>
      <h2>Hotel Name</h2>
      <span>4</span>
      </div>
        <h2>Location</h2>
        </div>
      </article>
            
        
    );
}

export default RestaurantCard;