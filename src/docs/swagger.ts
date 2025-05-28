// src/docs/swagger.ts

export const swaggerSpec = {
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
        tags: ["Authentication"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["username", "email", "password"],
                properties: {
                  username: {
                    type: "string",
                    example: "johndoe",
                  },
                  email: {
                    type: "string",
                    format: "email",
                    example: "user@example.com",
                  },
                  password: {
                    type: "string",
                    example: "Password123!",
                  },
                },
              },
            },
          },
        },
        responses: {
          "201": {
            description: "Registration successful",
          },
          "400": {
            description: "Invalid input or user already exists",
          },
        },
      },
    },

    "/api/auth/login": {
      post: {
        summary: "User login",
        tags: ["Authentication"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["email", "password"],
                properties: {
                  email: {
                    type: "string",
                    format: "email",
                    example: "user@example.com",
                  },
                  password: {
                    type: "string",
                    example: "Password123!",
                  },
                },
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Login successful",
          },
          "401": {
            description: "Invalid credentials",
          },
        },
      },
    },

    // USER ROUTES
    "/api/users/profile": {
      get: {
        summary: "Get the authenticated user's profile",
        tags: ["Users"],
        security: [{ bearerAuth: [] }],
        responses: {
          "200": { description: "Profile fetched successfully" },
        },
      },
      put: {
        summary: "Update the authenticated user's profile",
        tags: ["Users"],
        security: [{ bearerAuth: [] }],
        requestBody: {
          content: {
            "multipart/form-data": {
              schema: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  bio: { type: "string" },
                  avatar: { type: "string", format: "binary" },
                },
              },
            },
          },
        },
        responses: {
          "200": { description: "Profile updated successfully" },
          "400": { description: "Bad request, invalid data" },
        },
      },
    },

    "/api/users/{userId}/follow": {
      post: {
        summary: "Follow another user",
        tags: ["Users"],
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "userId",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          "200": { description: "User followed" },
          "400": { description: "Bad request, invalid data" },
        },
      },
    },

    "/api/users/{userId}/unfollow": {
      post: {
        summary: "Unfollow a user",
        tags: ["Users"],
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "userId",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          "200": { description: "User unfollowed" },
          "400": { description: "Bad request, invalid data" },
        },
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

    // POST ROUTES IN swaggerSpec.paths

    "/api/posts": {
      post: {
        summary: "Create a new post",
        tags: ["Posts"],
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "multipart/form-data": {
              schema: {
                type: "object",
                properties: {
                  text: { type: "string" },
                  image: {
                    type: "string",
                    format: "binary",
                  },
                },
                required: ["text"],
              },
            },
          },
        },
        responses: {
          "201": { description: "Post created successfully" },
          "404": { description: "Post not found" },
        },
      },
    },

    "/api/posts/feed": {
      get: {
        summary: "Get paginated feed of posts",
        tags: ["Posts"],
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "page",
            in: "query",
            schema: {
              type: "integer",
            },
            description: "Page number",
          },
        ],
        responses: {
          "200": { description: "List of feed posts" },
          "404": { description: "Post not found" },
        },
      },
    },

    "/api/posts/{id}": {
      get: {
        summary: "Get a specific post by ID",
        tags: ["Posts"],
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          "200": { description: "The requested post" },
          "404": { description: "Post not found" },
        },
      },
      put: {
        summary: "Update a post",
        tags: ["Posts"],
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
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
                  text: { type: "string" },
                },
                required: ["text"],
              },
            },
          },
        },
        responses: {
          "200": { description: "Post updated" },
          "403": { description: "Unauthorized or not found" },
        },
      },
      delete: {
        summary: "Delete a post",
        tags: ["Posts"],
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          "200": { description: "Post deleted" },
          "403": { description: "Unauthorized or not found" },
        },
      },
    },

    "/api/posts/{id}/like": {
      post: {
        summary: "Like or unlike a post",
        tags: ["Posts"],
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          "200": { description: "Toggled like on post" },
          "403": { description: "Unauthorized or not found" },
        },
      },
    },

    // COMMENTS
    "/api/comments/{postId}": {
      post: {
        summary: "Add a comment to a post",
        tags: ["Comments"],
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: "path",
            name: "postId",
            required: true,
            schema: { type: "string" },
            description: "ID of the post to comment on",
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  text: { type: "string" },
                  parentComment: {
                    type: "string",
                    description:
                      "Optional, ID of parent comment for threaded replies",
                  },
                },
                required: ["text"],
              },
            },
          },
        },
        responses: {
          "201": { description: "Comment added successfully" },
          "403": { description: "Unauthorized or post not found" },
        },
      },

      get: {
        summary: "Get comments for a post",
        tags: ["Comments"],
        parameters: [
          {
            in: "path",
            name: "postId",
            required: true,
            schema: { type: "string" },
            description: "ID of the post to get comments for",
          },
        ],
        responses: {
          "200": { description: "List of comments" },
          "404": { description: "Post not found or no comments available" },
        },
      },
    },

    "/api/comments/{id}": {
      put: {
        summary: "Update a comment",
        tags: ["Comments"],
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: { type: "string" },
            description: "Comment ID",
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  text: { type: "string" },
                },
                required: ["text"],
              },
            },
          },
        },
        responses: {
          "200": { description: "Comment updated successfully" },
          "403": { description: "Unauthorized or comment not found" },
        },
      },

      delete: {
        summary: "Delete a comment",
        tags: ["Comments"],
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: { type: "string" },
            description: "Comment ID",
          },
        ],
        responses: {
          "200": { description: "Comment deleted successfully" },
          "403": { description: "Unauthorized or comment not found" },
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
        summary: "Get all notifications for the authenticated user",
        tags: ["Notifications"],
        security: [{ bearerAuth: [] }],
        responses: {
          "200": { description: "A list of notifications" },
          "400": { description: "Bad request" },
        },
      },
    },
    "/api/notifications/{id}/read": {
      patch: {
        summary: "Mark a notification as read",
        tags: ["Notifications"],
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
            description: "Notification ID",
          },
        ],
        responses: {
          "200": { description: "Notification marked as read" },
          "400": {
            description: "Bad request, invalid ID or notification not found",
          },
        },
      },
    },
    "/api/notifications/read-all": {
      patch: {
        summary: "Mark all notifications as read",
        tags: ["Notifications"],
        security: [{ bearerAuth: [] }],
        responses: {
          "200": { description: "All notifications marked as read" },
          "400": {
            description: "Bad request, unable to mark notifications as read",
          },
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
          "400": { description: "Bad request" },
        },
      },
    },
    "/api/admin/users/{userId}/ban": {
      patch: {
        summary: "Admin: ban or unban user",
        tags: ["Admin"],
        parameters: [
          {
            name: "userId",
            in: "path",
            required: true,
            schema: { type: "string" },
            description: "User ID to ban/unban",
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  ban: { type: "boolean", example: true },
                },
              },
            },
          },
        },
        responses: {
          "200": { description: "Ban status updated" },
          "400": { description: "Bad request" },
        },
      },
    },
    "/api/admin/users/{userId}/admin": {
      patch: {
        summary: "Admin: promote or demote user to/from admin",
        tags: ["Admin"],
        parameters: [
          {
            name: "userId",
            in: "path",
            required: true,
            schema: { type: "string" },
            description: "User ID to promote/demote",
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  promote: { type: "boolean", example: true },
                },
              },
            },
          },
        },
        responses: {
          "200": { description: "Admin role updated" },
          "400": { description: "Bad request" },
        },
      },
    },
    "/api/admin/users/{userId}/logs": {
      get: {
        summary: "Admin: get activity logs for a user",
        tags: ["Admin"],
        parameters: [
          {
            name: "userId",
            in: "path",
            required: true,
            schema: { type: "string" },
            description: "User ID to fetch logs for",
          },
        ],
        responses: {
          "200": { description: "User activity logs retrieved" },
          "400": { description: "Bad request" },
        },
      },
    },
    "/api/admin/posts": {
      get: {
        summary: "Admin: get all posts",
        tags: ["Admin"],
        responses: {
          "200": { description: "List of all posts" },
          "400": { description: "Bad request" },
        },
      },
    },
    "/api/admin/comments": {
      get: {
        summary: "Admin: get all comments",
        tags: ["Admin"],
        responses: {
          "200": { description: "List of all comments" },
          "400": { description: "Bad request" },
        },
      },
    },
    "/api/admin/posts/{postId}": {
      delete: {
        summary: "Admin: delete a post",
        tags: ["Admin"],
        parameters: [
          {
            name: "postId",
            in: "path",
            required: true,
            schema: { type: "string" },
            description: "Post ID to delete",
          },
        ],
        responses: {
          "200": { description: "Post deleted successfully" },
          "400": { description: "Bad request" },
        },
      },
    },
    "/api/admin/comments/{commentId}": {
      delete: {
        summary: "Admin: delete a comment",
        tags: ["Admin"],
        parameters: [
          {
            name: "commentId",
            in: "path",
            required: true,
            schema: { type: "string" },
            description: "Comment ID to delete",
          },
        ],
        responses: {
          "200": { description: "Comment deleted successfully" },
          "400": { description: "Bad request" },
        },
      },
    },
    "/api/admin/stats": {
      get: {
        summary: "Admin: get dashboard statistics",
        tags: ["Admin"],
        responses: {
          "200": { description: "Dashboard stats retrieved" },
          "400": { description: "Bad request" },
        },
      },
    },
    "/api/admin/team": {
      get: {
        summary: "Admin: get all admin team members",
        tags: ["Admin"],
        responses: {
          "200": { description: "Admin team members retrieved" },
          "400": { description: "Bad request" },
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
