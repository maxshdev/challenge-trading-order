// proxy.ts (Next.js 16)
import { NextRequest, NextResponse } from "next/server";
import createIntlMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createIntlMiddleware(routing);

export default async function proxy(req: NextRequest) {
  // ⭐ Todas las rutas => next-intl
  return intlMiddleware(req);
}

export const config = {
  matcher: [
    "/((?!api|trpc|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next|_vercel).*)",
  ],
};
