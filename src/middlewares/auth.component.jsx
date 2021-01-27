import React, { useRef, useState, useEffect} from "react";
import { Route, Redirect } from  "react-router-dom";

const  PrivateRoute = (props) => {
const { rol } = props;
    const condition = localStorage.getItem("usuarioAuth");
 
    return  condition ?  (
   
                    <Route  path={props.path}  exact={props.exact} component={props.component} />
               
        ) : (
            <Redirect  to="/login"  />
        )
};
export  default  PrivateRoute;
