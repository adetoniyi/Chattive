import express from "express";
import {
  sendMessage,
  getConversation,
  getUserConversations,
  deleteMessage,
} from "../controllers/message.controller";
import { isAuthenticated } from "../middlewares/auth.middleware";

const router = express.Router();

function asyncHandler(
  fn: (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => any
) {
  return (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
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
router.post("/", asyncHandler(isAuthenticated), sendMessage);

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
router.get(
  "/conversations",
  asyncHandler(isAuthenticated),
  getUserConversations
);

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
router.get(
  "/conversations/:userId",
  asyncHandler(isAuthenticated),
  getConversation
);

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
router.delete(
  "/:messageId",
  asyncHandler(isAuthenticated),
  asyncHandler(deleteMessage)
);

export default router;
