import { Request, Response } from "express";
import * as adminService from "../services/admin.service";

export const getAllUsers = async (_req: Request, res: Response) => {
  const users = await adminService.getAllUsers();
  res.json({ users });
};

export const toggleUserBan = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { ban } = req.body;
  const user = await adminService.toggleBanUser(userId, ban);
  res.json({ message: `User ${ban ? "banned" : "unbanned"}`, user });
};

export const toggleAdmin = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { promote } = req.body;
  const user = await adminService.toggleAdminRole(userId, promote);
  res.json({
    message: `User ${promote ? "promoted to" : "demoted from"} admin`,
    user,
  });
};

export const getUserLogs = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const activity = await adminService.getUserActivity(userId);
  res.json({ activity });
};

export const getAllPosts = async (_req: Request, res: Response) => {
  const posts = await adminService.getAllPosts();
  res.json({ posts });
};

export const getAllComments = async (_req: Request, res: Response) => {
  const comments = await adminService.getAllComments();
  res.json({ comments });
};

export const removePost = async (req: Request, res: Response) => {
  const { postId } = req.params;
  await adminService.deletePost(postId);
  res.json({ message: "Post deleted" });
};

export const removeComment = async (req: Request, res: Response) => {
  const { commentId } = req.params;
  await adminService.deleteComment(commentId);
  res.json({ message: "Comment deleted" });
};

export const getDashboardStats = async (_req: Request, res: Response) => {
  const stats = await adminService.getStats();
  res.json({ stats });
};

export const getTeam = async (_req: Request, res: Response) => {
  const team = await adminService.getAdminTeam();
  res.json({ team });
};
