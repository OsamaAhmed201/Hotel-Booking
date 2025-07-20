import React, { createContext, useContext, useEffect, useState } from "react";
import type { AuthContextProps, User } from "../interfaces/Auth/AuthContextType";
import { axiosInstance, USERS_URLS } from "../modules/services/Urls";

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null); 
  const [currentUser, setCurrentUser] = useState<User | null>(null); 
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true); 
  const [userLoading, setUserLoading] = useState<boolean>(false); 

  
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      setToken(storedToken);
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem("user");
      }
    }
    setLoading(false);
  }, []);


  const login = (newToken: string, newUser: User) => {
    setToken(newToken);
    setUser(newUser);
    localStorage.setItem("token", newToken);
    localStorage.setItem("user", JSON.stringify(newUser));
  };


  const logout = () => {
    setToken(null);
    setUser(null);
    setCurrentUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

 
  const getCurrentUser = async () => {
    if (!user?._id) return;

    setUserLoading(true);
    try {
      const res = await axiosInstance.get(USERS_URLS.GET_CURRENT_USER(user._id));
      const updatedUser = res.data?.data?.user;
      console.log(res)
      if (updatedUser) {
        setCurrentUser(updatedUser); 
      }
    } catch (error) {
      console.error("Failed to fetch current user:", error);
    } finally {
      setUserLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        currentUser, 
        token,
        login,
        logout,
        isAuthenticated: !!token,
        loading,
        userLoading,
        getCurrentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("AuthContext missing");
  return ctx;
};
