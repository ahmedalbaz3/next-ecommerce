import { NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";

const intlMiddleware = createMiddleware({
  locales: ["en", "ar"],
  defaultLocale: "en",

  localePrefix: "always",
});

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const pathnameIsMissingLocale =
    !pathname.startsWith("/en") && !pathname.startsWith("/ar");

  if (pathnameIsMissingLocale) {
    const direction = request.cookies.get("direction")?.value;

    const preferredLocale = direction === "rtl" ? "ar" : "en";

    request.cookies.set("NEXT_LOCALE", preferredLocale);
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|icons|images|products|mockServiceWorker.js).*)",
  ],
};
