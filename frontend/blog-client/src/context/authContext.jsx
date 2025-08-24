import { useContext, createContext, useState } from "react";
import userService from "../services/userService";

const authContext = createContext();
authContext.displayName = "Auth";

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("access")
  );

  async function login(values) {
    try {
      const data = await userService.login(values);
      setIsLoggedIn(true);
      return data;
    } catch (error) {
      setIsLoggedIn(false);
      throw error;
    }
  }

  async function register(values) {
    const data = await userService.register(values);
    await login({ username: values.username, password: values.password });
    return data;
  }

  function logout() {
    userService.logOut();
    setIsLoggedIn(false);
  }

  const getUser = () => userService.getUser();
  const isAdmin = () => userService.isAdmin();

  return (
    <authContext.Provider
      value={{ isLoggedIn, login, register, logout, getUser, isAdmin }}
    >
      {children}
    </authContext.Provider>
  );
}

export function useAuth() {
  return useContext(authContext);
}
