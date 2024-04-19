import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const login = () => {
    // Perform login logic, set isLoggedIn to true
    setIsLoggedIn(true);
  };

  const logout = () => {
    // Perform logout logic, set isLoggedIn to false
    setIsLoggedIn(false);
    setIsAdmin(false);
  };

  const setAdmin = () => {
    // Set the user as admin
    setIsAdmin(true);
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, isAdmin, login, logout, setAdmin }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
