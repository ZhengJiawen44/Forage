import { cookies } from "next/headers";

export async function getUserTokenString(): Promise<string> {
  const cookieStore = await cookies();
  // Construct the Cookie header string from the client's cookies
  const cookieString = cookieStore
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join("; ");
  return cookieString;
}
