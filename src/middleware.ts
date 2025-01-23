import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./lib/token/verifyToken";
export async function middleware(req: NextRequest) {
  if (
    (req.nextUrl.pathname === "/api/user" && req.method === "GET") ||
    (req.nextUrl.pathname.startsWith("/api/blog") && req.method === "POST") ||
    req.method === "PATCH"
  ) {
    try {
      //verify token from cookie
      const cookie = req.cookies.get("token");

      if (!cookie?.value) {
        throw Error("unauthorized access");
      }
      const { errorMessage, decodedPayload } = await verifyToken(cookie?.value);
      if (errorMessage) {
        console.log(errorMessage);
        throw Error("unauthorized access");
      }
      const res = NextResponse.next();

      //set user ID in res header
      res.headers.set("X-user-ID", decodedPayload.id);

      return res;
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 403 });
      }
    }
  }
}
export const config = { matcher: ["/api/blog/:id*", "/api/user"] };
