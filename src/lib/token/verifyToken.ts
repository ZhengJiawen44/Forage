import * as jose from "jose";

//asynchronously returns a error message if any and the decoded payload as object
export async function verifyToken(
  claims: string
): Promise<{ errorMessage: String; decodedPayload: { [key: string]: any } }> {
  let errorMessage;
  let decodedPayload;
  const secret = new TextEncoder().encode(process.env.AUTH_SECRET);
  try {
    const { payload } = (await jose.jwtVerify(claims, secret)).payload;
    decodedPayload = payload;
  } catch (error) {
    console.log(error);

    errorMessage = String(error);
  }

  return { errorMessage, decodedPayload };
}
