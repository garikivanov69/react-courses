import React from 'react';
import './Logo.css';

function Logo(props) {
    return ( 
        <img className="Logo" src={props.path} alt="Logo" />
     );
}

export default Logo;