import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_ROUTES = ["/", "/login", "/register", "/books", "/subscriptions"];
const USER_DASHBOARD = "/dashboard/user";
const ADMIN_DASHBOARD = "/dashboard/admin";

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register"],
};

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get("accessToken")?.value;

  // Allow public routes
  if (PUBLIC_ROUTES.includes(pathname)) {
    return NextResponse.next();
  }

  // No token → redirect to login
  if (!accessToken && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (accessToken) {
    try {
      // Call Next.js API route instead of external backend
      const res = await fetch(
        new URL("/api/user/me", request.url).toString(),
        {
          headers: {
            Cookie: request.cookies.toString(),
          },
        }
      );

      if (!res.ok) {
        return NextResponse.redirect(new URL("/login", request.url));
      }

      const json = await res.json();

      if (!json?.data) {
        return NextResponse.redirect(new URL("/login", request.url));
      }

      const role = json.data.role;

      // Role protection
      if (pathname.startsWith("/dashboard/admin") && role !== "admin") {
        return NextResponse.redirect(new URL(USER_DASHBOARD, request.url));
      }

      if (pathname.startsWith("/dashboard/user") && role !== "user") {
        return NextResponse.redirect(new URL(ADMIN_DASHBOARD, request.url));
      }
    } catch (err) {
      console.error("AUTH ERROR IN MIDDLEWARE:", err);
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}