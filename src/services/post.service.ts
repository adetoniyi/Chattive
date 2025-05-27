import { Post } from "../models/post";
import { uploadToCloudinary } from "../utils/cloudinary";
import { createNotification } from "./notification.service";

export const createPost = async (
  userId: string,
  text: string,
  file?: Express.Multer.File
) => {
  let media;
  if (file) {
    const result = await uploadToCloudinary(file.path);
    media = {
      url: result.secure_url,
      type: file.mimetype.startsWith("video") ? "video" : "image",
    };
  }

  const post = await Post.create({ user: userId, text, media });
  return post;
};

export const getFeedPosts = async (page = 1, limit = 10) => {
  const posts = await Post.find()
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit)
    .populate("user", "username name avatar");
  return posts;
};

export const getPostById = async (postId: string) => {
  return await Post.findById(postId).populate("user", "username name avatar");
};

export const updatePost = async (
  postId: string,
  userId: string,
  text: string
) => {
  return await Post.findOneAndUpdate(
    { _id: postId, user: userId },
    { text },
    { new: true }
  );
};

export const deletePost = async (postId: string, userId: string) => {
  return await Post.findOneAndDelete({ _id: postId, user: userId });
};

export const toggleLike = async (postId: string, userId: string) => {
  const post = await Post.findById(postId);
  if (!post) throw new Error("Post not found");

  const liked = post.likes.includes(userId as any);

  if (liked) {
    post.likes = post.likes.filter(
      (id: any) => id.toString() !== userId.toString()
    );
  } else {
    post.likes.push(new (require("mongoose").Types.ObjectId)(userId));
  }

  await post.save();
  return post;
};
