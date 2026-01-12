"use client";

import { useEffect, useState } from "react";
import { getAllUsers, updateUserRole } from "@/services/user.service";
import { TUser, TUserRole } from "@/types/user";
import Image from "next/image";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<TUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers();
        setUsers(data);
      } catch (err) {
        setError("Failed to load users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleRoleChange = async (userId: string, newRole: TUserRole) => {
    try {
      setUpdatingId(userId);
      await updateUserRole(userId, newRole);

      setUsers((prev) =>
        prev.map((user) =>
          user._id === userId ? { ...user, role: newRole } : user
        )
      );
    } catch {
      alert("Failed to update role");
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) {
    return <p className="p-6">Loading users...</p>;
  }

  if (error) {
    return <p className="p-6 text-red-500">{error}</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Manage Users</h1>

      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Role</th>
              <th className="px-4 py-2 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2">
                  <div className="flex items-center gap-2">
                    <Image
                      src={user.photo || "/avatar.png"}
                      alt=""
                      width={50}
                      height={30}
                      className="w-8 h-8 rounded-full"
                    />
                    {user.name}
                  </div>
                </td>

                <td className="px-4 py-2">{user.email}</td>

                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      user.role === "admin"
                        ? "bg-green-100 text-green-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>

                <td className="px-4 py-2">
                  <select
                    value={user.role}
                    disabled={updatingId === user._id}
                    onChange={(e) =>
                      handleRoleChange(user._id, e.target.value as TUserRole)
                    }
                    className="border rounded px-2 py-1"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>

                  {updatingId === user._id && (
                    <span className="ml-2 text-xs text-gray-400">
                      Updating...
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
