import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import './Trips.css';

export default function Trips() {

  return (
    <div className='container mt-5 pt-2'>
      <div className='d-flex justify-content-end pe-5 me-5 mt-5'>
        <div className=' pb-2'>
          <NavLink to="/trips/nextTrips" className='p-2 trip-link' activeclassname="active"> الجولات القادمة</NavLink>
          <NavLink to="/trips/prevTrips" className='p-2 trip-link' activeclassname="active">  شاهد جولاتنا</NavLink>
        </div>
      </div>
      <Outlet />
    </div>
  );
}
