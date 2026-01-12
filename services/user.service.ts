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
