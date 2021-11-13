import React, {useState} from 'react';
import Input from '../Input/Input';
import Button from '../Button/Button';
import { Link } from 'react-router-dom';
import './Login.css';
import { useHistory } from "react-router-dom";
import { loginService } from '../../store/servises';
import { useDispatch } from 'react-redux';
import { createActionAddUser } from '../../store/user/actionCreators';


function Login(props) {
    const dispatch = useDispatch();
    let history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    function successLoginCallback (data) {
        let user = data.user;
        user.isAuth = true;
        user.token = data.result;
        localStorage.setItem('courses-user', user.token);
        dispatch(createActionAddUser(user));
        history.push('/courses');
    };

    function emptyDataLoginCallback (data) {
        data ? setErrorMessage(data.result) : setErrorMessage('Login process failed');
    };

    function errorLoginCallback () {
        setErrorMessage('Login process failed');
    };

    function login(event) {
        event.preventDefault();
        if(password && email) {
            const newUser = { password, email};
            loginService(newUser, successLoginCallback, emptyDataLoginCallback, errorLoginCallback);
        } else {
            setErrorMessage('Please, fill in all fields');
        }
    };

    return ( 
        <div className="Login-form" >
            <form onSubmit={login}>
                <h1>Login</h1>
                <label>
                    Email
                    <Input value={email} handleChange={(event) => setEmail(event.target.value)} placeholder="Enter Email" />
                </label>
                <label>
                    Password
                    <Input type="password" value={password} handleChange={(event) => setPassword(event.target.value)} placeholder="Enter password" />
                </label>
                <div className="error-message">{errorMessage}</div>
                <Button text="Login" />
                <div>If you not have an account you can <Link to="/registration" >Registration</Link></div>
            </form>
        </div>
     );
}

export default Login;