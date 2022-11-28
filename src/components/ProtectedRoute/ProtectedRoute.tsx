import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { selectCurentTokenAuth } from "../../features/auth/authSlice";
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const token = useAppSelector(selectCurentTokenAuth);
  console.log("enter protected");
  return token ? children : <Navigate to="/" />;
};

export default ProtectedRoute;

// valide pas le token,
