export type TUserRole = "user" | "admin";

export type TUser = {
  userId: string;
  email: string;
  role: TUserRole;
  name: string;
  photo?: string;
};

export type TAuthContext = {
  user: TUser | null;
  logout: () => void;
  loading: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  refreshUser: any;
};
