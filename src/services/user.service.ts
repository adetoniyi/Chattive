import User from "../models/user";
import { uploadToCloudinary } from "../utils/cloudinary";

export const getUserById = async (userId: string) => {
  return User.findById(userId).select("-password");
};

export const updateUserProfile = async (
  userId: string,
  data: any,
  file?: Express.Multer.File
) => {
  if (file) {
    const upload = await uploadToCloudinary(file.path);
    data.avatar = upload.secure_url;
  }
  return User.findByIdAndUpdate(userId, data, { new: true }).select(
    "-password"
  );
};

export const followUser = async (
  currentUserId: string,
  targetUserId: string
) => {
  const currentUser = await User.findById(currentUserId);
  const targetUser = await User.findById(targetUserId);

  if (!targetUser || !currentUser) throw new Error("User not found");

  const mongoose = require("mongoose");
  const currentUserObjectId = new mongoose.Types.ObjectId(currentUserId);
  const targetUserObjectId = new mongoose.Types.ObjectId(targetUserId);

  if (!targetUser.followers.includes(currentUserObjectId)) {
    targetUser.followers.push(currentUserObjectId);
    currentUser.following.push(targetUserObjectId);
    await targetUser.save();
    await currentUser.save();
  }

  return { message: "User followed successfully" };
};

export const unfollowUser = async (
  currentUserId: string,
  targetUserId: string
) => {
  const currentUser = await User.findById(currentUserId);
  const targetUser = await User.findById(targetUserId);

  if (!targetUser || !currentUser) throw new Error("User not found");

  targetUser.followers = targetUser.followers.filter(
    (id) => id.toString() !== currentUserId
  );
  currentUser.following = currentUser.following.filter(
    (id) => id.toString() !== targetUserId
  );
  await targetUser.save();
  await currentUser.save();

  return { message: "User unfollowed successfully" };
};
