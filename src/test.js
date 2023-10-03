 /* <table>
       
        <tbody>
          {data.map((city) => (
            <tr >
              <td>
                <button onClick={() => handleDelete(city.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>




       <th>ID</th>
            <th>City</th>
            <th>Latitude</th>
            <th>Longitude</th>
            <th>Action</th>