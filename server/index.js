const express = require('express');
const cors = require('cors');
const fs = require('fs');
const bodyParser = require('body-parser');
const exerciseRoutes = require('./routes/exerciseRoutes');
const workoutDbRoutes = require('./routes/database'); // Import the workoutDb routes

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(exerciseRoutes);
app.use(workoutDbRoutes); // Use the workoutDb routes

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
