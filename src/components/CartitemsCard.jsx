import React from 'react';

function CartitemsCard(props) {
    return (
        <article>
        <div className='w-[55rem] h-fit bg-transparent border border-black rounded-lg mx-4 px-3 py-1 flex flex-row  pb-2 mb-2'>
     <img  src="https://images.pexels.com/photos/1410235/pexels-photo-1410235.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Menu image" className='w-[10rem] h-[06rem] my-1 mx-6  rounded-lg' />
     <div>
     <h2>Item Name</h2>
     <span>₹ Item Price</span>
     <div className='item-count flex items-center space-x-4 border border-black w-[7rem] px-4  rounded-full '>
        <button className='px-1'>-</button>
        <span>0</span>
        <button>+</button>
      </div>
     </div>
        </div>
      </article>
    );
}

export default CartitemsCard;