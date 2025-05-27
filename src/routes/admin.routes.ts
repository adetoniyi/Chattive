import express, { Request, Response, NextFunction } from "express";
import * as adminController from "../controllers/admin.controller";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin panel management
 */

/**
 * @swagger
 * /admin/users:
 *   get:
 *     summary: Get all users
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: List of users
 */
router.get("/users", adminController.getAllUsers);

/**
 * @swagger
 * /admin/users/{userId}/ban:
 *   patch:
 *     summary: Ban or unban a user
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID to ban/unban
 *     requestBody:
 *       description: Ban status
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ban:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Ban status updated
 */
router.patch("/users/:userId/ban", adminController.toggleUserBan);

/**
 * @swagger
 * /admin/users/{userId}/admin:
 *   patch:
 *     summary: Promote or demote a user to/from admin
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID to promote/demote
 *     requestBody:
 *       description: Promote status
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               promote:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Admin role updated
 */
router.patch("/users/:userId/admin", adminController.toggleAdmin);

/**
 * @swagger
 * /admin/users/{userId}/logs:
 *   get:
 *     summary: Get activity logs for a user
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID to fetch activity logs for
 *     responses:
 *       200:
 *         description: User activity logs retrieved
 */
router.get("/users/:userId/logs", adminController.getUserLogs);

/**
 * @swagger
 * /admin/posts:
 *   get:
 *     summary: Get all posts
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: List of all posts
 */
router.get("/posts", adminController.getAllPosts);

/**
 * @swagger
 * /admin/comments:
 *   get:
 *     summary: Get all comments
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: List of all comments
 */
router.get("/comments", adminController.getAllComments);

/**
 * @swagger
 * /admin/posts/{postId}:
 *   delete:
 *     summary: Delete a post
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: postId
 *         schema:
 *           type: string
 *         required: true
 *         description: Post ID to delete
 *     responses:
 *       200:
 *         description: Post deleted successfully
 */
router.delete("/posts/:postId", adminController.removePost);

/**
 * @swagger
 * /admin/comments/{commentId}:
 *   delete:
 *     summary: Delete a comment
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: commentId
 *         schema:
 *           type: string
 *         required: true
 *         description: Comment ID to delete
 *     responses:
 *       200:
 *         description: Comment deleted successfully
 */
router.delete("/comments/:commentId", adminController.removeComment);

/**
 * @swagger
 * /admin/stats:
 *   get:
 *     summary: Get dashboard statistics
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: Dashboard stats retrieved
 */
router.get("/stats", adminController.getDashboardStats);

/**
 * @swagger
 * /admin/team:
 *   get:
 *     summary: Get all admin team members
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: Admin team members retrieved
 */
router.get("/team", adminController.getTeam);

export default router;
