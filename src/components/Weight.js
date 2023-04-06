import React, { useState } from 'react';
import "../css/Weight.css";

function Weight({weight, setWeight}) {

  const handleWeightChange = (event) => {
    setWeight(event.target.value);
  };

  return (
    <div>
      <label>Weight:</label>
      <input type="number" value={weight} onChange={handleWeightChange} className="WeightInput" />
    </div>
  );
}

export default Weight;