import React from 'react';

const NavButtons = ({ onMoveToSet, onDeleteLastSet }) => {
  return (
    <div>
      <button onClick={() => onMoveToSet(-1)}>Previous Set</button>
      <button onClick={() => onMoveToSet(1)}>Next Set</button>
      <button onClick={onDeleteLastSet}>Delete Last Set</button>
    </div>
  );
};

export default NavButtons;
