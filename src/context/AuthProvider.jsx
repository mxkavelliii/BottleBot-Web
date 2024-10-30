import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setToken(storedToken);
      setUser(parsedUser);
      setIsAuthenticated(true);
      if (parsedUser.credentials.level === "admin") {
        navigate("/admin/dashboard");
      } else if (parsedUser.credentials.level === "staff") {
        navigate("/staff/dashboard");
      }
    } else {
      if (!isAuthenticated) {
        navigate("/");
      }
    }
  }, []);

  const updateUser = (newUser) => {
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  const onLogout = () => {
    setIsAuthenticated(false);
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        token,
        user,
        setIsAuthenticated,
        setToken,
        setUser,
        onLogout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
