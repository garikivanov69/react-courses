import React from 'react';
import './Logo.css';
import PropTypes from 'prop-types';


function Logo(props) {
    return ( 
        <img className="Logo" src={props.path} alt="Logo" />
     );
}

Logo.propTypes = {
    src: PropTypes.string
}

export default Logo;