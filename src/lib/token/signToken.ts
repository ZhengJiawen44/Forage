import * as jose from "jose";

//asynchronously returns a base64 encoded JWT token in string
export async function signToken(payload: object, expiryDate: Date) {
  console.log(expiryDate);

  const secret = new TextEncoder().encode(process.env.AUTH_SECRET);
  const token = await new jose.SignJWT({ payload })
    .setProtectedHeader({
      alg: "HS256",
    })
    .setExpirationTime(new Date(expiryDate))
    .sign(secret);

  return token;
}
