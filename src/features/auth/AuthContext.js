import React, {
  createContext,
  useState,
  useCallback,
  useContext,
  useEffect,
} from "react";
import { useRouter } from "next/router";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  const checkAuthStatus = async (route) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      setAccessToken(accessToken);
      setIsLoggedIn(true);
    } else {
      logout(route);
      setIsLoggedIn(false);
    }
  };

  const login = (accessToken) => {
    setAccessToken(accessToken);
    setIsLoggedIn(true);
    localStorage.setItem("accessToken", accessToken);
  };

  const logout = useCallback((route) => {
    setAccessToken(null);
    setIsLoggedIn(false);
    localStorage.removeItem("accessToken");
    if (route) {
      router.push("/");
    }
  }, []);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  return (
    <AuthContext.Provider
      value={{ accessToken, isLoggedIn, login, logout, checkAuthStatus }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
