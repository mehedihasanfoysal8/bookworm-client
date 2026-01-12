/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiResponse } from "@/types/global.type";
import { apiFetch } from "@/utils/apiFetch";

export const registerUser = async (payload: {
  name: string;
  email: string;
  password: string;
}) => {
  const res = await apiFetch<ApiResponse<null>>(`/register`, {
    method: "POST",
    body: JSON.stringify(payload),
  });

  return res.data;
};

export const getMe = async () => {
  try {
    const res = await apiFetch<ApiResponse<any>>(`/auth/me`);
    return res.data;
  } catch {
    return null;
  }
};

export const loginUser = async (payload: {
  email: string;
  password: string;
}) => {
  await apiFetch<ApiResponse<null>>(`/login`, {
    method: "POST",
    body: JSON.stringify(payload),
  });

  return true;
};
