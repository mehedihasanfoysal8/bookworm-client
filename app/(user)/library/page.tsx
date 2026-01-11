"use client";

import { useAuth } from "@/context/AuthContext";

export default function LibraryPage() {
  const { user } = useAuth();

  if (user?.role !== "user") return null;

  return <h1 className="p-6 text-xl">My Library</h1>;
}
