import { proxy as srcProxy } from "./src/proxy";

export function proxy(request) {
  return srcProxy(request);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|auth/callback).*)"],
};
