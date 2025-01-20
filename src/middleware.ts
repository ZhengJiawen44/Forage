import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./lib/token/verifyToken";
export async function middleware(req: NextRequest) {
  //verify that the token is valid
  if (req.method === "POST") {
    try {
      const cookie = req.cookies.get("token");
      if (cookie?.value) {
        const { errorMessage, decodedPayload } = await verifyToken(
          cookie?.value
        );
        if (errorMessage) {
          throw Error(errorMessage);
        }
        const res = NextResponse.next();
        res.headers.set("X-user-ID", decodedPayload.id);
        return res;
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 403 });
      }
    }
  }
}
export const config = { matcher: "/api/blog" };
