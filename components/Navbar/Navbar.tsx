"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

const Navbar = () => {
  const { user, logout, loading } = useAuth();

  if (loading) {
    return (
      <nav className="bg-white border-b p-4">
        <p className="text-gray-400">Loading...</p>
      </nav>
    );
  }

  return (
    <nav className="bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-blue-600">
          BookWorm
        </Link>

        <div className="flex items-center gap-4">
          {!user && (
            <>
              <Link href="/login">Login</Link>
              <Link href="/register">Register</Link>
            </>
          )}

          {user?.role === "user" && (
            <>
              <Link href="/library">My Library</Link>
              <Link href="/books">Browse Books</Link>
            </>
          )}

          {user?.role === "admin" && (
            <>
              <Link href="/admin/dashboard">Dashboard</Link>
              <Link href="/admin/books">Manage Books</Link>
              <Link href="/admin/users">Manage Users</Link>
            </>
          )}

          {user && (
            <button
              onClick={logout}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
