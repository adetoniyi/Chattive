import express from "express";
import {
  createPost,
  getFeed,
  getPost,
  updatePost,
  deletePost,
  likeOrUnlikePost,
} from "../controllers/post.controller";
import { isAuthenticated } from "../middlewares/auth.middleware";
import { validateBody } from "../middlewares/validator.middleware";
import upload from "../middlewares/multer.middleware"; // multer for media uploads

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
 *   name: Posts
 *   description: Endpoints for managing posts
 */

/**
 * @swagger
 * /api/posts:
 *   post:
 *     summary: Create a new post
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Post created successfully
 *       404:
 *         description: Post not found
 */
router.post(
  "/",
  asyncHandler(isAuthenticated),
  upload.single("image"),
  createPost
);

/**
 * @swagger
 * /api/posts/feed:
 *   get:
 *     summary: Get paginated feed of posts
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *     responses:
 *       200:
 *         description: List of feed posts
 *       404:
 *         description: Post not found
 */
router.get("/feed", asyncHandler(isAuthenticated), getFeed);

/**
 * @swagger
 * /api/posts/{id}:
 *   get:
 *     summary: Get a specific post by ID
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The requested post
 *       404:
 *         description: Post not found
 */
router.get("/:id", asyncHandler(isAuthenticated), asyncHandler(getPost));

/**
 * @swagger
 * /api/posts/{id}:
 *   put:
 *     summary: Update a post
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *     responses:
 *       200:
 *         description: Post updated
 *       403:
 *         description: Unauthorized or not found
 */
router.put("/:id", asyncHandler(isAuthenticated), asyncHandler(updatePost));

/**
 * @swagger
 * /api/posts/{id}:
 *   delete:
 *     summary: Delete a post
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Post deleted
 *       403:
 *         description: Unauthorized or not found
 */
router.delete("/:id", asyncHandler(isAuthenticated), asyncHandler(deletePost));

/**
 * @swagger
 * /api/posts/{id}/like:
 *   post:
 *     summary: Like or unlike a post
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Toggled like on post
 *       403:
 *         description: Unauthorized or not found
 */
router.post("/:id/like", asyncHandler(isAuthenticated), likeOrUnlikePost);

export default router;
