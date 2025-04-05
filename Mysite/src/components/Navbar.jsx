import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import NavImg from '../image/lgo.jpg';
import { FaBars, FaTimes } from 'react-icons/fa';
import { BsSun, BsMoon } from 'react-icons/bs';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() =>
    localStorage.getItem('theme') === 'dark'
  );

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  const toggleDarkMode = () => {
    setDarkMode(prev => {
      const newMode = !prev;
      localStorage.setItem('theme', newMode ? 'dark' : 'light');
      return newMode;
    });
  };

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          <img src={NavImg} alt="Cert" className="logo-img" />
          CertiChain
        </Link>

        <div className="navbar-right">
          {/* Dark Mode Toggle */}
          <button className="dark-toggle" onClick={toggleDarkMode}>
            {darkMode ? <BsSun /> : <BsMoon />}
          </button>

          {/* Hamburger Icon */}
          <div className="hamburger" onClick={toggleMenu}>
            {menuOpen ? <FaTimes /> : <FaBars />}
          </div>
        </div>

        <ul className={`nav-menu ${menuOpen ? 'active' : ''}`}>
          <li className="nav-item">
            <Link to="/" className="nav-links" onClick={closeMenu}>
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/student" className="nav-links" onClick={closeMenu}>
              Student Portal
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/admin" className="nav-links" onClick={closeMenu}>
              Admin Portal
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/auth" className="nav-links" onClick={closeMenu}>
              Login / Signup
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;


