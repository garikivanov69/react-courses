import React from 'react';
import PropTypes from 'prop-types';


function Button(props) {
    return ( 
        <button className={props.className} onClick={props.onClick}>{props.text}</button>
     );
}

Button.propTypes = {
    onClick: PropTypes.func,
    className: PropTypes.string
}

export default Button;