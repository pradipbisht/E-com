import React from "react";
import UseAuthStatus from "./UseAuthStatus";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const { loggedIn, checkingStatus } = UseAuthStatus();
  if (checkingStatus) {
    return <div>Loading...</div>;
  }

  return loggedIn ? <Outlet /> : <Navigate to="/login" replace={true} />;
};

export default PrivateRoute;
