import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./lib/token/verifyToken";
export async function middleware(req: NextRequest) {
  const protectedRoute = [
    { path: "/api/user", methods: ["GET"] },
    { path: "/api/user/[slug]", methods: ["PATCH"] },
    { path: "/api/blog", methods: ["POST"] },
    { path: "/api/blog/[slug]", methods: ["PATCH", "DELETE"] },
    { path: "/api/history", methods: ["GET", "DELETE"] },
    { path: "/api/history/[slug]", methods: ["DELETE"] },
    { path: "/api/pause-history", methods: ["PATCH"] },
  ];
  const isProtectedRoute = protectedRoute.some((route) => {
    const routePattern = route.path.replace(/\[.*?\]/g, "[^/]+");
    const regex = new RegExp(`^${routePattern}$`);

    return (
      regex.test(req.nextUrl.pathname) && route.methods.includes(req.method)
    );
  });

  if (!isProtectedRoute) return NextResponse.next();

  try {
    console.log("middleware begin");

    //verify token from cookie
    const cookie = req.cookies.get("token");
    cookie && console.log("token recieved");

    if (!cookie?.value) {
      throw Error("unauthorized access: token missing");
    }
    const { errorMessage, decodedPayload } = await verifyToken(cookie?.value);
    if (errorMessage) {
      console.log(errorMessage);
      throw Error("unauthorized access: malformed token");
    }
    const res = NextResponse.next();

    //set user ID in res header
    res.headers.set("X-user-ID", decodedPayload.id);

    console.log("middleware end");
    return res;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
      return NextResponse.json({ error: error.message }, { status: 403 });
    }
  }
  // catch-all case
  return NextResponse.json(
    { error: "An unknown error occurred" },
    { status: 403 }
  );
}
export const config = {
  matcher: [
    "/api/blog/:id*",
    "/api/user",
    "/api/user/:id*",
    "/api/history/:blogID*",
    "/api/pause-history",
  ],
};
