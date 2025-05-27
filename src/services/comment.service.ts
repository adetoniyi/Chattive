import { Comment } from "../models/comment";

export const createComment = async (
  userId: string,
  postId: string,
  text: string,
  parentCommentId?: string
) => {
  return await Comment.create({
    user: userId,
    post: postId,
    text,
    parentComment: parentCommentId || null,
  });
};

export const getCommentsByPost = async (postId: string) => {
  return await Comment.find({ post: postId })
    .sort({ createdAt: -1 })
    .populate("user", "username avatar");
};

export const updateComment = async (
  commentId: string,
  userId: string,
  text: string
) => {
  return await Comment.findOneAndUpdate(
    { _id: commentId, user: userId },
    { text },
    { new: true }
  );
};

export const deleteComment = async (commentId: string, userId: string) => {
  return await Comment.findOneAndDelete({ _id: commentId, user: userId });
};
