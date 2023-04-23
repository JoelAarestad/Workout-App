import React, { useState, useEffect } from 'react';
import '../css/Dropdown.css';
function Dropdown({ selectedOption, onOptionChange }) {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    fetchExercises();
  }, []);

  const fetchExercises = () => {
    fetch('http://192.168.1.100:3000/exercises')
      .then((response) => response.json())
      .then((data) => {
        setExercises(data);
      });
  };

  const handleSelectChange = (event) => {
    onOptionChange(event.target.value);
  };

  const handleDeleteClick = () => {
    if (selectedOption) {
      fetch(`http://192.168.1.100:3000/exercises/${selectedOption}`, {
        method: 'DELETE',
      })
        .then((response) => response.json())
        .then((data) => {
          setExercises(data);
          onOptionChange(''); // Clear the selected option
        });
    }
  };

  return (
    <div>
      <label>

        <select value={selectedOption} onChange={handleSelectChange}>
          <option value="">Select a exercise</option>
          {exercises.map((exercise, index) => (
            <option key={index} value={exercise.Exercise}>
              {exercise.Exercise}
            </option>
          ))}
        </select>
      </label>
      <button onClick={handleDeleteClick}>Delete</button>
    </div>
  );
}

export default Dropdown;
