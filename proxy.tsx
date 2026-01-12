import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";

type TJWTPayload = {
  role: "admin" | "user";
};

export function proxy(req: NextRequest) {
  const token = req.cookies.get("accessToken")?.value;
  const { pathname } = req.nextUrl;

  // ✅ allow public auth routes & next internals
  if (
    pathname.startsWith("/login") ||
    pathname.startsWith("/register") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  // 🚫 not logged in
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    const decoded = jwtDecode<TJWTPayload>(token);

    // 🔒 admin protection
    if (pathname.startsWith("/admin") && decoded.role !== "admin") {
      return NextResponse.redirect(new URL("/library", req.url));
    }

    // 🧭 default route behavior
    if (pathname === "/") {
      return decoded.role === "admin"
        ? NextResponse.redirect(new URL("/admin/dashboard", req.url))
        : NextResponse.redirect(new URL("/library", req.url));
    }
  } catch {
    // token invalid/expired
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/library/:path*", "/"],
};
