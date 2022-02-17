import React, { useState } from "react";
import './styles/Login.css';
import { useNavigate, Navigate } from 'react-router-dom';
import axios from "axios";
import { setUserSession } from "../Utils/Common";


const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = () => {
        setError(null);
        setLoading(true);
        axios.post("https://cna22-user-service.herokuapp.com/users/login", {
                email: email,
                password: password 
    }).then(response => { 
        setLoading(false);
        setUserSession(response.data.accessToken);
        navigate('/dashboard'); 
        //<Navigate to="/dashboard" />;
        //console.log("response >>>>" , response);
    }).catch(error => {
        setLoading(false);
        if(error.response.status === 401 || error.response.status === 400){
            setError("Username or Password is wrong");
            //error.response.data.message
        } else {
            setError("Something went wrong. Please try again later.")
        }
       //console.log("Something went wrong")
    });

}

    return (
        <div>
          <h1> Login </h1> 
           <div> 
               Email <br />
               <input 
                type="text"
                value={email}
                onChange={e => setEmail(e.target.value)}
                />    
           </div>
           <div>
               Password<br />
               <input 
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
           </div>  <br />
           {error && <div className="error">{error}</div>}
          <input 
            className="button"
            type="button"
            value={loading ? "Loading..." : "Login" }
            disabled={loading}
            onClick={handleLogin}
          />
        </div>
    )
}

export default Login;
