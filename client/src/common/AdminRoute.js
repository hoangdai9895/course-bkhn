import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

export const AdminRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated, isAdmin, isTeacher } = useSelector(
    (state) => state.auth
  );
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated && (isAdmin || isTeacher) ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};
