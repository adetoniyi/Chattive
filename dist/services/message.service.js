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
exports.deleteMessage = exports.getUserConversations = exports.getConversation = exports.sendMessage = void 0;
const message_1 = require("../models/message");
const mongoose_1 = require("mongoose");
const sendMessage = (senderId, receiverId, content) => __awaiter(void 0, void 0, void 0, function* () {
    return yield message_1.Message.create({
        sender: senderId,
        receiver: receiverId,
        content,
    });
});
exports.sendMessage = sendMessage;
const getConversation = (user1Id, user2Id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield message_1.Message.find({
        $or: [
            { sender: user1Id, receiver: user2Id },
            { sender: user2Id, receiver: user1Id },
        ],
    })
        .sort({ createdAt: 1 })
        .populate("sender", "username avatar")
        .populate("receiver", "username avatar");
});
exports.getConversation = getConversation;
const getUserConversations = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield message_1.Message.aggregate([
        {
            $match: {
                $or: [
                    { sender: new mongoose_1.Types.ObjectId(userId) },
                    { receiver: new mongoose_1.Types.ObjectId(userId) },
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
});
exports.getUserConversations = getUserConversations;
const deleteMessage = (userId, messageId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield message_1.Message.deleteOne({
        _id: messageId,
        $or: [{ sender: userId }, { receiver: userId }],
    }).exec();
    return result.deletedCount > 0;
});
exports.deleteMessage = deleteMessage;
