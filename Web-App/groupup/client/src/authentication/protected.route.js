import React from "react";
import { Redirect, Route } from "react-router-dom";
import authenticator from "./auth";

export const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (authenticator.isAuthenticated()) {
          console.log(authenticator.isAuthenticated());
          return <Component {...props}></Component>;
        } else {
          return <Redirect to={{ pathname: "/" }} />;
        }
      }}
    />
  );
};
