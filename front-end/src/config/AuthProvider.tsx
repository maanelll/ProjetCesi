import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AuthContext from './authContext';
import { useNavigate } from 'react-router-dom';

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {

  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');
    
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setIsAuthenticated(true);
      setToken(storedToken);
      decodeAndSetRole(storedToken);
    } 
  }, []);
  
  const decodeAndSetRole = (token: string): void => {
      var base64Url = token.split('.')[1];
      var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      setRole(JSON.parse(jsonPayload).roles[0]);
    };

  const login = async (username: string, password: string): Promise<void> => {
    try {
      const response = await axios.post('https://localhost:8000/api/login_check', {
        username,
        password,
      });
      const newToken = response.data.token;
      localStorage.setItem('token', newToken);
      setIsAuthenticated(true);
      setToken(newToken);
      setErrorMessage('');
      decodeAndSetRole(newToken);
    } catch (error) {
      setErrorMessage('email ou  mot de passe invalide');
      console.log(error)
    }
  };

  const logout = (): void => {
    localStorage.removeItem('token');
      setIsAuthenticated(false);
      setToken(null);
      navigate(`signIn`,{ replace: true });
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated,token,errorMessage,role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
