
import './App.css';
//import React from 'react'
import React, { useState, useEffect } from 'react';

import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './Home'
import Create from './Create'

//import calculateDistance from './calculateDistance.js';
import 'bootstrap/dist/css/bootstrap.min.css'

function calculateDistance(lat1, lon1, lat2, lon2) {
    // Radius of the Earth in kilometers
    const earthRadius = 6371;
  
    // Convert latitude and longitude from degrees to radians
    const lat1Rad = toRadians(lat1);
    const lon1Rad = toRadians(lon1);
    const lat2Rad = toRadians(lat2);
    const lon2Rad = toRadians(lon2);
  
    // Haversine formula
    const dLat = lat2Rad - lat1Rad;
    const dLon = lon2Rad - lon1Rad;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1Rad) * Math.cos(lat2Rad) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
    // Calculate the distance
    const distance = earthRadius * c;
  
    return distance;
  }
  
  function toRadians(degrees) {
    return degrees * (Math.PI / 180);
  }

function Appnew() {
   // Define the coordinates of two specific cities
   const city1 = { name: 'City 1', latitude: 52.5200, longitude: 13.4050 };
   const city2 = { name: 'City 2', latitude: 48.8566, longitude: 2.3522 };
 
   // Calculate the distance between the two cities
   const distance = calculateDistance(city1.latitude, city1.longitude, city2.latitude, city2.longitude);
 
   // Log the distance to the console
   useEffect(() => {
     console.log(`Distance between ${city1.name} and ${city2.name}: ${distance.toFixed(2)} km`);
   }, [distance]);
  return(

    <BrowserRouter>
    <Routes>
<Route path='/' element={<Home/>} />
<Route path='/Create' element={<Create/>} />
    </Routes>
    </BrowserRouter>
  )


}
 
  export default Appnew;  