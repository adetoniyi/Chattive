import { Request, Response } from "express";
import * as messageService from "../services/message.service";

export const sendMessage = async (req: Request, res: Response) => {
  const { receiverId, content } = req.body;
  const message = await messageService.sendMessage(
    req.user.id,
    receiverId,
    content
  );
  res.status(201).json({ message: "Message sent", data: message });
};

export const getConversation = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const conversation = await messageService.getConversation(
    req.user.id,
    userId
  );
  res.json({ conversation });
};

export const deleteMessage = async (req: Request, res: Response) => {
  const { messageId } = req.params;
  const deleted = await messageService.deleteMessage(req.user.id, messageId);
  if (!deleted) {
    return res
      .status(403)
      .json({ message: "Unauthorized or message not found" });
  }
  res.json({ message: "Message deleted" });
};

export const getUserConversations = async (req: Request, res: Response) => {
  const conversations = await messageService.getUserConversations(req.user.id);
  res.json({ conversations });
};
