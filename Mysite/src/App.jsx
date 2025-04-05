import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';
import StudentPage from './pages/StudentPage';
import AuthPage from './components/AuthPage';
import Footer from './components/Footer';

import './App.css';
import './responsive.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/student" element={<StudentPage />} />

            <Route path="/auth" element={<AuthPage />} />
            
          </Routes>
        </div>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;


       
       