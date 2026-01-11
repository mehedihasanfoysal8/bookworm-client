/* eslint-disable @typescript-eslint/no-unused-expressions */
"use client";

import { createContext, useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { TAuthContext, TUser } from "@/types/auth";

const AuthContext = createContext<TAuthContext | null>(null);

const getCookie = (name: string): string | null => {
  if (typeof document === "undefined") return null;

  const cookies = document.cookie.split("; ");
  const cookie = cookies.find((row) => row.startsWith(`${name}=`));
  return cookie ? cookie.split("=")[1] : null;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const [user, setUser] = useState<TUser | null>(() => {
    const token = getCookie("accessToken");
    if (!token) return null;

    try {
      return jwtDecode<TUser>(token);
    } catch {
      return null;
    }
  });

  const login = (token: string) => {
    const decoded = jwtDecode<TUser>(token);

    document.cookie = `accessToken=${token}; path=/`;

    setUser(decoded);

    decoded.role === "admin"
      ? router.push("/admin/dashboard")
      : router.push("/library");
  };

  const logout = async () => {
    await fetch("http://localhost:5000/api/v1/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext)!;
