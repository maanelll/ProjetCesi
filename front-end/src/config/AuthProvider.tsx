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
    // Check if a token exists in storage
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setIsAuthenticated(true);
      setToken(storedToken);
    } 
  }, []);
//   function parseJwt (token: string) {
//     var base64Url = token.split('.')[1];
//     var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
//     var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
//         return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
//     }).join(''));
//     console.log(JSON.parse(jsonPayload).roles[0])
//     return setRole(JSON.parse(jsonPayload).roles[0]);
// }

  const login = async (username: string, password: string): Promise<void> => {
    try {
      const response = await axios.post('http://localhost:8000/api/login_check', {
        username,
        password,
      });
      const newToken = response.data.token;
      localStorage.setItem('token', newToken);
      setIsAuthenticated(true);
      setToken(newToken);
      setErrorMessage('');
      var base64Url = newToken.split('.')[1];
      var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      setRole(JSON.parse(jsonPayload).roles[0])
    } catch (error) {
      console.log(error)
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
    <AuthContext.Provider value={{ isAuthenticated,token,errorMessage,role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
