import React from 'react';

function MenuCard(props) {
    return (
        <article>
        <div className='w-[16rem] h-fit bg-transparent border border-black rounded-lg mx-4 px-3 py-1'>
     <img  src="https://images.pexels.com/photos/1410235/pexels-photo-1410235.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Menu image" className='w-[20rem] h-[09rem]  rounded-lg' />
      <div className='flex flex-row justify-between pb-2'>
      <h2>Item Name</h2>
      <span>₹ Item Price</span>
      </div>
     <div className='pb-2'>
     <div className='item-count flex items-center space-x-4 border border-black w-[7rem] px-4  rounded-full '>
        <button className='px-1'>-</button>
        <span>0</span>
        <button>+</button>
      </div>
     </div>
      <button className=' item-count flex items-center space-x-4 border border-black w-[7rem] px-3 rounded-[8px] bg-[#A5B5BF]'>Add to cart</button>
        </div>
      </article>
    );
}

export default MenuCard;