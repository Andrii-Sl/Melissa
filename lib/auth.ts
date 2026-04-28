import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export function sign(payload: string | object | Buffer) {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: "7d",
  });
}

export function verify(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}
