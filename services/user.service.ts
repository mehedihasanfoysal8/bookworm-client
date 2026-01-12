export const getMyProfile = async () => {
  const res = await fetch("http://localhost:5000/api/v1/users/me", {
    credentials: "include",
  });
  if (!res.ok) return null;
  const data = await res.json();
  return data.data;
};

export const updateMyProfile = async (payload: {
  name: string;
  photo?: string;
}) => {
  const res = await fetch("http://localhost:5000/api/v1/users/me", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  return data.data;
};

import { TUser, TUserRole } from "@/types/user";

const API_URL = "http://localhost:5000/api/v1";

export const getAllUsers = async (): Promise<TUser[]> => {
  const res = await fetch(`${API_URL}/users`, {
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch users");
  }

  const data = await res.json();
  return data.data;
};

export const updateUserRole = async (userId: string, role: TUserRole) => {
  const res = await fetch(`${API_URL}/users/${userId}/role`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ role }),
  });

  if (!res.ok) {
    throw new Error("Failed to update role");
  }

  return res.json();
};
