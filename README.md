**# Chattive
A CHATTERBOX: 
**A SOCIAL MEDIA FULL-FEATURE API PROJECT**

**PROJECT AUTHOR ADENIYI PELUMI **
**Date: 24th of May, 2025 **

**Tech Stack**
•	Backend Framework: Node.js (with Express) with Javascript 
•	Database: MongoDB (local or MongoDB Atlas)
•	ORM: Mongoose
•	Authentication: JSON Web Tokens (JWT)
•	File Storage: Cloudinary (for profile pictures and media uploads)
•	API Documentation: Swagger


**Features & Requirement** 
1. Authentication & Authorization
•	User Registration – Email/Username & password registration.
•	Login – User authentication with JWT.
•	Password Reset – Feature to request and reset forgotten password.
•	JWT-Based Auth – Secure token-based authentication for all protected routes
•	User Roles:
-	User – Default role for social features
-	Admin – Limited to approved team members
•	Access Control Middleware – Protect routes based on roles (isAdmin, isAuthenticated)

2. User Profile
•	Profile Creation & Update – Users can update name, bio, avatar, etc.
•	Profile Picture Upload – Handled with Cloudinary.
•	Follow/Unfollow Users – Social interaction between users.
•	User Search – Search users by username, name, or email.
•	View Public Profiles – Accessible by other users.

3. Posts
•	Create Posts – Text and optional media (images/videos).
•	Edit Posts – Users can edit their own posts.
•	Delete Posts – Users can delete their own posts.
•	View Posts Feed – Paginated list of recent posts.
•	Single Post View – Get full details of a single post.
•	Post Likes/Unlikes – Toggle like on posts.

4. Comments
•	Add Comments – To posts.
•	Edit Comments – By comment owner.
•	Delete Comments – By comment owner.
•	Threaded Comments – (Optional) Replies to comments.

5. Messaging
•	Start Conversation – With another user.
•	Send Messages – Text-based messaging.
•	View Conversations – All chat threads for current user.
•	Delete Messages – (Optional) From both sides or only sender.

6. Notifications
•	Trigger Notifications – On like, comment, follow, or message.
•	View Notifications – Unread/read status.
•	Mark as Read – Single or bulk.

7. Search & Discovery
•	User Search – Search by name, username, or email.
•	Post Search – (Optional) Based on keywords/tags.

8. Media Upload
•	Post Media – Upload photos/videos for posts.
•	Profile Picture – Upload and update avatar image.
•	Cloud Storage – Images stored via Cloudinary.

9. Admin Panel 
•	User Management
-	View all users
-	Deactivate (ban) / Reactivate users
-	View user activity logs (posts, comments, etc.)
•	Post & Comment Moderation
-	View all posts and comments
-	Delete inappropriate content
-	Flag or archive sensitive content
•	Dashboard Statistics
-	Total users, posts, comments, and messages
-	Daily/weekly activity logs 
-	Logged-in user sessions 
•	System Monitoring
-	Log recent API errors
-	View system health (ping, DB status)
•	Team Management
-	View all admins (team members)
-	Add/remove admin privileges (only by Project Author)


**SYSTEM REQUIREMENTS**

1. Functional Requirements
•	Secure user authentication with JWT.
•	Full CRUD functionality for posts, comments, and messages.
•	Real-time or near-real-time messaging (via WebSocket integration).
•	Notifications triggered by specific events.
•	RESTful API with proper HTTP status codes and messages.

2. Non-Functional Requirements
•	Performance: Fast response time (<500ms for most API calls).
•	Scalability: Horizontal scaling support for user and content growth.
•	Security:
o	Input validation and sanitization.
o	JWT token expiration and refresh logic.
o	Rate limiting for login and signup routes.
o	Secure file upload with Cloudinary.
•	Maintainability:
o	Modular codebase.
o	Centralized error handling.
•	Documentation and Testing:
o	Testing on Postman and with Android Emulator 
o	Swagger documentation for all endpoints.


**PROJECT DELIVERABLES:**
 
•	Functional API deployed locally and on MongoDB Atlas. 
•	API documentation via Swagger. 
•	Source code repository (GitHub) with clear instructions for setup and testing. Also, include the link to your hosted Swagger/api docs in the readme of this project. 
•	Host on Render or any hosting provider.
•	Take note of key details such as project structure, making sure it adheres to the soft code’s standard. 

