import React from 'react';
import '../css/NavButtons.css'

const NavButtons = ({ onMoveToSet, onDeleteLastSet }) => {
  return (
  
    
    <div className="nav-buttons-container">
    <button className="nav-button" onClick={onDeleteLastSet}>Delete Last Set</button>
    <div classname="navigation">
      <button className="nav-button" onClick={() => onMoveToSet(-1)}>Previous Set</button>
      <button className="nav-button" onClick={() => onMoveToSet(1)}>Next Set</button>
      </div>
    </div>
     
    
  );
};

export default NavButtons;
