import { Navigate, Outlet } from "react-router-dom";

const AdminProtectedRoute = () => {

  const token = localStorage.getItem("access");
  const isAdmin = localStorage.getItem("isAdmin");

  if (!token || isAdmin !== "true") {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
};

export default AdminProtectedRoute;