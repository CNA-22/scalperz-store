import React from "react";
import {Route, Navigate} from "react-router-dom";
import { getToken } from "./Common";

const PrivateRoute = ({ component: Component, ...rest}) => {
    return(
        <Route 
        {...rest}
        render={props => {
            //if we have a token
            return getToken() ? <Component {...props} /> 
              :  <Navigate to="/login" />
        }}
        />
    )
}


export default PrivateRoute;