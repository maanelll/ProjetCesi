import { Box, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import React from 'react';
import Login from '../Login';
import { useContext } from 'react';
import AuthContext from '../../config/authContext';
import { Search } from '@mui/icons-material';

const Dashboard: React.FC = () => {
  const { isAuthenticated } = useContext(AuthContext);
    return (
        <Box>
      {isAuthenticated ? (
        <div>
          <center><h1>Dashboard</h1></center>
          {/* <div style={{ flexGrow: 1, paddingRight: '50px' }}>
          <TextField
            variant="outlined"
            placeholder="Offre de stage"
            style={{
              flex: 1,
              backgroundColor: 'white',
              borderRadius: '5px',
              boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)',
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton>
                    <Search />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </div> */}
        </div>
      ) : (
        <Box >
          <Login />
        </Box>
      )}
    </Box>


    );
};

export default Dashboard;