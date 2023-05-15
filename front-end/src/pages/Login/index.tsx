import React, { useState, FormEvent } from 'react';
import './loginStyle.css';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    
    <div className="login-wrapper">
      <div className="login-box">
        <div className="login-header">
          <h2>Login</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <button type="submit" className="login-btn">Login</button>
          <div className="signup-link">
          </div>
        </form>
        <Typography variant="body2" textAlign="center">
              Don't have an account? <Link to="/SignUp">Sign up</Link>
            </Typography>
      </div>
    </div>
    
  );
}

export default Login;
