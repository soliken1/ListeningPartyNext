import { NextResponse } from "next/server";

export function middleware(request) {
  const currentUser = request.cookies.get("currentUser")?.value;

  if (currentUser && request.nextUrl.pathname === "/login") {
    return NextResponse.redirect(new URL("/rooms", request.url));
  }

  if (!currentUser && request.nextUrl.pathname.startsWith("/rooms")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/rooms/:path*", "/login"],
};
