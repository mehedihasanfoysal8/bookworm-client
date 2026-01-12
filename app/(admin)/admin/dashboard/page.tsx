"use client";

import { useAuth } from "@/context/AuthContext";

export default function AdminDashboard() {
  const { user } = useAuth();

  if (user?.role !== "admin") return null;

  return <h1 className="p-6 text-xl">Admin Dashboard</h1>;
}
