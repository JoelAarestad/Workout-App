//SubmitButton.js
import React from 'react';

const SubmitButton = ({ sets }) => {
  const handleSubmit = async () => {
    try {
      const response = await fetch('http://192.168.1.100:3000/api/workouts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sets),
      });

      if (response.ok) {
        alert('Workout data saved successfully!');
      } else {
        alert('Error: Could not save workout data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <button onClick={handleSubmit}>
      Submit Workout
    </button>
  );
};

export default SubmitButton;
