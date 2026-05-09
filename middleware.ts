import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(
  request: NextRequest
) {

  const role =
    request.cookies.get("role")?.value;

  const path =
    request.nextUrl.pathname;

  /* ADMIN */

  if (
    path.startsWith("/admin")
  ) {

    if (role !== "admin") {

      return NextResponse.redirect(
        new URL(
          "/login",
          request.url
        )
      );
    }
  }

  /* SUPPLIER */

  if (
    path.startsWith("/supplier")
  ) {

    if (role !== "supplier") {

      return NextResponse.redirect(
        new URL(
          "/login",
          request.url
        )
      );
    }
  }

  /* CLIENT DASHBOARD */

  if (
    path.startsWith("/dashboard")
  ) {

    return NextResponse.next();
  }

  /* PUBLIC */

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/supplier/:path*",
    "/dashboard/:path*",
  ],
};