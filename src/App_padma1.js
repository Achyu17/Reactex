import React, { useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Home from './Home';
import Create from './Create';
import Read from './Read';
import Delete from './Delete';
import Update from './Update';
import Result from './Result';

function App() {
  const [sourceCity, setSourceCity] = useState('');
  const [destinationCity, setDestinationCity] = useState('');
  const [distance, setDistance] = useState(null);

  const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000', // Update this to match your server URL
  });

  const [SourceDataJson,setSourceDataJson] = useState("");
  const [DestDataJson,setDestDataJson] = useState("");

  useEffect(() => {
    fetchCoordinates().then((randomData) => {
      const data = JSON.stringify(randomData.data);
      setSourceDataJson(data || "not found");
    });
  }, []);
  return (
    <div>
      <pre>
        <p>{SourceDataJson}</p>
      </pre>
    </div>
  );
}

  const handleSubmit = async (e) => {
    e.preventDefault();

    //try {
      // Fetch latitude and longitude for source city
      const [SourceDataJson,setSourceDataJson] = useState("");
      const sourceData = await fetchCoordinates(sourceCity);
      fetchCoordinates().then((randomData) => {
        const data = JSON.stringify(randomData.data);
        setSourceDataJson(data || "not found");
      });

      console.log(sourceData);
      // Fetch latitude and longitude for destination city
      const destinationData = await fetchCoordinates(destinationCity);
      console.log(destinationData);

      // Calculate distance between the two cities
     // const calculatedDistance = async (sourceData.latitude,  sourceData.longitude,  destinationData.latitude, destinationData.longitude) => 
      // Function to calculate distance between two sets of coordinates
 /* const calculateDistance = async (sourceData.latitude,  sourceData.longitude,  destinationData.latitude, destinationData.longitude) => {
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
  };*/

 
    }
  

      
  // Function to fetch coordinates for a city from the server
  const fetchCoordinates = async (city) => {
    try {
      const response = await axiosInstance.get(`/api/getCoordinates?city=${city}`);
    //  const parseData = JSON.parse(response);
      //console.log("in fetchcordinates"+parseData)
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  // Function to calculate distance between two sets of coordinates
  /*const calculateDistance = async (lat1, lon1, lat2, lon2) => {
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
  };*/

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/create">Create</Link>
            </li>
            {/* Add more navigation links here */}
          </ul>
        </nav>

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

<input
              type="text"
              id="distance1"
              value=""
              //onChange={(e) => setDestinationCity(e.target.value)}
              //required
            />

          </div>
          <button type="submit">Calculate Distance</button>
        </form>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/read/:id" element={<Read />} />
          <Route path="/delete/:cityname" element={<Delete />} />
          <Route path="/update/:cityname" element={<Update />} />
          <Route
            path="/result"
            element={<Result sourceCity={sourceCity} destinationCity={destinationCity}  />}
          />
        </Routes>

        {distance !== null && (
          <p>
            Distance between {sourceCity} and {destinationCity}: {distance.toFixed(2)} km
          </p>
        )}
      </div>
    </Router>
  );
        };

export default App;
