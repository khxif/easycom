import type { NextFunction, Request, Response } from "express";
import { type JwtPayload, verify } from "jsonwebtoken";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      res.status(401).json({ message: "Token missing!" });
      return;
    }

    const decoded = verify(token, process.env.JWT_SECRET as string);

    res.locals._id = (decoded as JwtPayload).id;
    next();
  } catch (error) {
    console.log(`Verify Token error: ${(error as Error)?.message}`);
    res.status(500).json({ message: (error as Error)?.message });
  }
};
