import { Request, Response, NextFunction } from "express";
import * as AuthService from "../services/auth.service";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await AuthService.registerUser(req.body);
    res.json({ message: "Registration successful" });
  } catch (err) {
    next(err);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const result = await AuthService.loginUser(email, password);
    res.status(200).json({ message: "Login successful", ...result });
  } catch (err) {
    next(err);
  }
};
