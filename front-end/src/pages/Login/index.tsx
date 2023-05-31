import { useState, FormEvent, useContext, useEffect } from 'react';
import './loginStyle.css';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import AuthContext from '../../config/AuthContext';
import { CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';


function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate()
  const {isAuthenticated,errorMessage, login } = useContext(AuthContext);

  useEffect(() => {
    // Check if the user is already authenticated
    if (isAuthenticated) {
      navigate('/'); // Redirect to the home page
    }
  }, [isAuthenticated, navigate]);

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
       setIsLoading(true);
      await login(username, password);
  } catch (error) {
    } finally {
      setIsLoading(false);
  }
  };

  return (
    
    <div className="login-wrapper">
      <div className="login-box">
        <div className="login-header">
          <h2>Login</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Adresse mail:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Mot de passe:</label>
            <div className="password-input-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="password-input"
              />
              <span
                className={`password-toggle ${showPassword ? 'visible' : ''}`}
                onClick={handleTogglePassword}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </span>
            </div>
          </div>
          {errorMessage && <p>{errorMessage}</p>}
           <button type="submit" className="login-btn" disabled={isLoading}>
            {isLoading ? <CircularProgress size={24} /> : 'Se connecter'}
          </button>
          <div className="signup-link">
          </div>
        </form>
      </div>
    </div>
    
  );
}

export default Login;
