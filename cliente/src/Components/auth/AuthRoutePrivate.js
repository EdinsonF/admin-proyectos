
import React,{ useContext} from 'react';
import { BrowserRouter as Router, Route, Redirect} from 'react-router-dom';


import {authContext} from './authContext/authProvider';

const AuthRoutePrivate = ({ component: RouteComponent, ...rest }) => {
  const {userAuth} = useContext(authContext);
  return (
    <Route
      {...rest}
      render={routeProps =>
        !!userAuth ? (
          <RouteComponent {...routeProps} />
        ) : (
          <Redirect to={"/"} />
        )
      }
    />
  );
};


export default AuthRoutePrivate;