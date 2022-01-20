import { getDefaultNormalizer } from "@testing-library/react"
import React from "react"
import { Navigate , Link } from "react-router-dom"

class Login extends React.Component{
    constructor(props) {
        super(props)
        const token = localStorage.getItem("token")

        let loggedIn = true  //loggedIn true, but...
        if(token == null){ //if thers no token then loggedIn false 
            loggedIn = false
        }

        this.state={
            email:'',
            password:'',
            loggedIn
        }

        this.onChange = this.onChange.bind(this)
        this.submitForm = this.submitForm.bind(this)
    }
    


    onChange(e){
        this.setState({
            [e.target.name]: e.target.value  //input.name is the value 
        })
    }

    submitForm(e){
        e.preventDefault()
        const { email, password } = this.state
        // the login magic 
        if(email === "A@gmail.com" && password === "B") {
            localStorage.setItem("token", "jrigegegegeigvks")
            this.setState({
                loggedIn: true
            })
        }

    }


    render() {
        //checking if loggedIn is true 
        if(this.state.loggedIn){
            //navigating to the Admin page
            return <Navigate to="/admin"/> 
        }

        return (
            <div>
                <h1>Login</h1>
                <form onSubmit={this.submitForm}>
                    <input type="email" name="email" placeholder="email" value={this.state.email} required onChange={this.onChange}/>
                    <br/>
                    <input type="password" name="password" placeholder="password" value={this.state.password} required onChange={this.onChange}/>
                    <br/>
                    <button onSubmit={this.onSubmit}>Log In</button>
                </form>
            </div>
           
        )

    }
}



export default Login;