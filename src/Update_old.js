import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Update() {
  const [data, setData] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [updatedData, setUpdatedData] = useState({
    city: '',
    latitude: '',
    longitude: '',
  });

  useEffect(() => {
    // Fetch data to display (e.g., list of cities)
    axios.get('http://localhost:5000/api/get')
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleUpdate = async () => {
    if (!selectedCity) {
      console.error('No city selected for update.');
      return;
    }

    try {
      // Send a PUT request to your server's update endpoint
      const response = await axios.put(`http://localhost:5000/api/updateCity/${selectedCity.id}`, updatedData);
      console.log(response.data);

      // If the update is successful, you can choose to update your local data state or perform other actions as needed
      // For simplicity, we'll just clear the input fields
      setSelectedCity(null);
      setUpdatedData({
        city: '',
        latitude: '',
        longitude: '',
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Update City</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>City</th>
            <th>Latitude</th>
            <th>Longitude</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((city) => (
            <tr key={city.id}>
              <td>{city.id}</td>
              <td>{city.city}</td>
              <td>{city.latitude}</td>
              <td>{city.longitude}</td>
              <td>
                <button onClick={() => setSelectedCity(city)}>Update</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {selectedCity && (
          <>
            <label>
              City:
              <input
                type="text"
                name="city"
                value={updatedData.city}
                onChange={(e) => setUpdatedData({ ...updatedData, city: e.target.value })}
              />
            </label>
            <br />
          </>
        )}
        <label>
          Latitude:
          <input
            type="text"
            name="latitude"
            value={updatedData.latitude}
            onChange={(e) => setUpdatedData({ ...updatedData, latitude: e.target.value })}
          />
        </label>
        <br />
        <label>
          Longitude:
          <input
            type="text"
            name="longitude"
            value={updatedData.longitude}
            onChange={(e) => setUpdatedData({ ...updatedData, longitude: e.target.value })}
          />
        </label>
        <br />
        <button onClick={handleUpdate}>Update City</button>
      </div>
    </div>
  );
}

export default Update;
