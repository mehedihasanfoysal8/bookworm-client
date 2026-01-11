import { jwtDecode } from "jwt-decode";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

type TJWTPayload = {
  role: "admin" | "user";
};

export function proxy(req: NextRequest) {
  const token = req.cookies.get("accessToken")?.value;

  const pathname = req.nextUrl.pathname;

  // not logged in
  if (!token && pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (token) {
    const decoded = jwtDecode<TJWTPayload>(token);

    // 🔒 Admin route protection
    if (pathname.startsWith("/admin") && decoded.role !== "admin") {
      return NextResponse.redirect(new URL("/library", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/library/:path*"],
};
