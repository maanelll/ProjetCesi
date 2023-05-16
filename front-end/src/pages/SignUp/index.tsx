import { useState, FormEvent } from 'react';
import './signUpStyle.css';
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';
import validator from 'validator';

function SignUp() {
  const [prenom, setPrenom] = useState('');
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password !== passwordConfirm) {
      setPasswordError('Passwords do not match');
      return;
    }

    if (!validator.isEmail(email)) {
    setPasswordError('Invalid email format');
    return;
  }
    setPasswordError('');
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
            <label htmlFor="prenom">Prénom:</label>
            <input
              type="text"
              id="prenom"
              value={prenom}
              onChange={(event) => setPrenom(event.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="nom">Nom:</label>
            <input
              type="text"
              id="nom"
              value={nom}
              onChange={(event) => setNom(event.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="email">Mon adresse e-mail:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Mon mot de passe:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="passwordConfirm">Confirmer le mot de passe:</label>
            <input
              type="password"
              id="passwordConfirm"
              value={passwordConfirm}
              onChange={(event) => setPasswordConfirm(event.target.value)}
            />
          </div>
          {passwordError && <p className="error-message">{passwordError}</p>}
          <button type="submit" className="signup-btn">CRÉER UN COMPTE</button>
        </form>
        <div className="signup-footer">
          <p>Tu as déja un compte? <Link to="/SignIn">Connexion</Link></p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
