import React from 'react';
import { Link, Navigate } from "react-router-dom"

class Admin extends React.Component {
    constructor(props) {
        super(props)
        const token = localStorage.getItem("token")

        let loggedIn = true
        if(token == null) { 
            loggedIn = false
        }

        this.state = {
            loggedIn
        }
    }
  render() {
      if(this.state.loggedIn === false){
          return <Navigate to="/login" />
      }

    return (
    <div>
        <h1>This is an Admin page. Only Auth people can see this</h1>
        <Link to="/logout">Logout</Link>
    </div>
    )
  }
}


export default Admin;