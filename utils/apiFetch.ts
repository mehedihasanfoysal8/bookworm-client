/* eslint-disable @typescript-eslint/no-explicit-any */
import toast from "react-hot-toast";
import { BASE_API } from "./baseApi";

type ErrorSource = {
  path?: string;
  message: string;
};

export async function apiFetch<T>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  const res = await fetch(`${BASE_API}${url}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  let data: any = null;

  try {
    data = await res.json();
  } catch {}

  if (!res.ok) {
    if (Array.isArray(data?.errorSources) && data.errorSources.length > 0) {
      const shownErrors = new Set<string>();

      data.errorSources.forEach((err: ErrorSource) => {
        if (!shownErrors.has(err.message)) {
          shownErrors.add(err.message);
          toast.error(err.message);
        }
      });

      throw new Error("Validation error");
    }

    if (data?.message) {
      toast.error(data.message);
      throw new Error(data.message);
    }

    toast.error("Something went wrong");
    throw new Error("Request failed");
  }

  return data as T;
}
