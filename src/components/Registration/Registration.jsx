import React, {useState} from 'react';
import './Registration.css';
import Input from '../Input/Input';
import Button from '../Button/Button';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { registrationService } from '../../store/servises';


function Registration(props) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessages, setErrorMessages] = useState([]);

    let history = useHistory();

    function successCallback() {
        history.push('/login');
    };

    function emptyDataCallback(data) {
        data ? setErrorMessages(data.errors) : setErrorMessages(['Registration process failed']);
    };

    function errorCallback() {
        setErrorMessages(['Registration process failed']);
    }
    
    function register(event) {
        event.preventDefault();
        
        if(name && password && email) {
            const newUser = {name, password, email};
            registrationService(newUser, successCallback, emptyDataCallback, errorCallback);
        } else {
            setErrorMessages(['Please, fill in all fields']);
        }
    };

    return ( 
        <div className="Registration-form" >
            <form onSubmit={register}>
                <h1>Registration</h1>
                <label>
                    Name
                    <Input value={name} handleChange={(event) => setName(event.target.value)} placeholder="Enter name" />
                </label>
                <label>
                    Email
                    <Input value={email} handleChange={(event) => setEmail(event.target.value)} placeholder="Enter Email" />
                </label>
                <label>
                    Password
                    <Input type="password" value={password} handleChange={(event) => setPassword(event.target.value)} placeholder="Enter password" />
                </label>
                {errorMessages.map((message) => <div className="error-message">{message}</div>)}
                <Button text="Registration" />
                <div>If you have an account you can <Link to="/login" >Login</Link></div>
            </form>
        </div>
     );
}

export default Registration;