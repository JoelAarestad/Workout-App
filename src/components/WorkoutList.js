import React, { useState, useEffect } from 'react';

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
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>Exercise</th>
            <th>Set</th>
            <th>Reps</th>
            <th>Weight</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {workouts.map((workout, index) => (
            <tr key={index}>
              <td>{workout.id}</td>
              <td>{workout.exercise}</td>
              <td>{workout.sets}</td>
              <td>{workout.reps}</td>
              <td>{workout.weight}</td>
              <td>{workout.date_added}</td>
              <td><button onClick={() => deleteWorkout(workout.id)}>Delete</button></td>
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
