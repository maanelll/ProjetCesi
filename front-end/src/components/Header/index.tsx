import React from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import { Search } from '@mui/icons-material';
import logoCesi from '../../assets/img/Logo_cesi.png'
import logoAttineos from "../../assets/img/Logo_attineos.jpg"

const index = () => {
    return (
        <header
      style={{
        backgroundColor: '#f5f5f5',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        width: '100%',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '10px',
          margin: '0 auto',
          maxWidth: '1500px',
        }}
      >
        <div style={{ borderRight: '1px solid #ccc', paddingRight: '20px' }}>
          <img
            src={logoAttineos}
            alt="Logo ATTINEOS"
            style={{
              height: '70px',
              width: 'auto',
              borderRadius: '10%',
              boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)',
              marginRight: '10px',
            }}
          />
        </div>
        <div style={{ flexGrow: 1, paddingRight: '50px' ,paddingLeft: '200px'}}>
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
        </div>
        <div style={{ borderLeft: '1px solid #ccc', paddingLeft: '20px' }}>
          <img
            src={logoCesi}
            alt="Logo CESI"
            style={{
              height: '70px',
              width: 'auto',
              borderRadius: '10%',
              boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)',
              marginLeft: '10px',
            }}
          />
        </div>
      </div>
    </header>
    );
};

export default index;