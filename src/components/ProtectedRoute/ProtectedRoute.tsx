import React, { useEffect } from "react";
import { selectCurentUser } from "../../utils/selectors";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectCurentToken } from "../../utils/selectors";
import { fetchUser } from "../../features/userData/fetchDataUserSlice";
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const token = useSelector(selectCurentToken);

  return token ? children : <Navigate to="/" />;
};

export default ProtectedRoute;

// valide pas le token,
