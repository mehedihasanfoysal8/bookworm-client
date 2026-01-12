import AdminSidebar from "@/components/Admin/AdminSidebar/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <main className="flex-1 min-h-screen bg-slate-100">{children}</main>
    </div>
  );
}
