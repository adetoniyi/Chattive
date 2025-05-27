import { Notification } from "../models/notification";

export const createNotification = async (
  recipientId: string,
  type: "like" | "comment" | "follow" | "message",
  content: string,
  referenceId?: string
) => {
  return await Notification.create({
    recipient: recipientId,
    type,
    content,
    referenceId,
  });
};

export const getUserNotifications = async (userId: string) => {
  return await Notification.find({ recipient: userId }).sort({ createdAt: -1 });
};

export const markAsRead = async (notificationId: string) => {
  return await Notification.findByIdAndUpdate(
    notificationId,
    { isRead: true },
    { new: true }
  );
};

export const markAllAsRead = async (userId: string) => {
  return await Notification.updateMany(
    { recipient: userId, isRead: false },
    { isRead: true }
  );
};
