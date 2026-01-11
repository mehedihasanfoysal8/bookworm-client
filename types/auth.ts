export type TUserRole = "user" | "admin";

export type TUser = {
  userId: string;
  email: string;
  role: TUserRole;
};

export type TAuthContext = {
  user: TUser | null;
  login: (token: string) => void;
  logout: () => void;
};
