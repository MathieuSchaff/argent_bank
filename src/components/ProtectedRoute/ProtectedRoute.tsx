import React, { useEffect } from "react";
import { selectCurentUser } from "../../utils/selectors";
import { Navigate } from "react-router-dom";
import { selectCurentToken } from "../../utils/selectors";
import { useAppSelector } from "../../app/hooks";
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const token = useAppSelector(selectCurentToken);
  console.log("enter protected");
  return token ? children : <Navigate to="/" />;
};

export default ProtectedRoute;

// valide pas le token,
