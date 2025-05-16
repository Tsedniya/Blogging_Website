import { Navigate } from "react-router-dom";
import useAuth from "../auth/userAuth";

const ProtectedRoute = ({ children, roles }) => {
  const { currentUser, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/404" replace />;
  }

  if (roles && !roles.includes(currentUser?.role)) {
    return <Navigate to="/404" replace />;
  }

  return children;
};

export default ProtectedRoute;
