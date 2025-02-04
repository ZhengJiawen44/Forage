import { cookies } from "next/headers";
import { verifyToken } from "../token/verifyToken";
import { signToken } from "../token/signToken";

export async function getTimeLeftSeconds(): Promise<number> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  if (!token) {
    throw Error("token does not exist in cookie");
  }

  const { decodedPayload, errorMessage } = await verifyToken(token.value);

  //get the remaining time
  const currDate = new Date();
  const expiryDate = new Date(decodedPayload.cookieExpiryTime);
  const timeLeft = Math.abs((currDate.getTime() - expiryDate.getTime()) / 1000);

  return timeLeft;
}
