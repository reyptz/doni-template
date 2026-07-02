import { NextRequest, NextResponse } from "next/server";

const STAFF_ROLES = ["ADMIN", "FORMATEUR", "INSTRUCTOR"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("doni.token")?.value;
  const role = req.cookies.get("doni.role")?.value?.toUpperCase() ?? "";

  // /admin/* nécessite d'être authentifié ET d'avoir un rôle staff
  if (pathname.startsWith("/admin")) {
    if (!token) {
      const url = req.nextUrl.clone();
      url.pathname = "/connexion";
      url.searchParams.set("next", pathname);
      return NextResponse.redirect(url);
    }
    if (!STAFF_ROLES.includes(role)) {
      return NextResponse.redirect(new URL("/profil", req.url));
    }
  }

  // /profil/* nécessite token
  if (pathname.startsWith("/profil") && !token) {
    const url = req.nextUrl.clone();
    url.pathname = "/connexion";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/profil/:path*"],
};
