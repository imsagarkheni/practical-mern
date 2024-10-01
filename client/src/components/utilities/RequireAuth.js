import { useLocation, Navigate, Outlet } from "react-router-dom";

const RequireAuth = () => {
    let token = JSON.parse(localStorage.getItem("user"))?.token;
  const location = useLocation();
  return token ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default RequireAuth;