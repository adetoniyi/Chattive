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
exports.deleteComment = exports.updateComment = exports.getCommentsByPost = exports.createComment = void 0;
const comment_1 = require("../models/comment");
const createComment = (userId, postId, text, parentCommentId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield comment_1.Comment.create({
        user: userId,
        post: postId,
        text,
        parentComment: parentCommentId || null,
    });
});
exports.createComment = createComment;
const getCommentsByPost = (postId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield comment_1.Comment.find({ post: postId })
        .sort({ createdAt: -1 })
        .populate("user", "username avatar");
});
exports.getCommentsByPost = getCommentsByPost;
const updateComment = (commentId, userId, text) => __awaiter(void 0, void 0, void 0, function* () {
    return yield comment_1.Comment.findOneAndUpdate({ _id: commentId, user: userId }, { text }, { new: true });
});
exports.updateComment = updateComment;
const deleteComment = (commentId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield comment_1.Comment.findOneAndDelete({ _id: commentId, user: userId });
});
exports.deleteComment = deleteComment;
