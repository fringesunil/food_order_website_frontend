import React, { useEffect, useState } from 'react';
import MenuCard from '../components/MenuCard';
import { useLoaderData, useLocation } from 'react-router-dom';
import axios from 'axios';

function Menu() {
  const location = useLocation();
  const { hotel } = location.state || {};
  const [menulist, setMenuList] = useState([]);


  useEffect(() => {
    if (hotel?._id) {
      axios.get(`http://localhost:3000/menu?restaurant_id=${hotel._id}`)
        .then((response) => {
          setMenuList(response.data);
        })
        .catch((error) => {
          console.error('Error fetching menu:', error);
        });
    }
  }, [hotel]);
  
  return (
    <main className='bg-[#B0A1BA] h-screen'>
      <section className='py-2 px-2'>
        <div className='grid grid-cols-5 gap-4'>
        {menulist.map((menu) => (
            <MenuCard key={menu._id} menu={menu} />
          ))}
        </div>
      </section>
    </main>
  );
}


export default Menu;