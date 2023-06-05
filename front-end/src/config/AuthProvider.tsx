import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AuthContext from './authContext';
import { useNavigate } from 'react-router-dom';
import { initAxios } from './axios';

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {

  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');
    
  useEffect(() => {
    // Check if a token exists in storage
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setIsAuthenticated(true);
      setToken(storedToken);
    } 
  }, []);

  const login = async (username: string, password: string): Promise<void> => {
    try {
      const response = await axios.post('/login_check', {
        username,
        password,
      });
      const newToken = response.data.token;
      localStorage.setItem('token', newToken);
      setIsAuthenticated(true);
      setToken(newToken);
      setErrorMessage('');
    } catch (error) {
      setErrorMessage('email ou  mot de passe invalide');
    }
  };

  const logout = (): void => {
    // Perform logout logic
    // Remove the token from storage
    localStorage.removeItem('token');
    

    // Set isAuthenticated to false
      setIsAuthenticated(false);
      setToken(null);
    //redirect to login page
      navigate(`signIn`,{ replace: true });
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated,token,errorMessage, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
