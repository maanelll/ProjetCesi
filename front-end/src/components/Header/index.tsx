import React from 'react';
import applicationLogo from "../../assets/img/applicationLogo.png"

const Header = () => {
  return (
    <header
      style={{
        background: 'linear-gradient(183.6deg, #AFA5D1 0%, #8A4DFF 73.17%)',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        width: '100%',
        padding: '10px 0',
      }}
    >
      
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto',
          maxWidth: '1450px',
        }}
      >
        <img src={applicationLogo} alt="Logo" style={{ width: '300px', marginRight: '10px' }} />
      </div>
    </header>
  );
};

export default Header;
