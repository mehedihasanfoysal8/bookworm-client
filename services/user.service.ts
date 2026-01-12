import { TUser, TUserRole } from "@/types/auth";
import { ApiResponse } from "@/types/global.type";
import { apiFetch } from "@/utils/apiFetch";

export const getMyProfile = async (): Promise<TUser | null> => {
  try {
    const res = await apiFetch<ApiResponse<TUser>>(`/users/me`);
    return res.data;
  } catch {
    return null;
  }
};

export const updateMyProfile = async (payload: {
  name: string;
  photo?: string;
}): Promise<TUser> => {
  const res = await apiFetch<ApiResponse<TUser>>(`/users/me`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });

  return res.data;
};

export const getAllUsers = async (): Promise<TUser[]> => {
  const res = await apiFetch<ApiResponse<TUser[]>>(`/users`);
  return res.data;
};

export const updateUserRole = async (
  userId: string,
  role: TUserRole
): Promise<TUser> => {
  const res = await apiFetch<ApiResponse<TUser>>(`/users/${userId}/role`, {
    method: "PATCH",
    body: JSON.stringify({ role }),
  });

  return res.data;
};
