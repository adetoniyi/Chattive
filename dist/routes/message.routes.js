"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const message_controller_1 = require("../controllers/message.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = express_1.default.Router();
function asyncHandler(fn) {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
}
/**
 * @swagger
 * tags:
 *   name: Messages
 *   description: Messaging endpoints
 */
/**
 * @swagger
 * /messages:
 *   post:
 *     summary: Send a message
 *     tags: [Messages]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - receiverId
 *               - content
 *             properties:
 *               receiverId:
 *                 type: string
 *                 example: "6650e4b43778b344a89ae021"
 *               content:
 *                 type: string
 *                 example: "Hey! What's up?"
 *     responses:
 *       201:
 *         description: Message sent
 */
router.post("/", asyncHandler(auth_middleware_1.isAuthenticated), message_controller_1.sendMessage);
/**
 * @swagger
 * /messages/conversations:
 *   get:
 *     summary: Get all conversations for the authenticated user
 *     tags: [Messages]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of conversations
 */
router.get("/conversations", asyncHandler(auth_middleware_1.isAuthenticated), message_controller_1.getUserConversations);
/**
 * @swagger
 * /messages/conversations/{userId}:
 *   get:
 *     summary: Get conversation between authenticated user and another user
 *     tags: [Messages]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: Other user's ID
 *     responses:
 *       200:
 *         description: Conversation data
 */
router.get("/conversations/:userId", asyncHandler(auth_middleware_1.isAuthenticated), message_controller_1.getConversation);
/**
 * @swagger
 * /messages/{messageId}:
 *   delete:
 *     summary: Delete a message
 *     tags: [Messages]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: messageId
 *         required: true
 *         schema:
 *           type: string
 *         description: Message ID to delete
 *     responses:
 *       200:
 *         description: Message deleted
 *       403:
 *         description: Unauthorized or message not found
 */
router.delete("/:messageId", asyncHandler(auth_middleware_1.isAuthenticated), asyncHandler(message_controller_1.deleteMessage));
exports.default = router;
