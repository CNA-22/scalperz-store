import React, { useState } from "react";
import './styles/Login.css';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import {Button, Form} from 'react-bootstrap';
import { useCookies } from 'react-cookie';

const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [cookies, setCookie] = useCookies(["user-session"]);
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault()      
        setError(null);
        setLoading(true);
        axios.post("https://cna22-user-service.herokuapp.com/users/login", {
                email: email,
                password: password 
    }).then(response => { 
        setLoading(false);
        setCookie("user-session", response.data.accessToken);
        navigate('/products'); 
        window.location.reload();
    }).catch(error => {
        setLoading(false);
        if(error.response.status === 401 || error.response.status === 400){
            setError("Username or Password is wrong");
            //error.response.data.message
        } else {
            setError("Something went wrong. Please try again later.")
        }
    });
}

    return (
        <div className="Login">
          <Form>
          <h1 className="Login"> Login </h1> 
          <Form.Group size="lg" controlId="email">
           <Form.Label>Email</Form.Label> <br />
           <Form.Control
                type="text"
                value={email}
                onChange={e => setEmail(e.target.value)}
                />   
           </Form.Group>
           <Form.Group size="lg" controlId="password">
           <Form.Label>Password</Form.Label><br />
           <Form.Control
                    type="password" 
                    value={password} 
                    onChange={e => setPassword(e.target.value)}
                />
            </Form.Group>
           <br />
           {error && <div className="error">{error}</div>}
           <div className="d-grid gap-2">
           <Button block size="lg"
                   type="submit"
                   value={loading ? "Loading..." : "Login" }
                   disabled={loading}
                   onClick={handleLogin} >
               Login
           </Button>
           </div>
        </Form>
        </div>
    )
}

export default Login;
