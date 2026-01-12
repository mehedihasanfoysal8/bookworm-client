export const registerUser = async (payload: {
  name: string;
  email: string;
  password: string;
}) => {
  const res = await fetch("http://localhost:5000/api/v1/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    if (data?.errorSources?.length) {
      throw new Error(data.errorSources[0].message);
    }

    throw new Error(data.message || "Registration failed");
  }

  return data.data;
};

export const getMe = async () => {
  const res = await fetch("http://localhost:5000/api/v1/auth/me", {
    credentials: "include",
  });

  if (!res.ok) {
    return null;
  }

  const data = await res.json();
  return data.data;
};

export const loginUser = async (payload: {
  email: string;
  password: string;
}) => {
  const res = await fetch("http://localhost:5000/api/v1/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    if (data?.errorSources?.length) {
      throw new Error(data.errorSources[0].message);
    }
    throw new Error(data.message || "Login failed");
  }

  return true; // just success signal
};
