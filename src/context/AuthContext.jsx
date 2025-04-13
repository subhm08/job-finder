import { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [user, setUser] = useState([]);
  const [resume, setResume] = useState(null);

  const login = (userData) => {
    setIsAuthenticated(true);
    setUser(userData); // userData should have name, email, etc.
    setShowLoginModal(false);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser([]);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, showLoginModal, setShowLoginModal, setIsAuthenticated, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
