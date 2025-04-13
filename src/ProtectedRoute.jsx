import { useAuth } from "./context/AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, setShowLoginModal } = useAuth();

  if (!isAuthenticated) {
    setShowLoginModal(true);
    return null; // Prevent navigation
  }

  return children;
};

export default ProtectedRoute;
