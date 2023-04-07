import React from 'react';
import "../css/Reps.css";
function Reps({reps, setReps}) {

  const handleRepsChange = (event) => {
    setReps(event.target.value);
  };

  return (
    <div class = "reps">
      <label>Reps:</label>
      <input type="number" value={reps} onChange={handleRepsChange}  />
    </div>
  );
}

export default Reps;