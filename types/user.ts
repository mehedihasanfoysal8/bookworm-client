export type TUserRole = "admin" | "user";

export interface TUser {
  _id: string;
  name: string;
  email: string;
  role: TUserRole;
  photo?: string;
}
