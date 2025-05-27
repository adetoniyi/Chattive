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
exports.unfollowUser = exports.followUser = exports.updateUserProfile = exports.getUserById = void 0;
const user_1 = __importDefault(require("../models/user"));
const cloudinary_1 = require("../utils/cloudinary");
const getUserById = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return user_1.default.findById(userId).select("-password");
});
exports.getUserById = getUserById;
const updateUserProfile = (userId, data, file) => __awaiter(void 0, void 0, void 0, function* () {
    if (file) {
        const upload = yield (0, cloudinary_1.uploadToCloudinary)(file.path);
        data.avatar = upload.secure_url;
    }
    return user_1.default.findByIdAndUpdate(userId, data, { new: true }).select("-password");
});
exports.updateUserProfile = updateUserProfile;
const followUser = (currentUserId, targetUserId) => __awaiter(void 0, void 0, void 0, function* () {
    const currentUser = yield user_1.default.findById(currentUserId);
    const targetUser = yield user_1.default.findById(targetUserId);
    if (!targetUser || !currentUser)
        throw new Error("User not found");
    const mongoose = require("mongoose");
    const currentUserObjectId = new mongoose.Types.ObjectId(currentUserId);
    const targetUserObjectId = new mongoose.Types.ObjectId(targetUserId);
    if (!targetUser.followers.includes(currentUserObjectId)) {
        targetUser.followers.push(currentUserObjectId);
        currentUser.following.push(targetUserObjectId);
        yield targetUser.save();
        yield currentUser.save();
    }
    return { message: "User followed successfully" };
});
exports.followUser = followUser;
const unfollowUser = (currentUserId, targetUserId) => __awaiter(void 0, void 0, void 0, function* () {
    const currentUser = yield user_1.default.findById(currentUserId);
    const targetUser = yield user_1.default.findById(targetUserId);
    if (!targetUser || !currentUser)
        throw new Error("User not found");
    targetUser.followers = targetUser.followers.filter((id) => id.toString() !== currentUserId);
    currentUser.following = currentUser.following.filter((id) => id.toString() !== targetUserId);
    yield targetUser.save();
    yield currentUser.save();
    return { message: "User unfollowed successfully" };
});
exports.unfollowUser = unfollowUser;
