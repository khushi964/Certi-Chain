// In Navbar.jsx (for example)
import React from 'react';

const Navbar = () => {
  const toggleDarkMode = () => {
    document.body.classList.toggle('dark');
  };

  return (
    <nav className="navbar">
      <h1>CertiChain</h1>
      <button onClick={toggleDarkMode}>Toggle Dark Mode</button>
    </nav>
  );
};

export default Navbar;
