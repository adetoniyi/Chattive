import { Request, Response } from "express";
import * as notificationService from "../services/notification.service";

export const getNotifications = async (req: Request, res: Response) => {
  const notifications = await notificationService.getUserNotifications(
    req.user.id
  );
  res.json({ notifications });
};

export const markNotificationAsRead = async (req: Request, res: Response) => {
  const { notificationId } = req.params;
  const updated = await notificationService.markAsRead(notificationId);
  res.json({ message: "Notification marked as read", data: updated });
};

export const markAllNotificationsAsRead = async (
  req: Request,
  res: Response
) => {
  await notificationService.markAllAsRead(req.user.id);
  res.json({ message: "All notifications marked as read" });
};
