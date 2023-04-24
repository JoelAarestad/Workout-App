const express = require('express');
const fs = require('fs');
const router = express.Router();

router.get('/exercises', (req, res) => {
  fs.readFile('exercises.json', (err, data) => {
    if (err) {
      res.status(500).send('Error reading exercises.json');
    } else {
      res.json(JSON.parse(data));
    }
  });
});

router.delete('/exercises/:exercise', (req, res) => {
  const exerciseToDelete = req.params.exercise;

  fs.readFile('exercises.json', (err, data) => {
    if (err) {
      res.status(500).send('Error reading exercises.json');
    } else {
      const exercisesArray = JSON.parse(data);
      const updatedExercises = exercisesArray.filter(
        (exercise) => exercise.Exercise !== exerciseToDelete
      );

      fs.writeFile('exercises.json', JSON.stringify(updatedExercises, null, 2), (err) => {
        if (err) {
          res.status(500).send('Error writing to exercises.json');
        } else {
          res.json(updatedExercises);
        }
      });
    }
  });
});

router.post('/', (req, res) => {
  const formData = req.body;

  fs.readFile('exercises.json', (err, data) => {
    if (err) {
      // If the file doesn't exist, create a new array with the form data
      const formDataArray = [formData];
      // Write the new form data to the file
      fs.writeFile('exercises.json', JSON.stringify(formDataArray, null, 2), (err) => {
        if (err) {
          res.status(500).send('Error writing to exercises.json');
        } else {
          res.send('Form data written to file!');
        }
      });
    } else {
      // If the file exists, parse the JSON data and append the new form data to the array
      const formDataArray = JSON.parse(data);
      formDataArray.push(formData);
      // Write the updated form data to the file
      fs.writeFile('exercises.json', JSON.stringify(formDataArray, null, 2), (err) => {
        if (err) {
          res.status(500).send('Error writing to exercises.json');
        } else {
          res.send('Form data appended to file!');
        }
      });
    }
  });
});

module.exports = router;
