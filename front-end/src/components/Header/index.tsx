import React from 'react';
import logoCesi from '../../assets/img/Logo_cesi.png';
import logoAttineos from "../../assets/img/Logo_attineos.jpg";

const Header = () => {
  return (
    <header
      style={{
        background: 'linear-gradient(183.6deg, #AFA5D1 0%, #8A4DFF 73.17%)',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        width: '100%',
        padding: '10px',
      }}
    >
      
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          margin: '0 auto',
          maxWidth: '1450px',
        }}
      >
        
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div>
            <img
              src={logoCesi}
              alt="Logo CESI"
              style={{
                height: '70px',
                width: 'auto',
                borderRadius: '10%',
                boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)',
                marginRight: '20px',
              }}
            />
          </div>
          <div style={{ borderLeft: '1px solid #ccc', paddingLeft: '20px' }}>
            <img
              src={logoAttineos}
              alt="Logo ATTINEOS"
              style={{
                height: '70px',
                width: '200px',
                borderRadius: '10%',
                boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)',
              }}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
