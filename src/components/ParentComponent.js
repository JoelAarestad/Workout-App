//ParentComponent.js
import React, { useState } from 'react';
import Dropdown from './Dropdown';
import Weight from './Weight';
import Reps from './Reps';
 
import SetData from './SetData';
import NavButtons from './NavButtons';
import SubmitButton from './SubmitButton';
import WorkoutList from './WorkoutList';

const ParentComponent = () => {
  const [selectedSet, setSelectedSet] = useState(0);
  const [setData, setSets] = useState([{ selectedOption: '', set: 1, reps: 0, weight: 0 }]);

  const moveToSet = (offset) => {
    const newSelectedSet = selectedSet + offset;
    if (newSelectedSet >= 0 && newSelectedSet < setData.length) {
      setSelectedSet(newSelectedSet);
    } else if (offset > 0) {
      setSets([...setData, { ...setData[selectedSet], set: setData.length + 1 }]);
      setSelectedSet(setData.length);
    }
  };

  const deleteLastSet = () => {
    setData.length > 1 && setSets(
        setData.slice(0, -1),
        setSelectedSet(selectedSet === setData.length - 1 ? selectedSet - 1 : selectedSet)
      );
  };

  const handleAttributeChange = (attribute, newValue) =>
    setSets(setData.map((set, index) => index === selectedSet ? { ...set, [attribute]: newValue } : set)
    );

  const { weight, reps, selectedOption } = setData[selectedSet];

  return (
    <div>
      <Weight weight={weight} setWeight={(newWeight) => handleAttributeChange('weight', newWeight)} />
      <Reps reps={reps} setReps={(newReps) => handleAttributeChange('reps', newReps)} />
      <Dropdown selectedOption={selectedOption} onOptionChange={(newSelectedOption) => handleAttributeChange('selectedOption', newSelectedOption)} />
 
      <WorkoutList />
      <SetData sets={setData} selectedSet={selectedSet} />
      <SubmitButton sets={setData} />
      <NavButtons onMoveToSet={moveToSet} onDeleteLastSet={deleteLastSet} />
 
    </div>
  );
};

export default ParentComponent;
