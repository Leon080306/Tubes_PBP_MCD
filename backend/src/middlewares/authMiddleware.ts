import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization; //buat ambil header yg bearer di postman trs di simpen ke authHeader

    if (!authHeader) { //kalau ga ada berarti tokennya ga dapet
      return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1] as string; //split tokennya ambil yg array ke 1

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET not defined");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET); //cek tokennya

    (req as any).user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};