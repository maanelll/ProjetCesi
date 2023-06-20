import { useState, FormEvent, useContext, useEffect } from 'react';
import './loginStyle.css';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import AuthContext from '../../config/authContext';
import { Button, CircularProgress, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import logoCesi from '../../assets/img/Logo_cesi.png'
import logoAttineos from '../../assets/img/Logo_attineos.jpg'

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
      <div className="logo-container">
        <img
          src={logoCesi}
          alt="Logo CESI"
          className="logo1"
        />
        <img
          src={logoAttineos}
          alt="Logo ATTINEOS"
          className="logo2"
        />
      </div>
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
          <button
            type="submit"
            disabled={isLoading}
            style={{
              padding: "20px",
              width: "100%",
              backgroundColor:"#8A4DFF",
              marginTop: "12px",
              borderRadius: "5%",
              cursor: "pointer",
              boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.2)", // Box shadow
              position: "relative",
            }}
          >
            {isLoading ? <CircularProgress size={24} /> : 
            <Typography sx={{color:"white",fontFamily:"Segoe UI",fontSize:"22px"}}>Se connecter</Typography>}
          </button>
        </form>
      </div>
    </div>
    
  );
}

export default Login;
