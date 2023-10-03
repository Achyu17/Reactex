import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Delete() {
  const [data, setData] = useState([]);
  const [cityToDelete, setCityToDelete] = useState(null); // Store the ID of the city to delete

  useEffect(() => {
    // Fetch data to display (e.g., list of cities)
    axios.get('http://localhost:5000/api/get')
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = async () => {
    try {
      if (!cityToDelete) return; // Ensure a city to delete is selected

      // Send a DELETE request to your server's delete endpoint
      const response = await axios.delete(`http://localhost:5000/api/deleteCity/${cityToDelete}`);
      console.log(response.data);

      // If the deletion is successful, update your local data state or perform any other actions as needed
      const updatedData = data.filter((item) => item.id !== cityToDelete);
      setData(updatedData);

      // Reset the city to delete
      setCityToDelete(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Delete City</h1>
      <table>
        <thead>
          <tr>
            <th>City Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((city) => (
            <tr key={city.id}>
              <td>{city.name}</td>
              <td>
                <button onClick={() => setCityToDelete(city.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {cityToDelete !== null && ( // Check if a city is selected for deletion
        <div>
          <p>Are you sure you want to delete this city?</p>
          <button onClick={handleDelete}>Confirm Delete</button>
        </div>
      )}
    </div>
  );
}

export default Delete;
