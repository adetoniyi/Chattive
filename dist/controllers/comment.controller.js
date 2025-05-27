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
exports.deleteComment = exports.updateComment = exports.getPostComments = exports.addComment = void 0;
const commentService = __importStar(require("../services/comment.service"));
const addComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { text, parentComment } = req.body;
    const { postId } = req.params;
    const comment = yield commentService.createComment(req.user.id, postId, text, parentComment);
    res.status(201).json({ message: "Comment added", comment });
});
exports.addComment = addComment;
const getPostComments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const comments = yield commentService.getCommentsByPost(req.params.postId);
    res.json({ comments });
});
exports.getPostComments = getPostComments;
const updateComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updated = yield commentService.updateComment(req.params.id, req.user.id, req.body.text);
    if (!updated)
        return res.status(403).json({ message: "Unauthorized or not found" });
    res.json({ message: "Comment updated", comment: updated });
});
exports.updateComment = updateComment;
const deleteComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const deleted = yield commentService.deleteComment(req.params.id, req.user.id);
    if (!deleted)
        return res.status(403).json({ message: "Unauthorized or not found" });
    res.json({ message: "Comment deleted" });
});
exports.deleteComment = deleteComment;
