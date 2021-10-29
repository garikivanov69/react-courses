import React, {useState} from 'react';
import './Registration.css';
import Input from '../Input/Input';
import Button from '../Button/Button';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";


function Registration(props) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessages, setErrorMessages] = useState([]);

    let history = useHistory();
    
    function register(event) {
        event.preventDefault();
        
        if(name && password && email) {
            const newUser = {name, password, email};

            fetch('http://localhost:3000/register', {
                method: 'POST',
                body: JSON.stringify(newUser),
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then((response) => response.json()).then((data) => {
                if (data && data.successful) {
                    history.push('/login');
                } else {
                    data ? setErrorMessages(data.errors) : setErrorMessages(['Registration process failed']);
                }
            }).catch((error) => setErrorMessages(['Registration process failed']));

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