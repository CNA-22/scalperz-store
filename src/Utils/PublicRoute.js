import React from "react";
import { Route , Navigate} from "react-router-dom";
import { getToken } from "./Common";

const PublicRoute = ({component: Component, ...rest}) => {
    //const navigate = useNavigate();
    return(
        <Route 
        {...rest}
        render={props => {
            //if we don't have a token
            return !getToken() ? <Component {...props} /> 
              :   <Navigate to="/dashboard" />
        }}
        />
    )
}


export default PublicRoute;