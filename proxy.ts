import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";

const intlMiddleware = createMiddleware({
  locales: ["en", "ar"],
  defaultLocale: "en",
  localePrefix: "always",
  localeCookie: {
    name: "task_locale",
    maxAge: 31536000,
    path: "/",
  },
});

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. ADD THIS GUARD: Stop middleware for API routes
  if (pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  const pathnameIsMissingLocale =
    !pathname.startsWith("/en") && !pathname.startsWith("/ar");

  if (pathnameIsMissingLocale) {
    const direction = request.cookies.get("direction")?.value;
    const preferredLocale = direction === "rtl" ? "ar" : "en";

    request.cookies.set("task_locale", preferredLocale);
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: [
    // Standard Next.js exclusion pattern
    "/((?!api|_next/static|_next/image|favicon.ico|icons|images|products).*)",
  ],
};
