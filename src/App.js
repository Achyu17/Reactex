import React, { useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';


import Home from './Home';
import Create from './Create';
import Distance from './Distance';
import Read from './Read';
import Delete from './Delete';
import Update from './Update';
import Result from './Result';

function App() {
  

  const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000', // Update this to match your server URL
  });
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
            <li>
              <Link to="/update">Update</Link>
            </li>
            <li>
              <Link to="/distance">Distance</Link>
            </li>
            {/* Add more navigation links here */}
          </ul>
        </nav>
 

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/distance" element={<Distance />} />
          <Route path="/read/:id" element={<Read />} />
          <Route path="/delete/:cityname" element={<Delete />} />
          <Route path="/update/:cityname" element={<Update />} />
          <Route path="/update" element={<Update />} />
          <Route path="/result/:cityname" element={<Result />} />
        </Routes>
      </div>
    </Router>


  );
}

export default App;
