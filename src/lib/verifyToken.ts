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

//asynchronously returns a error message if any and the decoded payload as object
export async function verifyToken(claims: string) {
  let errorMessage;
  let decodedPayload;
  const secret = new TextEncoder().encode(process.env.AUTH_SECRET);
  try {
    const { payload } = (await jose.jwtVerify(claims, secret)).payload;
    decodedPayload = payload;
  } catch (error) {
    console.log(error);

    errorMessage = error;
  }

  return { errorMessage, decodedPayload };
}
