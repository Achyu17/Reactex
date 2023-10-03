import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

function Home() {
  const [inputs, setInputs] = useState({});
  const [data, setData] = useState([]);
  
  useEffect(() => {
    axios.get('http://localhost:5000/api/get')
      .then(res => setData(res.data))
      .catch(err => console.log(err));
  }, []);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({ ...values, [name]: value }))
  }

  const handleSubmit = async (event) => {
    alert("in submit");
    event.preventDefault();
  }

  return (
    <div>
      <div>
        <h1>Add City details</h1>
        
        <table >
          <thead>
            <tr>
              <th>ID</th>
              <th>City</th>
              <th>Latitude</th>
              <th>Longitude</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {data.map((Cities, index) => {
              return (
                <tr key={index}>
                  <td>{Cities.id}</td>
                  <td>{Cities.City}</td>
                  <td>{Cities.Latitude}</td>
                  <td>{Cities.Longitude}</td>
                  <td>
                    <Link to={`/read/${Cities.City}`}>Read</Link>
                    </td>
                    <td>
                                       <Link to={`/delete/${Cities.id}`}>Delete</Link>
                    </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home;
