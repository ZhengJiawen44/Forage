"use server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/token/verifyToken";
import { redirect } from "next/navigation";
export async function requireAuth(to?: string) {
  //get the user
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  if (!token?.value) {
    console.log("403 unauthorized");
    redirect(to||"/");
  }
  const { errorMessage, decodedPayload } = await verifyToken(token.value);
  if (errorMessage) {
    console.log("403 unauthorized");
    redirect(to||"/");
  }
  return decodedPayload;
}
