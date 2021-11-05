import React from 'react';
import './Header.css';
import Button from '../Button/Button';
import Logo from '../Logo/Logo';
import { useHistory } from "react-router-dom";
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { createActionDeleteUser } from '../../store/user/actionCreators';
import { selectUser } from '../../store/selectors';

function Header(props) {
    let user = useSelector(selectUser);
    let history = useHistory();
    const dispatch = useDispatch();

    function logout(event) {
        event.preventDefault();
        localStorage.removeItem('courses-user');
        dispatch(createActionDeleteUser());
        history.push("/login");
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