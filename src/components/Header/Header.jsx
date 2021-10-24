import React from 'react';
import './Header.css';
import Button from '../Button/Button';
import Logo from '../Logo/Logo';

function Header(props) {
    return ( 
        <div className="Header-component-wrapper">
            <div className="Header-component">
                <Logo path={props.logoPath} />
                {props.name}
                <Button text={props.textButton} />
            </div>
        </div>
     );
}

export default Header;