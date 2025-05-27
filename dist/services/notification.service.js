"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.markAllAsRead = exports.markAsRead = exports.getUserNotifications = exports.createNotification = void 0;
const notification_1 = require("../models/notification");
const createNotification = (recipientId, type, content, referenceId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield notification_1.Notification.create({
        recipient: recipientId,
        type,
        content,
        referenceId,
    });
});
exports.createNotification = createNotification;
const getUserNotifications = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield notification_1.Notification.find({ recipient: userId }).sort({ createdAt: -1 });
});
exports.getUserNotifications = getUserNotifications;
const markAsRead = (notificationId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield notification_1.Notification.findByIdAndUpdate(notificationId, { isRead: true }, { new: true });
});
exports.markAsRead = markAsRead;
const markAllAsRead = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield notification_1.Notification.updateMany({ recipient: userId, isRead: false }, { isRead: true });
});
exports.markAllAsRead = markAllAsRead;
