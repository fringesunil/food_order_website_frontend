import React from 'react';
import MenuCard from '../components/MenuCard';

function Menu(props) {
    return (
        <main className='bg-[#B0A1BA] h-screen'>
        <section className='py-2 px-2'>
          <div className='grid grid-cols-5 gap-4'>
        <MenuCard/>
        <MenuCard/>
        <MenuCard/>
        <MenuCard/>
        <MenuCard/>
        <MenuCard/>
          </div>
        </section>
      </main>
    );
}

export default Menu;