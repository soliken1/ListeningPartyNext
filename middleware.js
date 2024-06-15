import { NextResponse } from "next/server";

export function middleware(request) {
  const currentUser = request.cookies.get("currentUser")?.value;

  if (currentUser && request.nextUrl.pathname.startsWith("/login")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (!currentUser && request.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login/:path*"],
};
