import React from 'react'
import { Link, useLocation } from "react-router-dom";
import AddressCart from '../components/AddressCard';

export default function Address() {
  const location = useLocation();
  const fromCart = location.state?.fromCart || false;
  console.log(`AAA============>${fromCart}`)
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100">
      <AddressCart fromCart={fromCart}/>
    </div>
  )
}
