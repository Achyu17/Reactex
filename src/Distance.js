import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function Distance() {
    const [sourceCity, setSourceCity] = useState('');
    const [destinationCity, setDestinationCity] = useState('');
    const [distance, setDistance] = useState(null); 

    const axiosInstance = axios.create({
        baseURL: 'http://localhost:5000', // Update this to match your server URL
      });

const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Fetch latitude and longitude for source city
      const sourceData = await fetchCoordinates(sourceCity);
      const { Latitude: sourceLat, Longitude: sourceLon } = sourceData;

      // Fetch latitude and longitude for destination city
      const destinationData = await fetchCoordinates(destinationCity);
      const { Latitude: destLat, Longitude: destLon } = destinationData;

      // Calculate distance between the two cities
      const calculatedDistance = await calculateDistance(sourceLat, sourceLon, destLat, destLon);

      // Set the calculated distance
      setDistance(calculatedDistance);
    } catch (error) {
      console.error(error);
      setDistance(null);
    }
  };

  const calculateDistance = async (lat1, lon1, lat2, lon2) => {
    try {
      const response = await axiosInstance.post('/api/calculateDistance', {
        lat1,
        lon1,
        lat2,
        lon2,
      });
      return response.data.distance;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const fetchCoordinates = async (city) => {
    try {
      const response = await axiosInstance.get(`/api/getCoordinates?city=${city}`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return (
  
<div>
        <h1>Distance Calculator</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="sourceCity">Source City:</label>
            <input
              type="text"
              id="sourceCity"
              value={sourceCity}
              onChange={(e) => setSourceCity(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="destinationCity">Destination City:</label>
            <input
              type="text"
              id="destinationCity"
              value={destinationCity}
              onChange={(e) => setDestinationCity(e.target.value)}
              required
            />
          </div>
          <button type="submit">Calculate Distance</button>
        </form>


        {distance !== null && (
          <p>
            Distance between {sourceCity} and {destinationCity}: {distance.toFixed(2)} km
          </p>
        )}
        </div>)
}
        
        export default Distance;