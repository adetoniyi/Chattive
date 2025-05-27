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
exports.likeOrUnlikePost = exports.deletePost = exports.updatePost = exports.getPost = exports.getFeed = exports.createPost = void 0;
const postService = __importStar(require("../services/post.service"));
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield postService.createPost(req.user.id, req.body.text, req.file);
    res.status(201).json({ message: "Post created", post });
});
exports.createPost = createPost;
const getFeed = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const page = parseInt(req.query.page) || 1;
    const posts = yield postService.getFeedPosts(page);
    res.json({ posts });
});
exports.getFeed = getFeed;
const getPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield postService.getPostById(req.params.id);
    if (!post)
        return res.status(404).json({ message: "Post not found" });
    res.json({ post });
});
exports.getPost = getPost;
const updatePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updated = yield postService.updatePost(req.params.id, req.user.id, req.body.text);
    if (!updated)
        return res.status(403).json({ message: "Unauthorized or post not found" });
    res.json({ message: "Post updated", post: updated });
});
exports.updatePost = updatePost;
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const deleted = yield postService.deletePost(req.params.id, req.user.id);
    if (!deleted)
        return res.status(403).json({ message: "Unauthorized or post not found" });
    res.json({ message: "Post deleted" });
});
exports.deletePost = deletePost;
const likeOrUnlikePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield postService.toggleLike(req.params.id, req.user.id);
    res.json({ message: "Toggled like", post });
});
exports.likeOrUnlikePost = likeOrUnlikePost;
