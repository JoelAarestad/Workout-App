const sqlite3 = require('sqlite3').verbose();
const express = require('express');
const router = express.Router();

const db = new sqlite3.Database('./workout.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the workout database.');
});

router.post('/api/workouts', (req, res) => {
  const sets = req.body;
  console.log('Incoming sets data:', sets); // Logs the incoming sets data
  console.log('Request headers:', req.headers); // Logs the request headers

  let successfulInsertions = 0;
  let combinedSets = {};

  sets.forEach((set) => {
    const { selectedOption, set: setNumber, reps, weight } = set;
    const key = `${selectedOption}-${reps}-${weight}`;

    if (combinedSets[key]) {
      combinedSets[key].count++;
    } else {
      combinedSets[key] = {
        selectedOption,
        reps,
        weight,
        count: 1,
      };
    }
  });

  Object.values(combinedSets).forEach((set) => {
    const { selectedOption, reps, weight, count } = set;

    // Inserts the workout data into the database
    db.run(
      `INSERT INTO workouts (exercise, sets, reps, weight) VALUES (?, ?, ?, ?)`,
      [selectedOption, count, reps, weight],
      (err) => {
        if (err) {
          console.error('Error:', err); // Logs the error if insertion fails
          return res.status(500).json({ error: err.message });
        } else {
          successfulInsertions++;

          // If all insertions were successful, sends a success response
          if (successfulInsertions === Object.keys(combinedSets).length) {
            res.status(200).json({ message: 'Workout data saved successfully!' });
          }
        }
      }
    );
  });
});


router.get('/api/workouts', (req, res) => {
  db.all('SELECT * FROM workouts WHERE date_added >= datetime("now", "-2 days")', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json(rows);
    }
  });
});


router.delete('/api/workouts/:id', (req, res) => {
  const workoutId = req.params.id;

  db.run('DELETE FROM workouts WHERE id = ?', [workoutId], (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json({ message: 'Workout data deleted successfully!' });
    }
  });
});
module.exports = router;
