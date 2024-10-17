import React, { useEffect, useState } from 'react';
import MenuCard from '../components/MenuCard';
import { useLoaderData, useLocation } from 'react-router-dom';
import axios from 'axios';
import { SnackbarProvider, useSnackbar } from 'notistack';

function Menu() {
  const location = useLocation();
  const { hotel } = location.state || {};
  const [menulist, setMenuList] = useState([]);


  useEffect(() => {
    if (hotel?._id) {
      axios.get(`${import.meta.env.VITE_BASE_URL}/menu?restaurant_id=${hotel._id}`)
        .then((response) => {
          setMenuList(response.data);
        })
        .catch((error) => {
          console.error('Error fetching menu:', error);
        });
    }
  }, [hotel]);
  
  return (
    <main className='bg-[#B0A1BA] min-h-full pb-5'>
      <section className='py-2 px-2'>
      <h1 className="text-6xl font-bold text-center text-black py-4 px-2 font-ruge tracking-wide">Menu</h1>
        <div className='grid grid-cols-5 gap-4'>
        {menulist.map((menu) => (
           <SnackbarProvider maxSnack={3}> 
            <MenuCard key={menu._id} menu={menu} />
            </SnackbarProvider>
          ))}
        </div>
      </section>
    </main>
  );
}


export default Menu;