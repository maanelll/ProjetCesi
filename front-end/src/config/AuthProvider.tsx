import React, { useState } from 'react';
import axios from 'axios';
import AuthContext from './authContext';

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async (username: string, password: string): Promise<void> => {
    try {
      // Make the API call to retrieve the token using the provided username and password
      const response = await axios.post('http://localhost:8000/api/login_check', {
        username,
        password,
      });

      // Extract the token from the response data
      const token = response.data.token;

      // Set the token in localStorage or any other storage mechanism
      localStorage.setItem('token', token);

      // Set isAuthenticated to true
        setIsAuthenticated(true);
    } catch (error) {
      // Handle the login error
    }
  };

  const logout = (): void => {
    // Perform logout logic
    // Remove the token from storage
    localStorage.removeItem('token');

    // Set isAuthenticated to false
      setIsAuthenticated(false);
    //redirect to login page
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
