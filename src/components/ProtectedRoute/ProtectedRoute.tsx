import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { selectCurentTokenAuth } from "../../features/auth/authSlice";

const ProtectedRoute = () => {
  const token: string | null =
    useAppSelector(selectCurentTokenAuth) ?? localStorage.getItem("token");
  return token ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
