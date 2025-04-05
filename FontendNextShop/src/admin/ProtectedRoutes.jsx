import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userRole = user?.role;

  if (!userRole) return <Navigate to="/login" replace />;

  return allowedRoles.includes(userRole) ? (
    <Outlet />
  ) : (
    <Navigate to="/home" replace />
  );
};
export default ProtectedRoute;
