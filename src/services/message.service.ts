import { Message } from "../models/message";
import { Types } from "mongoose";

export const sendMessage = async (
  senderId: string,
  receiverId: string,
  content: string
) => {
  return await Message.create({
    sender: senderId,
    receiver: receiverId,
    content,
  });
};

export const getConversation = async (user1Id: string, user2Id: string) => {
  return await Message.find({
    $or: [
      { sender: user1Id, receiver: user2Id },
      { sender: user2Id, receiver: user1Id },
    ],
  })
    .sort({ createdAt: 1 })
    .populate("sender", "username avatar")
    .populate("receiver", "username avatar");
};

export const getUserConversations = async (userId: string) => {
  return await Message.aggregate([
    {
      $match: {
        $or: [
          { sender: new Types.ObjectId(userId) },
          { receiver: new Types.ObjectId(userId) },
        ],
      },
    },
    {
      $group: {
        _id: {
          sender: "$sender",
          receiver: "$receiver",
        },
        lastMessage: { $last: "$$ROOT" },
      },
    },
    {
      $replaceRoot: { newRoot: "$lastMessage" },
    },
    {
      $sort: { createdAt: -1 },
    },
  ]);
};

export const deleteMessage = async (userId: string, messageId: string) => {
  const result = await Message.deleteOne({
    _id: messageId,
    $or: [{ sender: userId }, { receiver: userId }],
  }).exec();
  return result.deletedCount > 0;
};
