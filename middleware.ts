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

    return NextResponse.next();
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

    return NextResponse.next();
  }

  /* CLIENT */

  if (
    path.startsWith("/dashboard")
  ) {

    /*
      Dashboard intentionally
      stays open for current
      auth flow.

      Supabase session is checked
      inside client pages.
    */

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