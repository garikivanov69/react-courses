import React from 'react';

function Input(props) {
    return ( 
        <input id={props.id} type={props.type} value={props.value} onChange={props.handleChange} placeholder={props.placeholder}/>
     );
}

export default Input;