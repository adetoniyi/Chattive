import User, { IUser } from "../models/user";
import { Post } from "../models/post";
import { Comment } from "../models/comment";
import { Notification } from "../models/notification";
import { Message } from "../models/message";

// Users
export const getAllUsers = async () => await User.find();
export const toggleBanUser = async (userId: string, ban: boolean) =>
  await User.findByIdAndUpdate(userId, { isBanned: ban }, { new: true });

// Admin privilege
export const toggleAdminRole = async (userId: string, promote: boolean) =>
  await User.findByIdAndUpdate(
    userId,
    { role: promote ? "admin" : "user" },
    { new: true }
  );

// Activity logs
export const getUserActivity = async (userId: string) => {
  const posts = await Post.find({ author: userId });
  const comments = await Comment.find({ author: userId });
  return { posts, comments };
};

// Content Moderation
export const getAllPosts = async () => await Post.find();
export const getAllComments = async () => await Comment.find();
export const deletePost = async (postId: string) =>
  await Post.findByIdAndDelete(postId);
export const deleteComment = async (commentId: string) =>
  await Comment.findByIdAndDelete(commentId);

// Stats
export const getStats = async () => {
  const totalUsers = await User.countDocuments();
  const totalPosts = await Post.countDocuments();
  const totalComments = await Comment.countDocuments();
  const totalMessages = await Message.countDocuments();
  return { totalUsers, totalPosts, totalComments, totalMessages };
};

// Team
export const getAdminTeam = async () => await User.find({ role: "admin" });
