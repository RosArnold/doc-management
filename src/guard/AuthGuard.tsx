import React, { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, ...rest }) => {
  const navigate = useNavigate();

  const isAuthenticated = !!localStorage.getItem("token");
  // useSelector(
  //   (state: RootState) => state.auth.isAuthenticated
  // );

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  return <React.Fragment {...rest}>{children}</React.Fragment>;
};

export default PrivateRoute;
