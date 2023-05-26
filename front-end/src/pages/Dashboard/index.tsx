import { Box, Typography } from '@mui/material';
import React from 'react';
import Login from '../Login';
import { useContext } from 'react';
import AuthContext from '../../config/authContext';

const Dashboard: React.FC = () => {
  const { isAuthenticated } = useContext(AuthContext);
    return (
        <Box>
      {isAuthenticated ? (
        <Typography sx={{ display: "flex", justifyContent: "center" }}>
          Dashboard
        </Typography>
      ) : (
        <Box >
          <Login />
        </Box>
      )}
    </Box>


    );
};

export default Dashboard;