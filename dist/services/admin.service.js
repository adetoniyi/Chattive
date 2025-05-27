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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAdminTeam = exports.getStats = exports.deleteComment = exports.deletePost = exports.getAllComments = exports.getAllPosts = exports.getUserActivity = exports.toggleAdminRole = exports.toggleBanUser = exports.getAllUsers = void 0;
const user_1 = __importDefault(require("../models/user"));
const post_1 = require("../models/post");
const comment_1 = require("../models/comment");
const message_1 = require("../models/message");
// Users
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () { return yield user_1.default.find(); });
exports.getAllUsers = getAllUsers;
const toggleBanUser = (userId, ban) => __awaiter(void 0, void 0, void 0, function* () { return yield user_1.default.findByIdAndUpdate(userId, { isBanned: ban }, { new: true }); });
exports.toggleBanUser = toggleBanUser;
// Admin privilege
const toggleAdminRole = (userId, promote) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_1.default.findByIdAndUpdate(userId, { role: promote ? "admin" : "user" }, { new: true });
});
exports.toggleAdminRole = toggleAdminRole;
// Activity logs
const getUserActivity = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const posts = yield post_1.Post.find({ author: userId });
    const comments = yield comment_1.Comment.find({ author: userId });
    return { posts, comments };
});
exports.getUserActivity = getUserActivity;
// Content Moderation
const getAllPosts = () => __awaiter(void 0, void 0, void 0, function* () { return yield post_1.Post.find(); });
exports.getAllPosts = getAllPosts;
const getAllComments = () => __awaiter(void 0, void 0, void 0, function* () { return yield comment_1.Comment.find(); });
exports.getAllComments = getAllComments;
const deletePost = (postId) => __awaiter(void 0, void 0, void 0, function* () { return yield post_1.Post.findByIdAndDelete(postId); });
exports.deletePost = deletePost;
const deleteComment = (commentId) => __awaiter(void 0, void 0, void 0, function* () { return yield comment_1.Comment.findByIdAndDelete(commentId); });
exports.deleteComment = deleteComment;
// Stats
const getStats = () => __awaiter(void 0, void 0, void 0, function* () {
    const totalUsers = yield user_1.default.countDocuments();
    const totalPosts = yield post_1.Post.countDocuments();
    const totalComments = yield comment_1.Comment.countDocuments();
    const totalMessages = yield message_1.Message.countDocuments();
    return { totalUsers, totalPosts, totalComments, totalMessages };
});
exports.getStats = getStats;
// Team
const getAdminTeam = () => __awaiter(void 0, void 0, void 0, function* () { return yield user_1.default.find({ role: "admin" }); });
exports.getAdminTeam = getAdminTeam;
