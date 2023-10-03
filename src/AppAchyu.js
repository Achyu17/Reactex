import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Create from './Create';
import 'bootstrap/dist/css/bootstrap.min.css';

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

function App() {
  // Define the coordinates of two specific cities
  const city1 = { name: 'Banglore', latitude: 12, longitude: 77 };
  const city2 = { name: 'Chennai', latitude: 13, longitude: 80 };
  const city3 = { name: 'Hubbali', latitude: 16, longitude: 76 };
  const city4 = { name: 'Varnasi', latitude: 25, longitude: 82 };

  // Calculate the distance between the two cities
  const distance = calculateDistance(city1.latitude, city1.longitude, city2.latitude, city2.longitude);
  const distance1 = calculateDistance(city3.latitude, city4.longitude, city4.latitude, city4.longitude);

  // Log the distance to the console
  useEffect(() => {
    console.log(`Distance between ${city1.name} and ${city2.name}: ${distance.toFixed(2)} km`);
    console.log(`Distance between ${city3.name} and ${city4.name}: ${distance1.toFixed(2)} km`);
  }, [distance]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Create' element={<Create />} />
      </Routes>
      <div>
        <h1>Distance Calculator</h1>
        <p>Distance between {city1.name} and {city2.name}: {distance.toFixed(2)} km</p>
        <p>Distance between {city3.name} and {city4.name}: {distance1.toFixed(2)} km</p>
      </div>
    </BrowserRouter>
  );
}

export default App;
