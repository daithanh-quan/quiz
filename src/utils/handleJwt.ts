import { jwtVerify, SignJWT } from "jose";

type JwtPayload = {
  id: string;
  email: string;
};

export async function signJwt(payload: JwtPayload): Promise<string> {
  const token = new SignJWT(payload)
    .setProtectedHeader({ alg: process.env.JWT_ALGORITHM })
    .setIssuedAt()
    .setExpirationTime(process.env.JWT_EXPIRED_TIME)
    .sign(new TextEncoder().encode(process.env.JWT_SECRET_KEY));

  return await token;
}

export async function verifyJwt(token: string): Promise<JwtPayload> {
  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET_KEY),
    );

    return payload as JwtPayload;
  } catch (error) {
    return error;
  }
}
