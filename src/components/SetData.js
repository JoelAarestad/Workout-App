import React from 'react';

const SetData = ({ sets, selectedSet }) => {
  return (
    <div>
      <p>
        Current Set: {sets[selectedSet].set}, Maximum Set: {sets.length}
      </p>
      <pre>{JSON.stringify(sets[selectedSet], null, 2)}</pre>
    </div>
  );
};

export default SetData;
