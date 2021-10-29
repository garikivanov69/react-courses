import React, {useState} from 'react';
import Input from '../Input/Input';
import Button from '../Button/Button';
import { Link } from 'react-router-dom';
import './Login.css';
import { useHistory } from "react-router-dom";
import PropTypes from 'prop-types';



function Login(props) {
    let history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    function login(event) {
        event.preventDefault();

        if(password && email) {
            const newUser = { password, email};

            fetch('http://localhost:3000/login', {
                method: 'POST',
                body: JSON.stringify(newUser),
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then((response) => {
                console.log(response);
                return response.json()    
            }).then((data) => {
                console.log(data);
                if (data && data.successful) {
                    localStorage.setItem('courses-user-token', data.result);
                    localStorage.setItem('courses-user-name', data.user.name);
                    props.setUserToken(data.result);
                    history.push('/courses');
                } else {
                    data ? setErrorMessage(data.result) : setErrorMessage('Login process failed');
                }
            }).catch((error) => setErrorMessage('Login process failed'));

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

Login.propTypes = {
    setUserToken: PropTypes.func
}

export default Login;