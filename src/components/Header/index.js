import React from 'react';
import './styles.css';
import logo from '../../assets/icon.svg';

export function Header() {
  return (
    <header className="header-container">
      <div className="header-content">
        <img src={logo} alt="Logo" className="header-logo" />
        <span className="header-title">To-Do Board</span>
      </div>
    </header>
  );
};

export default Header;