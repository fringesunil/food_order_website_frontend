import React from 'react';
import RestaurantCard from '../components/RestaurantCard';
import axios from 'axios';
import { useLoaderData } from 'react-router-dom';
import Slider from 'react-slick'; // Importing the slider component
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


export async function loader() {
  const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/restaurants`);
  const hotels = response.data;
  return { hotels };
}

export default function Hotels() {
  const { hotels } = useLoaderData();

  // Settings for the slider
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const sliderImages = [
    'https://res.cloudinary.com/drinn62yk/image/upload/v1728692158/Orange_Asian_Food_Facebook_Cover_hvhieh.png',
    'https://res.cloudinary.com/drinn62yk/image/upload/v1728692387/Simple_Photo_Modern_Pizza_Food_Facebook_Cover_fd7ud9.png',
    'https://res.cloudinary.com/drinn62yk/image/upload/v1728692387/Green_Stripe_Cloth_Flatlay_Healthy_Food_Facebook_Cover_mcwnxr.png',
  ];

  return (
    <main className='bg-[#B0A1BA] min-h-full pb-5'>
      <section className='bg-orange-300 h-[20rem]'>
        <Slider {...sliderSettings}>
          {sliderImages.map((image, index) => (
            <div key={index}>
              <img src={image} alt={`Slide ${index}`} className="w-full h-[20rem] object-cover" />
            </div>
          ))}
        </Slider>
      </section>
      <section className='py-2 px-2'>
      <h1 className="text-8xl font-bold text-center text-black py-4 px-2 font-ruge tracking-wide">Restaurants</h1>
        <div className='grid grid-cols-5 gap-4'>
          {hotels.map((hotel) => {
            return <RestaurantCard key={hotel._id} hotel={hotel} />;
          })}
        </div>
      </section>
    </main>
  );
}
