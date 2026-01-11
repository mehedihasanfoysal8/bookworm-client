"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { TAuthContext, TUser } from "@/types/auth";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext<TAuthContext | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<TUser | null>(null);
  const router = useRouter();

  const login = (token: string) => {
    const decoded = jwtDecode<TUser>(token);
    localStorage.setItem("accessToken", token);
    setUser(decoded);

    if (decoded.role === "admin") router.push("/dashboard");
    else router.push("/library");
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    setUser(null);
    router.push("/login");
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      const decoded = jwtDecode<TUser>(token);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setUser(decoded);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext)!;
