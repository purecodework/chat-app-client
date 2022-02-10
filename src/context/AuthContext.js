import { createContext, useState, useContext } from "react";

export const AuthContext = createContext({});

// useAuth hook, return login, logout method, as well as auth that keep login state
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isLoggedIn: false,
    userId: null,
    token: null,
  });

  const login = (userId, token) => {
    setAuth({
      isLoggedIn: true,
      userId: userId,
      token: token,
    });
  };

  const logout = () => {
    setAuth({
      isLoggedIn: false,
      userId: null,
      token: null,
    });
  };
  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
