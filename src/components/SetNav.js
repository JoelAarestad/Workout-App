import React, { useState } from 'react';
import Dropdown from './Dropdown'; // importing a custom Dropdown component
import Weight from './Weight';
import Reps from './Reps';
import '../css/SetNav.css';
const SetNav = () => {
  // Define state variables for the component using the useState hook
  const [selectedSet, setSelectedSet] = useState(0); // stores the index of the currently selected set
  const [sets, setSets] = useState([{ 
      selectedOption: '',
      set: 1, 
      reps: 0,
      weight: 0
    }]); // an array of sets, each with a number and a selected option

  // Define a function to move to the next or previous set in the array, or add a new set if the end is reached
  const moveToSet = (offset) => {
    const newSelectedSet = selectedSet + offset; // calculate the index of the new selected set
    if (newSelectedSet >= 0 && newSelectedSet < sets.length) { // check if the new index is within the array bounds
      setSelectedSet(newSelectedSet); // update the selected set state
    } else if (offset > 0) { // if the offset is positive, add a new set to the end of the array
      const newSet = {selectedOption: '' , set: sets.length + 1,   reps: 0, weight: 0}; // create a new set object with a number and no selected option
      setSets([...sets, newSet]); // update the sets state by creating a new array with all previous sets and the new set
      setSelectedSet(sets.length); // update the selected set state to the new set index
    }
  };

  // Define a function to delete the last set in the array
  const deleteLastSet = () => {
    if (sets.length > 1) { // check if there is more than one set in the array
      const newSets = sets.slice(0, -1); // create a new array without the last set
      setSets(newSets); // update the sets state
      if (selectedSet === sets.length - 1) { // if the deleted set was the last one and was selected, update the selected set state
        setSelectedSet(selectedSet - 1);
      }
    }
  };

  // Define a function to handle a change in the specified attribute for the current set
  const handleAttributeChange = (attribute, newValue) => {
    const newSets = sets.map((set, index) =>
      index === selectedSet ? { ...set, [attribute]: newValue } : set
    );
    setSets(newSets);
  };

  return (
   
      <div>
        <Weight weight={sets[selectedSet].weight}
          setWeight={(newWeight) => handleAttributeChange('weight', newWeight)}
        />
        <Reps reps={sets[selectedSet].reps}
          setReps={(newReps) => handleAttributeChange('reps', newReps)}
        />
       
      <Dropdown selectedOption={sets[selectedSet].selectedOption}
        onOptionChange={(newSelectedOption) =>
          handleAttributeChange('selectedOption', newSelectedOption)
        }
      />
      <p>Current Set: {sets[selectedSet].set}</p>
      <button onClick={() => moveToSet(-1)}>Previous Set</button>
      <button onClick={() => moveToSet(1)}>Next Set</button>
      <button onClick={deleteLastSet}>Delete Last Set</button>
      <p>Data for the current set (JSON format):</p>
      <pre>{JSON.stringify(sets[selectedSet], null, 2)}</pre>
      <p>{sets.length}</p>
    </div>
  );
};

export default SetNav;