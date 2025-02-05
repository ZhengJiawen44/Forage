import { cookies } from "next/headers";
import { verifyToken } from "../token/verifyToken";

export async function getTimeLeftSeconds(): Promise<number> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  if (!token) {
    throw Error("token does not exist in cookie");
  }

  const { decodedPayload, errorMessage } = await verifyToken(token.value);

  if (errorMessage) {
    throw new Error(errorMessage);
  }
  //get the remaining time
  const currDate = new Date();
  const expiryDate = new Date(decodedPayload.cookieExpiryDate);
  if (isNaN(expiryDate.getTime())) {
    throw new Error("Invalid cookie expiry time");
  }
  const timeLeft = Math.abs((currDate.getTime() - expiryDate.getTime()) / 1000);
  console.log("time left in second: ", timeLeft);

  return timeLeft;
}
