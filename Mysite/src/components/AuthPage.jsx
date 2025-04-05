import React, { useState } from 'react';
import './AuthPage.css';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    role: '',
    walletAddress: '',
  });

  const toggleForm = () => setIsLogin(!isLogin);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(isLogin ? 'Logging in...' : 'Signing up with:', formData);
    // TODO: Handle login or signup logic
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
        <form className="auth-form" onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
              <select
             name="role"
             value={formData.role}
              onChange={handleChange}
               required
               >
  <option value="" disabled hidden>
    Choose your role
  </option>
  <option value="student">Student</option>
  <option value="admin">Admin</option>
</select>



              <input
                type="text"
                name="walletAddress"
                placeholder="Wallet Address"
                value={formData.walletAddress}
                onChange={handleChange}
                required
              />
            </>
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
        </form>
        <p onClick={toggleForm} className="toggle-text">
          {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
