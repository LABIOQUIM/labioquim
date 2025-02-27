import { NextRequest, NextResponse } from "next/server";
import { createI18nMiddleware } from "next-international/middleware";

export const config = {
  matcher: ["/((?!api|static|_next|favicon.ico|robots.txt|sw.js).*)"],
};

const I18nMiddlewareInstance = createI18nMiddleware({
  locales: ["en-US"],
  defaultLocale: "en-US",
  urlMappingStrategy: "rewrite",
});

interface PublicRoute {
  path: string;
  whenAuthenticated: "redirect" | "donothing";
}

const publicRoutes: PublicRoute[] = [
  { path: "/", whenAuthenticated: "donothing" },
];

const REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE = "/";

export default function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const publicRoute = publicRoutes.find((route) => route.path === path);
  const authToken = request.cookies.get("session");

  if (!authToken && publicRoute) {
    return I18nMiddlewareInstance(request);
  }

  if (!authToken && !publicRoute) {
    const redirectUrl = request.nextUrl.clone();

    redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE;

    return NextResponse.redirect(redirectUrl);
  }

  return I18nMiddlewareInstance(request);
}
