import { Request, Response, NextFunction } from "express";

interface User {
  id: string;
  role: string;
  // add other user properties if needed
}

interface AuthenticatedRequest extends Request {
  user: User;
}

export const isAdmin = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied: Admins only" });
  }
  next();
};
