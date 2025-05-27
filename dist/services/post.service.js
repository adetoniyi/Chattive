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
exports.toggleLike = exports.deletePost = exports.updatePost = exports.getPostById = exports.getFeedPosts = exports.createPost = void 0;
const post_1 = require("../models/post");
const cloudinary_1 = require("../utils/cloudinary");
const createPost = (userId, text, file) => __awaiter(void 0, void 0, void 0, function* () {
    let media;
    if (file) {
        const result = yield (0, cloudinary_1.uploadToCloudinary)(file.path);
        media = {
            url: result.secure_url,
            type: file.mimetype.startsWith("video") ? "video" : "image",
        };
    }
    const post = yield post_1.Post.create({ user: userId, text, media });
    return post;
});
exports.createPost = createPost;
const getFeedPosts = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (page = 1, limit = 10) {
    const posts = yield post_1.Post.find()
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .populate("user", "username name avatar");
    return posts;
});
exports.getFeedPosts = getFeedPosts;
const getPostById = (postId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield post_1.Post.findById(postId).populate("user", "username name avatar");
});
exports.getPostById = getPostById;
const updatePost = (postId, userId, text) => __awaiter(void 0, void 0, void 0, function* () {
    return yield post_1.Post.findOneAndUpdate({ _id: postId, user: userId }, { text }, { new: true });
});
exports.updatePost = updatePost;
const deletePost = (postId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield post_1.Post.findOneAndDelete({ _id: postId, user: userId });
});
exports.deletePost = deletePost;
const toggleLike = (postId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield post_1.Post.findById(postId);
    if (!post)
        throw new Error("Post not found");
    const liked = post.likes.includes(userId);
    if (liked) {
        post.likes = post.likes.filter((id) => id.toString() !== userId.toString());
    }
    else {
        post.likes.push(new (require("mongoose").Types.ObjectId)(userId));
    }
    yield post.save();
    return post;
});
exports.toggleLike = toggleLike;
