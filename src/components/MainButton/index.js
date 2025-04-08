import React from 'react';
import './styles.css';

const MainButton = ({ label, onClick, ...props }) => {
  
  return (
    <div className="main-button-container">
      <button
        onClick={onClick}
      className="main-button"
      {...props}
    >
      {label}
    </button>
    </div>
  );
};

export default MainButton;
