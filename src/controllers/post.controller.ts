import { Request, Response } from "express";
import * as postService from "../services/post.service";

export const createPost = async (req: Request, res: Response) => {
  const post = await postService.createPost(
    req.user.id,
    req.body.text,
    req.file
  );
  res.status(201).json({ message: "Post created", post });
};

export const getFeed = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const posts = await postService.getFeedPosts(page);
  res.json({ posts });
};

export const getPost = async (req: Request, res: Response) => {
  const post = await postService.getPostById(req.params.id);
  if (!post) return res.status(404).json({ message: "Post not found" });
  res.json({ post });
};

export const updatePost = async (req: Request, res: Response) => {
  const updated = await postService.updatePost(
    req.params.id,
    req.user.id,
    req.body.text
  );
  if (!updated)
    return res.status(403).json({ message: "Unauthorized or post not found" });
  res.json({ message: "Post updated", post: updated });
};

export const deletePost = async (req: Request, res: Response) => {
  const deleted = await postService.deletePost(req.params.id, req.user.id);
  if (!deleted)
    return res.status(403).json({ message: "Unauthorized or post not found" });
  res.json({ message: "Post deleted" });
};

export const likeOrUnlikePost = async (req: Request, res: Response) => {
  const post = await postService.toggleLike(req.params.id, req.user.id);
  res.json({ message: "Toggled like", post });
};
