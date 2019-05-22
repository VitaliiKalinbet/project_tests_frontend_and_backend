import React from "react";
import { connect } from 'react-redux';
import {Route, Redirect} from 'react-router-dom';


const ProtectedRoute = ({
                          component: Component,
                          redirectTo = '/',
                          isAuthenticated,
                          ...rest
                        }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: redirectTo,
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

const mapState = state => ({
  isAuthenticated: state.isLogin
});


export default connect(mapState)(ProtectedRoute);