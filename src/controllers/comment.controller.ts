import { Request, Response } from "express";
import * as commentService from "../services/comment.service";

// Extend Express Request interface to include 'user'
declare global {
  namespace Express {
    interface User {
      id: string;
      // add other user properties if needed
    }
    interface Request {
      user: User;
    }
  }
}

export const addComment = async (req: Request, res: Response) => {
  const { text, parentComment } = req.body;
  const { postId } = req.params;

  const comment = await commentService.createComment(
    req.user.id,
    postId,
    text,
    parentComment
  );
  res.status(201).json({ message: "Comment added", comment });
};

export const getPostComments = async (req: Request, res: Response) => {
  const comments = await commentService.getCommentsByPost(req.params.postId);
  res.json({ comments });
};

export const updateComment = async (req: Request, res: Response) => {
  const updated = await commentService.updateComment(
    req.params.id,
    req.user.id,
    req.body.text
  );
  if (!updated)
    return res.status(403).json({ message: "Unauthorized or not found" });
  res.json({ message: "Comment updated", comment: updated });
};

export const deleteComment = async (req: Request, res: Response) => {
  const deleted = await commentService.deleteComment(
    req.params.id,
    req.user.id
  );
  if (!deleted)
    return res.status(403).json({ message: "Unauthorized or not found" });
  res.json({ message: "Comment deleted" });
};
