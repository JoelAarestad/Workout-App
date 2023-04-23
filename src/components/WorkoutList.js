import React, { useState, useEffect } from 'react';
import '../css/WorkoutList.css';
const WorkoutList = () => {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await fetch('http://192.168.1.100:3000/api/workouts');
        if (response.ok) {
          const data = await response.json();
          setWorkouts(data);
        } else {
          console.error('Error fetching workout data:', response.status);
        }
      } catch (error) {
        console.error('Error fetching workout data:', error);
      }
    };

    fetchWorkouts();
  }, []);


  const deleteWorkout = async (id) => {
    try {
      const response = await fetch(`http://192.168.1.100:3000/api/workouts/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setWorkouts(workouts.filter((workout) => workout.id !== id));
      } else {
        console.error('Error deleting workout data:', response.status);
      }
    } catch (error) {
      console.error('Error deleting workout data:', error);
    }
  };

  const renderTable = () => {
    return (
      <table class="my-table">
      <thead>
        <tr>
          <th class="my-table-header">Exercise</th>
          <th class="my-table-header">Set</th>
          <th class="my-table-header">Reps</th>
          <th class="my-table-header">Weight</th>
          <th class="my-table-header">Action</th>
        </tr>
      </thead>
      <tbody>
        {workouts.map((workout, index) => (
          <tr key={index}>
            <td class="my-table-cell">{workout.exercise}</td>
            <td class="my-table-cell">{workout.sets}</td>
            <td class="my-table-cell">{workout.reps}</td>
            <td class="my-table-cell">{workout.weight}</td>
            <td class="my-table-cell">{workout.date_added}</td>
            <td class="my-table-cell"><button class="my-button" onClick={() => deleteWorkout(workout.id)}>Delete</button></td>
          </tr>
        ))}
      </tbody>
    </table>
    );
  };

  return (
    <div>
      {workouts.length > 0 ? renderTable() : <p>No workouts found</p>}
    </div>
  );
};

export default WorkoutList;
