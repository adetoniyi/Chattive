"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.getTeam = exports.getDashboardStats = exports.removeComment = exports.removePost = exports.getAllComments = exports.getAllPosts = exports.getUserLogs = exports.toggleAdmin = exports.toggleUserBan = exports.getAllUsers = void 0;
const adminService = __importStar(require("../services/admin.service"));
const getAllUsers = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield adminService.getAllUsers();
    res.json({ users });
});
exports.getAllUsers = getAllUsers;
const toggleUserBan = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const { ban } = req.body;
    const user = yield adminService.toggleBanUser(userId, ban);
    res.json({ message: `User ${ban ? "banned" : "unbanned"}`, user });
});
exports.toggleUserBan = toggleUserBan;
const toggleAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const { promote } = req.body;
    const user = yield adminService.toggleAdminRole(userId, promote);
    res.json({
        message: `User ${promote ? "promoted to" : "demoted from"} admin`,
        user,
    });
});
exports.toggleAdmin = toggleAdmin;
const getUserLogs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const activity = yield adminService.getUserActivity(userId);
    res.json({ activity });
});
exports.getUserLogs = getUserLogs;
const getAllPosts = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const posts = yield adminService.getAllPosts();
    res.json({ posts });
});
exports.getAllPosts = getAllPosts;
const getAllComments = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const comments = yield adminService.getAllComments();
    res.json({ comments });
});
exports.getAllComments = getAllComments;
const removePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { postId } = req.params;
    yield adminService.deletePost(postId);
    res.json({ message: "Post deleted" });
});
exports.removePost = removePost;
const removeComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { commentId } = req.params;
    yield adminService.deleteComment(commentId);
    res.json({ message: "Comment deleted" });
});
exports.removeComment = removeComment;
const getDashboardStats = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const stats = yield adminService.getStats();
    res.json({ stats });
});
exports.getDashboardStats = getDashboardStats;
const getTeam = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const team = yield adminService.getAdminTeam();
    res.json({ team });
});
exports.getTeam = getTeam;
