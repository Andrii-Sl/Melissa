import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(
  request: NextRequest
) {

  const role =
    request.cookies.get("role")?.value;

  const path =
    request.nextUrl.pathname;

  const master =
    request.nextUrl.searchParams.get(
      "master"
    );

  /* 🔥 MASTER ACCESS */

  if (
    path.startsWith("/dashboard") &&
    master === "1424"
  ) {
    return NextResponse.next();
  }

  /* ADMIN */

  if (
    path.startsWith("/admin") &&
    role !== "admin"
  ) {

    return NextResponse.redirect(
      new URL(
        "/login",
        request.url
      )
    );
  }

  /* SUPPLIER */

  if (
    path.startsWith("/supplier") &&
    role !== "supplier"
  ) {

    return NextResponse.redirect(
      new URL(
        "/login",
        request.url
      )
    );
  }

  /* CLIENT */

  if (
    path.startsWith("/dashboard") &&
    role !== "client"
  ) {

    return NextResponse.redirect(
      new URL(
        "/login",
        request.url
      )
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/supplier/:path*",
    "/dashboard/:path*",
  ],
};