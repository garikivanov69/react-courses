import React from 'react';
import PropTypes from 'prop-types';


function Input(props) {
    return ( 
        <input id={props.id} type={props.type} value={props.value} onChange={props.handleChange} placeholder={props.placeholder}/>
     );
}

Input.propTypes = {
    onChange: PropTypes.func,
    type: PropTypes.string,
    placeholder: PropTypes.node,
    value: PropTypes.node,
    id: PropTypes.node
}

export default Input;