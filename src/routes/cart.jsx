import React from 'react';
import { Link, useLoaderData, useNavigate } from 'react-router-dom';
import CartitemsCard from '../components/CartitemsCard';
import axios from 'axios';
import CouponForm from '../components/CouponForm';

export async function loader() {
  const userId = localStorage.getItem('userId');
  const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/cart?user_id=${userId}`);
  const carts = response.data;
  return { carts };
}

export default function Cart() {
  const { carts } = useLoaderData();
  const navigate = useNavigate();
  const totalAmount = carts.length > 0 ? carts[0].total_amount : 0; 
  const gstAmount = carts.length > 0 ? carts[0].gst_amount : 0;
  const discount = carts.length > 0 ? carts[0].discount : 0;

  const handleCreateOrder = async () => {
    const userId = localStorage.getItem('userId');
    const cartItems = carts.length > 0 ? carts[0].cart_items.map(item => ({
      menu_id: item.menu_id._id, 
      quantity: item.quantity, 
    })) : [];
    
    const orderData = {
      user_id: userId,
      total_amount: totalAmount,
      discount: discount,
      gst_amount: gstAmount,
      cart_items: cartItems,
    };
  
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_BASE_URL}/order/initorder`, { total_amount: totalAmount + gstAmount });
  
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: data.currency,
        name: 'Fringe Creations',
        description: 'Order Payment',
        order_id: data.id, 
        handler: async function (paymentResponse) {
          const razorpay_payment_id = paymentResponse.razorpay_payment_id;
          const razorpay_order_id = paymentResponse.razorpay_order_id;
          const razorpay_signature = paymentResponse.razorpay_signature;
          const orderResponse = await axios.post(`${import.meta.env.VITE_BASE_URL}/order`, {
            ...orderData,
            razorpay_payment_id,
            razorpay_order_id,
            razorpay_signature,
          });
  
          if (orderResponse.status === 200) {
            await axios.delete(`${import.meta.env.VITE_BASE_URL}/cart/${carts[0]._id}`);
            navigate(`/home/hotels`);
            alert('Order Placed Successfully');
          }
        },
        theme: {
          color: '##A5B5BF',
        },
      };
  
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to proceed with payment');
    }
  };
  

  return (
    <main className='bg-[#B0A1BA] h-screen'>
      <section>
        <div className='flex flex-row'>
          <div className='w-[59rem] h-screen bg-transparent border-r border-black px-3 py-1'>
            {carts && carts.length > 0 ? ( 
              carts.map(cart => (
                <CartitemsCard key={cart._id} cart={cart} /> 
              ))
            ) : (
              <p className='py-52 px-52 w-[57rem]'>No items in the cart.</p> 
            )}
          </div>
          <div className='w-[59rem] h-screen bg-transparent border-r border-black px-3 py-2'>
            <h2>Coupon Code</h2>
              <CouponForm cartId={carts && carts.length > 0 ? carts[0]._id : 0}/>  
            <h2 className='py-4'>Bill Details</h2>
            <div className='flex justify-between'>
              <span>Item Total</span>
              <span>₹ {totalAmount.toFixed(2)}</span>
            </div>
            <div className='flex justify-between'>
              <span>Discount</span>
              <span>₹ {discount.toFixed(2)}</span>
            </div>
            <div className='flex justify-between'>
              <span>GST</span>
              <span>₹ {gstAmount.toFixed(2)}</span>
            </div>
            <div className="border-b border-black my-2"></div>

            <div className='flex justify-between font-bold pb-4'>
              <span>To Pay</span>
              <span>₹ {(totalAmount + gstAmount).toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <button className="w-full bg-[#A5B5BF] text-black font-bold py-2 px-4 rounded-full border-2 border-black" type="button" onClick={handleCreateOrder}>
                  Proceed To Pay
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
