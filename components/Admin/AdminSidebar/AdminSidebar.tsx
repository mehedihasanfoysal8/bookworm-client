"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const adminLinks = [
  {
    label: "Dashboard",
    href: "/admin/dashboard",
  },
  {
    label: "Manage Users",
    href: "/admin/users",
  },
  {
    label: "Manage Books",
    href: "/admin/books",
  },
  {
    label: "Manage Genres",
    href: "/admin/genres",
  },
  {
    label: "Review Moderation",
    href: "/admin/reviews",
  },
];

const AdminSidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="w-64 min-h-screen bg-slate-900 text-white">
      <div className="p-5 text-xl font-bold border-b border-slate-700">
        BookWorm Admin
      </div>

      <nav className="mt-4 space-y-1">
        {adminLinks.map((link) => {
          const isActive = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`block px-5 py-2 transition ${
                isActive
                  ? "bg-slate-800 text-blue-400"
                  : "hover:bg-slate-800 hover:text-blue-300"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default AdminSidebar;
