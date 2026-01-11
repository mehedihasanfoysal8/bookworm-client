"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-blue-600">
          BookWorm
        </Link>

        {/* Links */}
        <div className="flex items-center gap-4">
          {!user && (
            <>
              <Link href="/login" className="text-gray-600 hover:text-blue-600">
                Login
              </Link>
              <Link
                href="/register"
                className="text-gray-600 hover:text-blue-600"
              >
                Register
              </Link>
            </>
          )}

          {user && user.role === "user" && (
            <>
              <Link
                href="/library"
                className="text-gray-600 hover:text-blue-600"
              >
                My Library
              </Link>
              <Link href="/books" className="text-gray-600 hover:text-blue-600">
                Browse Books
              </Link>
            </>
          )}

          {user && user.role === "admin" && (
            <>
              <Link
                href="/admin/dashboard"
                className="text-gray-600 hover:text-blue-600"
              >
                Dashboard
              </Link>
              <Link
                href="/admin/books"
                className="text-gray-600 hover:text-blue-600"
              >
                Manage Books
              </Link>
              <Link
                href="/admin/users"
                className="text-gray-600 hover:text-blue-600"
              >
                Manage Users
              </Link>
            </>
          )}

          {user && (
            <button
              onClick={logout}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
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
