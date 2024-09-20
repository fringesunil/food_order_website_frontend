import React from 'react';
import { useNavigate } from 'react-router-dom';

function RestaurantCard(props) {
  const { hotel } = props;
  const navigate = useNavigate();

  const handleSelect = () => {
    navigate('/home/menu', { state: { hotel } });
  };

  return (
    <article onClick={handleSelect}>
      <div className='w-[16rem] h-fit bg-[#D9D9D9] border-2-white rounded-lg mx-2.5 px-1'>
        <img src={hotel.image} alt="Restaurant" className='w-[20rem] h-44' />
        <div className='flex flex-row justify-between'>
          <h2>{hotel.name}</h2>
        </div>
        <h2>{hotel.location}</h2>
      </div>
    </article>
  );
}


export default RestaurantCard;