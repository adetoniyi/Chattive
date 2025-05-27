"use strict";
// src/docs/swagger.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerSpec = void 0;
exports.swaggerSpec = {
    openapi: "3.0.0",
    info: {
        title: "CHATTIVE API",
        version: "1.0.0",
        description: "API documentation for CHATTIVE social media backend",
    },
    servers: [
        {
            url: "http://localhost:8000",
            description: "Local server",
        },
    ],
    paths: {
        // AUTH
        "/api/auth/register": {
            post: {
                summary: "Register a new user",
                tags: ["Auth"],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    name: { type: "string" },
                                    email: { type: "string" },
                                    password: { type: "string" },
                                },
                                required: ["name", "email", "password"],
                            },
                        },
                    },
                },
                responses: {
                    "201": { description: "User registered" },
                    "400": { description: "Invalid input" },
                },
            },
        },
        "/api/auth/login": {
            post: {
                summary: "User login",
                tags: ["Auth"],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    email: { type: "string" },
                                    password: { type: "string" },
                                },
                                required: ["email", "password"],
                            },
                        },
                    },
                },
                responses: {
                    "200": { description: "User logged in, returns JWT token" },
                    "401": { description: "Unauthorized" },
                },
            },
        },
        // USERS
        "/api/users": {
            get: {
                summary: "Get list of all users",
                tags: ["Users"],
                responses: {
                    "200": { description: "List of users" },
                },
            },
        },
        "/api/users/{userId}": {
            get: {
                summary: "Get user by ID",
                tags: ["Users"],
                parameters: [
                    {
                        name: "userId",
                        in: "path",
                        required: true,
                        schema: { type: "string" },
                    },
                ],
                responses: {
                    "200": { description: "User info" },
                    "404": { description: "User not found" },
                },
            },
            put: {
                summary: "Update user by ID",
                tags: ["Users"],
                parameters: [
                    {
                        name: "userId",
                        in: "path",
                        required: true,
                        schema: { type: "string" },
                    },
                ],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    name: { type: "string" },
                                    bio: { type: "string" },
                                    avatarUrl: { type: "string" },
                                },
                            },
                        },
                    },
                },
                responses: {
                    "200": { description: "User updated" },
                    "404": { description: "User not found" },
                },
            },
            delete: {
                summary: "Delete user by ID",
                tags: ["Users"],
                parameters: [
                    {
                        name: "userId",
                        in: "path",
                        required: true,
                        schema: { type: "string" },
                    },
                ],
                responses: {
                    "204": { description: "User deleted" },
                    "404": { description: "User not found" },
                },
            },
        },
        // PROFILES
        "/api/profile": {
            get: {
                summary: "Get current logged in user's profile",
                tags: ["Profile"],
                responses: {
                    "200": { description: "User profile" },
                    "401": { description: "Unauthorized" },
                },
            },
            put: {
                summary: "Update current user's profile",
                tags: ["Profile"],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    bio: { type: "string" },
                                    avatarUrl: { type: "string" },
                                },
                            },
                        },
                    },
                },
                responses: {
                    "200": { description: "Profile updated" },
                    "401": { description: "Unauthorized" },
                },
            },
        },
        // POSTS
        "/api/posts": {
            get: {
                summary: "Get all posts",
                tags: ["Posts"],
                responses: {
                    "200": { description: "List of posts" },
                },
            },
            post: {
                summary: "Create a new post",
                tags: ["Posts"],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    content: { type: "string" },
                                    imageUrl: { type: "string" },
                                },
                                required: ["content"],
                            },
                        },
                    },
                },
                responses: {
                    "201": { description: "Post created" },
                    "400": { description: "Invalid input" },
                },
            },
        },
        "/api/posts/{postId}": {
            get: {
                summary: "Get post by ID",
                tags: ["Posts"],
                parameters: [
                    {
                        name: "postId",
                        in: "path",
                        required: true,
                        schema: { type: "string" },
                    },
                ],
                responses: {
                    "200": { description: "Post data" },
                    "404": { description: "Post not found" },
                },
            },
            put: {
                summary: "Update post by ID",
                tags: ["Posts"],
                parameters: [
                    {
                        name: "postId",
                        in: "path",
                        required: true,
                        schema: { type: "string" },
                    },
                ],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    content: { type: "string" },
                                    imageUrl: { type: "string" },
                                },
                            },
                        },
                    },
                },
                responses: {
                    "200": { description: "Post updated" },
                    "404": { description: "Post not found" },
                },
            },
            delete: {
                summary: "Delete post by ID",
                tags: ["Posts"],
                parameters: [
                    {
                        name: "postId",
                        in: "path",
                        required: true,
                        schema: { type: "string" },
                    },
                ],
                responses: {
                    "204": { description: "Post deleted" },
                    "404": { description: "Post not found" },
                },
            },
        },
        // COMMENTS
        "/api/posts/{postId}/comments": {
            get: {
                summary: "Get comments for a post",
                tags: ["Comments"],
                parameters: [
                    {
                        name: "postId",
                        in: "path",
                        required: true,
                        schema: { type: "string" },
                    },
                ],
                responses: {
                    "200": { description: "List of comments" },
                    "404": { description: "Post not found" },
                },
            },
            post: {
                summary: "Add comment to a post",
                tags: ["Comments"],
                parameters: [
                    {
                        name: "postId",
                        in: "path",
                        required: true,
                        schema: { type: "string" },
                    },
                ],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    content: { type: "string" },
                                },
                                required: ["content"],
                            },
                        },
                    },
                },
                responses: {
                    "201": { description: "Comment added" },
                    "404": { description: "Post not found" },
                },
            },
        },
        "/api/comments/{commentId}": {
            put: {
                summary: "Update a comment",
                tags: ["Comments"],
                parameters: [
                    {
                        name: "commentId",
                        in: "path",
                        required: true,
                        schema: { type: "string" },
                    },
                ],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    content: { type: "string" },
                                },
                                required: ["content"],
                            },
                        },
                    },
                },
                responses: {
                    "200": { description: "Comment updated" },
                    "404": { description: "Comment not found" },
                },
            },
            delete: {
                summary: "Delete a comment",
                tags: ["Comments"],
                parameters: [
                    {
                        name: "commentId",
                        in: "path",
                        required: true,
                        schema: { type: "string" },
                    },
                ],
                responses: {
                    "204": { description: "Comment deleted" },
                    "404": { description: "Comment not found" },
                },
            },
        },
        // MESSAGES
        "/api/messages": {
            post: {
                summary: "Send a message",
                tags: ["Messages"],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    receiverId: { type: "string" },
                                    content: { type: "string" },
                                },
                                required: ["receiverId", "content"],
                            },
                        },
                    },
                },
                responses: {
                    "201": { description: "Message sent" },
                },
            },
        },
        "/api/messages/conversations": {
            get: {
                summary: "Get user conversations",
                tags: ["Messages"],
                responses: {
                    "200": { description: "List of conversations" },
                },
            },
        },
        "/api/messages/conversations/{userId}": {
            get: {
                summary: "Get conversation with a user",
                tags: ["Messages"],
                parameters: [
                    {
                        name: "userId",
                        in: "path",
                        required: true,
                        schema: { type: "string" },
                    },
                ],
                responses: {
                    "200": { description: "Conversation messages" },
                },
            },
        },
        "/api/messages/{messageId}": {
            delete: {
                summary: "Delete a message",
                tags: ["Messages"],
                parameters: [
                    {
                        name: "messageId",
                        in: "path",
                        required: true,
                        schema: { type: "string" },
                    },
                ],
                responses: {
                    "200": { description: "Message deleted" },
                    "403": { description: "Unauthorized or not found" },
                },
            },
        },
        // NOTIFICATIONS
        "/api/notifications": {
            get: {
                summary: "Get all notifications for logged in user",
                tags: ["Notifications"],
                responses: {
                    "200": { description: "List of notifications" },
                },
            },
        },
        // ADMIN
        "/api/admin/users": {
            get: {
                summary: "Admin: get all users",
                tags: ["Admin"],
                responses: {
                    "200": { description: "List of users" },
                },
            },
        },
        "/api/admin/users/{userId}": {
            delete: {
                summary: "Admin: delete user",
                tags: ["Admin"],
                parameters: [
                    {
                        name: "userId",
                        in: "path",
                        required: true,
                        schema: { type: "string" },
                    },
                ],
                responses: {
                    "204": { description: "User deleted" },
                    "404": { description: "User not found" },
                },
            },
        },
    },
    components: {
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT",
            },
        },
    },
    security: [{ bearerAuth: [] }],
};
