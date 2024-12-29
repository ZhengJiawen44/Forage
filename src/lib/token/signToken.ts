import * as jose from "jose";

//asynchronously returns a base64 encoded JWT token in string
export async function signToken(payload: object, expiresIn: string) {
  const secret = new TextEncoder().encode(process.env.AUTH_SECRET);
  const token = await new jose.SignJWT({ payload })
    .setProtectedHeader({
      alg: "HS256",
    })
    .setExpirationTime(expiresIn)
    .sign(secret);

  return token;
}
