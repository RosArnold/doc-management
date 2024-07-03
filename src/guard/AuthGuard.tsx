import React, { ReactNode, useEffect } from "react";
import { Route, useLocation, useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { RootState } from "../store/store";

interface PrivateRouteProps {
  path: string;
  children: ReactNode;
}

const authPaths = ["/login", "/logout"];

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, ...rest }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  if (!isAuthenticated && !authPaths.includes(location.pathname)) {
    navigate("/login"); // Redirect to login page if not authenticated
    return null; // Return null to avoid rendering the route
  }

  return <Route {...rest}>{children}</Route>;
};

export default PrivateRoute;
