import React from 'react';

function CartitemsCard(props) {
  const { cart } = props;
  const { cart_items } = cart;

  return (
    <article>
      {cart_items.map((item) => {
        const { menu_id, quantity } = item;
        const { name, price, image } = menu_id;

        return (
          <div key={item._id} className='w-[55rem] h-fit bg-transparent border border-black rounded-lg mx-4 px-3 py-1 flex flex-row pb-2 mb-2'>
            <img src={image} alt={name} className='w-[10rem] h-[6rem] my-1 mx-6 rounded-lg' />
            <div>
              <h2>{name}</h2>
              <span>₹ {price}</span> 
              <div className='item-count flex items-center space-x-4 border border-black w-[7rem] px-4 rounded-full'>
                <button className='px-1'>-</button>
                <span>{quantity}</span> 
                <button>+</button>
              </div>
            </div>
          </div>
        );
      })}
    </article>
  );
}

export default CartitemsCard;
