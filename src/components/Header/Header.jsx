import React from 'react';
import './Header.css';
import Button from '../Button/Button';
import Logo from '../Logo/Logo';
import { useHistory } from "react-router-dom";
import PropTypes from 'prop-types';



function Header(props) {
    let history = useHistory();

    function logout(event) {
        event.preventDefault();
        localStorage.removeItem('courses-user-token');
        localStorage.removeItem('courses-user-name');
        props.setUserToken('');
        history.push("/login");
    };

    return ( 
        <div className="Header-component-wrapper">
            <div className="Header-component">
                <Logo path={props.logoPath} />
                {props.userToken ? localStorage.getItem('courses-user-name') : ''}
                {props.userToken ? <Button text="Logout" onClick={logout} /> : ''}
            </div>
        </div>
     );
}

Header.propTypes = {
    userToken: PropTypes.node,
    logoPath: PropTypes.string
}

export default Header;