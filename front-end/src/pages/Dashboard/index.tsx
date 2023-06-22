import { Box, Button, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import React , { useContext, useState, useEffect } from 'react';
import Login from '../Login';
import AuthContext from '../../config/authContext';
import { BusinessCenter, LocationOn, Search } from '@mui/icons-material';
import studentImg from '../../assets/img/studentsDashboard.jpg'
import axios from 'axios';
import { error } from 'console';

const Dashboard: React.FC = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const [nbOffreStage, setNbOffreStage] = useState<number>()
  // useEffect(() => {
  //   axios.get("http://localhost:8000/api/offreStage")
  //   .then(response => {
  //     const dataLength = response.data.length;
  //     setNbOffreStage(dataLength);
  //   })
  //     .catch(error => {
  //     console.log(error)
  //   })
  // }, [])
  
  return (
    <Box >
      {isAuthenticated ? (
        <Box sx={{ display: 'flex', flexDirection: 'column',height:'100vh'}}>
        
          <Box
            component="div" sx={{
            backgroundImage: `url(${studentImg})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            height:"60%"
            }}>
              <Typography  align="center" sx={{padding:"25px", color: 'white',font:"38px Roboto, Helvetica, Arial, sans-serif",margin:"0px 0px 40px" }}>
                {nbOffreStage}242 545 offres de stages disponibles
              </Typography>
              <Box 
              sx={{
                display: 'flex',
                justifyContent: 'center',
                marginBottom:"10px"
              }}>
                <Typography  sx={{ marginBottom: '0px',font:"30px Roboto, Helvetica, Arial, sans-serif",color:"#ED6C02" }}>
                  Commence ta recherche de stage par içi !
                </Typography>
              </Box>
              <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                marginTop:"60px",
              }}
            >
              {/* Offer Name Search Bar */}
              <TextField
                variant="outlined"
                placeholder="Search by offer name"
                style={{
                  marginRight: '5px',
                  backgroundColor: 'white',
                  borderRadius: '5px',
                  boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)',
                  height:'60px'
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <BusinessCenter color="warning" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton>
                        <Search />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              {/* Location Search Bar */}
              <TextField
                variant="outlined"
                placeholder="Search by location"
                style={{
                  marginRight: '10px',
                  backgroundColor: 'white',
                  borderRadius: '5px',
                  boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)',
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationOn color="warning" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton>
                        <Search />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              {/* Search Button */}
              <Button
                variant="contained"
                color="warning"
                sx={{
                  borderRadius: '0px 10px 10px 0px',
                  width: '60px',
                  height: '60px',
                  minWidth: 'unset',
                  padding: 1,
                }}
              >
                <Search sx={{ fontSize: '2.7em' }} />
              </Button>
            </Box>
            </Box>     
        </Box>   
      ) : (
        <Box >
          <Login />
        </Box>
      )}
    </Box>


    );
};

export default Dashboard;