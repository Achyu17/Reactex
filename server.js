import express from 'express';
import bodyParser from 'body-parser';
import mysql from 'mysql';
import cors from 'cors';

const app = express();

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root@1234',
  database: 'testdb',
});

connection.connect((err) => {
  if (err) {
    console.error("MySQL connection error: " + err.message);
  } else {
    console.log("Connected to MySQL database");
  }
});

//app.use(cors());

app.use(cors({
  
  methods: ['GET','POST']
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const PORT = 5000;

app.get('/api/get', (req, res) => {
  const sql = "SELECT * FROM citinew";
  connection.query(sql, (err, result) => {
    if (err) {
      console.error("MySQL select error: " + err.message);
      res.status(500).json({ message: "Failed to retrieve city data" });
    } else {
      res.status(200).json(result);
    }
  });
});

app.get('/api/get/:id', (req, res) => {
  const cityId = req.params.id;
  const sql = "SELECT * FROM citinew where ID=?";
  connection.query(sql,cityId, (err, result) => {
    if (err) {
      console.error("MySQL select error: " + err.message);
      res.status(500).json({ message: "Failed to retrieve city data" });
    } else {
      res.status(200).json(result);
    }
  });
});

app.post('/api/add', (req, res) => {
  const { cname, clat, clon } = req.body;
  const sql = "INSERT INTO citinew (City, Latitude, Longitude) VALUES (?, ?, ?)";
  console.log("cname is:Latitude+: Longitude"+cname+":"+clat+"Longi:"+clon);

  connection.query(sql, [cname, clat, clon], (err, result) => {
    if (err) {
      console.error("MySQL insert error: " + err.message);
      res.status(500).json({ message: "Failed to add city" });
    } else {
      res.status(200).json({ message: "City added successfully" });
    }
  });
});

app.delete('/api/deleteCity/:cityId', (req, res) => {
  const cityIdToDelete = req.params.cityId;
  console.log("ID to delete"+cityIdToDelete);
  if (!cityIdToDelete) {
    return res.status(400).json({
      msg: "City ID is required for deletion",
      status: 400,
    });
  }
  const sql = "DELETE FROM citinew WHERE id = ?";

  connection.query(sql, [cityIdToDelete], (err, result) => {
    if (err) {
      console.error("MySQL delete error: " + err.message);
      res.status(500).json({ message: "Failed to delete city" });
    } else {
      console.log(`Deleted city with ID: ${cityIdToDelete}`);
      res.status(200).json({ message: "City deleted successfully" });
    }
  });
});

app.put('/api/updateCity/:cityId', (req, res) => {
  const cityIdToUpdate = req.params.cityId;
  const updatedData = req.body;

  if (!cityIdToUpdate) {
    return res.status(400).json({
      msg: "City ID is required for updating",
      status: 400,
    });
  }

  // Perform the update operation in your MySQL database
  connection.query(
    "UPDATE citinew SET ? WHERE id = ?",
    [updatedData, cityIdToUpdate],
    (err, result) => {
      if (err) {
        console.error("MySQL update error: " + err.message);
        res.status(500).json({
          msg: "Failed to update city",
          status: 500,
        });
      } else {
        console.log(`Updated city with ID: ${cityIdToUpdate}`);
        res.json({
          msg: "City Updated",
          status: 200,
        });
      }
    }
  );
});

app.get('/api/getCoordinates', (req, res) => {
  const city = req.query.city;
  const sql = 'SELECT Latitude, Longitude FROM citinew WHERE City = ?';

  connection.query(sql, [city], (err, result) => {
    if (err) {
      console.error('MySQL query error: ' + err.message);
      res.status(500).json({ error: 'Failed to retrieve coordinates' });
    } else {
      if (result.length === 0) {
        res.status(404).json({ error: 'City not found' });
      } else {
        res.json(result[0]);
      }
    }
  });
});

// API endpoint to calculate distance between two sets of coordinates
app.post('/api/calculateDistance', (req, res) => {
  const { lat1, lon1, lat2, lon2 } = req.body;

  // Haversine formula to calculate distance
  const earthRadiusKm = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = earthRadiusKm * c;

  res.json({ distance });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
