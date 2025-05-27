import { Request, Response, NextFunction } from "express";
import * as userService from "../services/user.service";

export const getProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userService.getUserById(req.user.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

export const updateProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const updatedUser = await userService.updateUserProfile(
      req.user.id,
      req.body,
      req.file
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
};

export const followUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await userService.followUser(req.user.id, req.params.userId);
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

export const unfollowUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await userService.unfollowUser(req.user.id, req.params.userId);
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};
