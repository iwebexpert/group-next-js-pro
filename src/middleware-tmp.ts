export { default } from "next-auth/middleware"

export const config = { matcher: ["/((?!api|auth/login|auth/register|about/_next/static|_next/image|.*\\..*|favicon.ico).*)"] }
