import jwt from "jsonwebtoken";

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined");
}

const JWT_SECRET: string = process.env.JWT_SECRET;

export const signResetToken = (email: string, code: string) => {
  return jwt.sign({ email, code }, JWT_SECRET, { expiresIn: "10m" });
};

export const verifyResetToken = (token: string) => {
  try {
    return jwt.verify(token, JWT_SECRET) as { email: string; code: string };
  } catch {
    return null;
  }
};

export const compareResetCode = (token: string, inputCode: string): boolean => {
  const decoded = verifyResetToken(token);
  if (!decoded) return false;
  return decoded.code === inputCode;
};
