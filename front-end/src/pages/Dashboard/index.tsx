import { Box, Typography } from '@mui/material';
import React from 'react';
import Login from '../Login';

const Dashboard = () => {
    const isAuthenticated = true;
    return (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
      {isAuthenticated ? (
        <>
          <Typography sx={{ display: "flex", justifyContent: "center" }}>
            Dashboard
          </Typography>
        </>
      ) : (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Login/>
        </Box>
      )}
    </Box>

    );
};

export default Dashboard;