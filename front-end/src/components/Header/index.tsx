import React from 'react';
import logoCesi from '../../assets/img/Logo_cesi.png'

const index = () => {
    return (
        <header style={{ display: "flex", alignItems: "center" }}>
            <div style={{ marginRight: "10px" }}>
                <img src={logoCesi} alt="Logo CESI" style={{ height: '100px', width: '100px' }} />
            </div>
        </header>
    );
};

export default index;