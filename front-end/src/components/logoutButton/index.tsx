import React, { useContext } from 'react';
import { Button } from '@mui/material';
import AuthContext from '../../config/authContext';

function LogoutButton() {
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    // Additional logic after logout if needed
  };

  return (
    <Button variant="contained" onClick={handleLogout}>
      Logout
    </Button>
  );
}

export default LogoutButton;
