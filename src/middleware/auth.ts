import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";

configDotenv();

const ACCESS_SECRET = process.env.ACCESS_SECRET!;

export const authMiddleware = (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  const auth = req.headers.authorization;
  if (auth?.startsWith("Bearer ")) {
    try {
      const token = auth.split(" ")[1];
      const payload: any = jwt.verify(token, ACCESS_SECRET);
      (req as any).userId = payload.userId;
    } catch {}
  }
  next();
};
