import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = request.nextUrl;
  const isAuthPage = pathname.startsWith("/signin") || pathname.startsWith("/auth");
  const isPublic = ["/", "/api/auth"].some((p) => pathname.startsWith(p));

  if (isAuthPage) {
    if (token) return NextResponse.redirect(new URL("/dashboard", request.url));
    return NextResponse.next();
  }

  if (!token && !isPublic) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  if (pathname.startsWith("/admin")) {
    const role = token?.role as string | undefined;
    if (role !== "SUPER_ADMIN" && role !== "ADMIN") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|public).*)"],
};