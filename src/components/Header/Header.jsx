import React from 'react';
import './Header.css';
import Button from '../Button/Button';
import Logo from '../Logo/Logo';
import { useHistory } from "react-router-dom";
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { selectUser } from '../../store/selectors';
import { logoutThunkWrapper } from '../../store/thunk';
import store from '../../store/index';



function Header(props) {
    let user = useSelector(selectUser);
    let history = useHistory();

    function logout(event) {
        event.preventDefault();
        store.dispatch(logoutThunkWrapper(user.token, history));
    };

    return ( 
        <div className="Header-component-wrapper">
            <div className="Header-component">
                <Logo path={props.logoPath} />
                {user.token ? 'Hello ' + user.name : ''}
                {user.token ? <Button text="Logout" onClick={logout} /> : ''}
            </div>
        </div>
     );
}

Header.propTypes = {
    logoPath: PropTypes.string
}

export default Header;