import { useState, FormEvent } from 'react';
import './signUpStyle.css';
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';

function SignUp() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <div className="signup-wrapper">
      <div className="signup-box">
        <div className="signup-header">
          <Typography variant="h4" align="center" color="textPrimary" gutterBottom>
            Sign Up
          </Typography>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="firstName">First Name:</label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="lastName">Last Name:</label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
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
          <button type="submit" className="signup-btn">Sign Up</button>
        </form>
        <div className="signup-footer">
          <p>Already have an account? <Link to="/SignIn">Sign in</Link></p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
