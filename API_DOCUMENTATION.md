# SkillSwap API Documentation

> **Version:** 1.0.0  
> **Last Updated:** March 2025  
> **Base URL:** `http://localhost:3000` (development) / `https://api.skillswap.com` (production)

---

## 📋 Table of Contents

1. [Authentication](#authentication)
2. [Users](#users)
3. [Skills](#skills)
4. [Matches](#matches)
5. [Requests](#requests)
6. [Messages](#messages)
7. [Gamification](#gamification)
8. [WebSocket Events](#websocket-events)
9. [Error Handling](#error-handling)
10. [Rate Limiting](#rate-limiting)

---

## 🔐 Authentication

All protected endpoints require a Bearer token in the Authorization header.

```
http
Authorization: Bearer <jwt_token>
```

### POST /auth/signup
Register a new user.

**Request Body:**
```
json
{
  "email": "user@example.com",
  "password": "securePassword123",
  "name": "John Doe"
}
```

**Response (201):**
```
json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "John Doe",
    "avatar": null,
    "bio": null,
    "created_at": "2025-01-15T10:30:00Z"
  }
}
```

**Validation:**
- `email`: Required, valid email format
- `password`: Required, minimum 6 characters
- `name`: Required, 2-100 characters

### POST /auth/login
Authenticate existing user.

**Request Body:**
```
json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Response (200):**
```
json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "John Doe",
    "avatar": null,
    "bio": null
  }
}
```

**Error Responses:**
- 401: Invalid credentials

---

## 👤 Users

### GET /users/me
Get current user profile. (Protected)

**Response (200):**
```
json
{
  "id": "uuid",
  "email": "user@example.com",
  "name": "John Doe",
  "avatar": "https://...",
  "bio": "Full-stack developer",
  "xp": 1250,
  "level": 3,
  "is_verified": true,
  "profile_completion": 75,
  "created_at": "2025-01-15T10:30:00Z",
  "offeredSkills": [
    {
      "id": "uuid",
      "name": "React",
      "category": "Frontend",
      "proficiency": "Expert"
    }
  ],
  "wantedSkills": [
    {
      "id": "uuid",
      "name": "Figma",
      "category": "Design",
      "proficiency": "Beginner"
    }
  ]
}
```

### PUT /users/me
Update user profile. (Protected)

**Request Body:**
```
json
{
  "name": "John Updated",
  "bio": "Updated bio",
  "avatar": "https://..."
}
```

**Response (200):**
```
json
{
  "id": "uuid",
  "name": "John Updated",
  "bio": "Updated bio",
  "avatar": "https://...",
  "updated_at": "2025-01-15T11:00:00Z"
}
```

### POST /users/me/skills
Add skill to current user. (Protected)

**Request Body:**
```
json
{
  "skill_id": "uuid",
  "proficiency": "Intermediate",
  "skill_type": "offer"
}
```

**Response (201):**
```
json
{
  "id": "uuid",
  "user_id": "uuid",
  "skill_id": "uuid",
  "proficiency": "Intermediate",
  "skill_type": "offer",
  "created_at": "2025-01-15T11:00:00Z"
}
```

### DELETE /users/me/skills/:id
Remove skill from current user. (Protected)

**Response (200):**
```
json
{
  "message": "Skill removed successfully"
}
```

---

## 🎯 Skills

### GET /skills
Get all available skills.

**Response (200):**
```
json
[
  {
    "id": "uuid",
    "name": "React",
    "category": "Frontend Development",
    "description": "A JavaScript library for building user interfaces"
  },
  {
    "id": "uuid",
    "name": "Node.js",
    "category": "Backend Development",
    "description": "JavaScript runtime built on Chrome's V8 engine"
  }
]
```

---

## 💝 Matches

### GET /matches/recommended
Get recommended matches based on skills. (Protected)

**Query Parameters:**
- `limit` (optional): Number of results (default: 10, max: 50)
- `offset` (optional): Pagination offset

**Response (200):**
```
json
[
  {
    "userId": "uuid",
    "score": 85,
    "matchedOffers": ["React"],
    "matchedWants": ["Figma"],
    "name": "Jane Smith",
    "avatar": "https://...",
    "profile_completion": 75
  }
]
```

**Scoring Algorithm:**
- 50% - Mutual matches (users who offer what you want + want what you offer)
- 30% - Skill overlap
- 20% - Profile completion

### GET /matches/:id/messages
Get messages for a match. (Protected)

**Parameters:**
- `id`: Match UUID

**Response (200):**
```
json
[
  {
    "id": "uuid",
    "match_id": "uuid",
    "sender_id": "uuid",
    "content": "Hey! When are you free to chat?",
    "is_read": false,
    "created_at": "2025-01-15T11:00:00Z",
    "sender": {
      "id": "uuid",
      "name": "Jane Smith",
      "avatar": "https://..."
    }
  }
]
```

---

## 📨 Requests

### GET /requests
Get all match requests (both incoming and sent). (Protected)

**Response (200):**
```
json
{
  "incoming": [
    {
      "id": "uuid",
      "sender": {
        "id": "uuid",
        "name": "Jane Smith",
        "avatar": "https://..."
      },
      "offeredSkills": ["React"],
      "wantedSkills": ["Figma"],
      "message": "Hi! I'd love to learn...",
      "status": "pending",
      "created_at": "2025-01-15T11:00:00Z"
    }
  ],
  "sent": [
    {
      "id": "uuid",
      "receiver": {
        "id": "uuid",
        "name": "John Doe",
        "avatar": "https://..."
      },
      "status": "pending",
      "created_at": "2025-01-15T11:00:00Z"
    }
  ]
}
```

### POST /requests
Send a match request. (Protected)

**Request Body:**
```json
{
  "receiver_id": "uuid",
  "message": "Hi! I'd love to learn Figma from you. I can help with React!"
}
```

**Response (201):**
```
json
{
  "id": "uuid",
  "sender_id": "uuid",
  "receiver_id": "uuid",
  "status": "pending",
  "message": "Hi! I'd love to learn Figma...",
  "created_at": "2025-01-15T11:00:00Z"
}
```

### PUT /requests/:id/accept
Accept a match request. (Protected)

**Parameters:**
- `id`: Request UUID

**Response (200):**
```
json
{
  "message": "Request accepted",
  "match": {
    "id": "uuid",
    "user1_id": "uuid",
    "user2_id": "uuid",
    "created_at": "2025-01-15T11:00:00Z"
  }
}
```

### PUT /requests/:id/reject
Reject a match request. (Protected)

**Parameters:**
- `id`: Request UUID

**Response (200):**
```
json
{
  "message": "Request rejected"
}
```

---

## 💬 Messages

### POST /messages
Send a message. (Protected)

**Request Body:**
```
json
{
  "match_id": "uuid",
  "content": "Hey! When are you free to chat?"
}
```

**Response (201):**
```
json
{
  "id": "uuid",
  "match_id": "uuid",
  "sender_id": "uuid",
  "content": "Hey! When are you free to chat?",
  "is_read": false,
  "created_at": "2025-01-15T11:00:00Z",
  "sender": {
    "id": "uuid",
    "name": "John Doe",
    "avatar": "https://..."
  }
}
```

**Validation:**
- `match_id`: Required, valid UUID
- `content`: Required, 1-1000 characters

### PUT /messages/:id/read
Mark message as read. (Protected)

**Parameters:**
- `id`: Message UUID

**Response (200):**
```
json
{
  "message": "Message marked as read"
}
```

---

## 🎮 Gamification

### GET /gamification/stats
Get user's gamification stats. (Protected)

**Response (200):**
```
json
{
  "xp": 1250,
  "level": 3,
  "level_title": "Practitioner",
  "next_level_xp": 2000,
  "progress_percentage": 62.5,
  "achievements": [
    {
      "id": "first_skill",
      "name": "First Skill",
      "description": "Add your first skill",
      "icon": "🎯",
      "unlocked_at": "2025-01-15T11:00:00Z"
    }
  ],
  "streak": {
    "current": 5,
    "longest": 12,
    "last_activity": "2025-01-15T11:00:00Z"
  },
  "stats": {
    "sessions_completed": 8,
    "rating": 4.8,
    "total_ratings": 12
  }
}
```

### GET /gamification/leaderboard
Get top users by XP. (Protected)

**Query Parameters:**
- `limit` (optional): Number of results (default: 10)

**Response (200):**
```
json
[
  {
    "rank": 1,
    "user": {
      "id": "uuid",
      "name": "Top User",
      "avatar": "https://..."
    },
    "xp": 5000,
    "level": 5,
    "achievements_count": 8
  }
]
```

### Levels System

| Level | Title       | XP Range    |
|-------|-------------|-------------|
| 1     | Novice      | 0-499       |
| 2     | Apprentice  | 500-999     |
| 3     | Practitioner| 1000-1999   |
| 4     | Expert      | 2000-4999   |
| 5     | Master      | 5000-9999   |
| 6     | Grandmaster | 10000+      |

---

## 🔌 WebSocket Events

Connect to WebSocket server at: `ws://localhost:3000` (Socket.io)

### Client → Server Events

#### join_match
Join a match room to receive messages.

```
javascript
socket.emit("join_match", { match_id: "uuid" });
```

#### leave_match
Leave a match room.

```
javascript
socket.emit("leave_match", { match_id: "uuid" });
```

#### send_message
Send a real-time message.

```
javascript
socket.emit("send_message", {
  match_id: "uuid",
  content: "Hello!"
});
```

#### typing
Indicate typing status.

```
javascript
socket.emit("typing", {
  match_id: "uuid",
  is_typing: true
});
```

#### user_online
Set user online status.

```
javascript
socket.emit("user_online", {
  user_id: "uuid",
  is_online: true
});
```

### Server → Client Events

#### message_received
New message in match.

```
javascript
socket.on("message_received", (data) => {
  // {
  //   id: "uuid",
  //   match_id: "uuid",
  //   sender_id: "uuid",
  //   content: "Hello!",
  //   created_at: "2025-01-15T11:00:00Z",
  //   sender: { ... }
  // }
});
```

#### user_typing
User typing indicator.

```
javascript
socket.on("user_typing", (data) => {
  // {
  //   match_id: "uuid",
  //   user_id: "uuid",
  //   is_typing: true
  // }
});
```

#### user_online
User online status change.

```
javascript
socket.on("user_online", (data) => {
  // {
  //   user_id: "uuid",
  //   is_online: true
  // }
});
```

#### error
Error event.

```
javascript
socket.on("error", (data) => {
  console.error(data.message);
});
```

---

## ⚠️ Error Handling

All errors follow this format:

```
json
{
  "error": "Error message",
  "details": "Additional details (development only)",
  "code": "ERROR_CODE"
}
```

### Common HTTP Status Codes

| Code | Meaning                                 |
| ---- | --------------------------------------- |
| 200  | OK - Request successful                 |
| 201  | Created - Resource created              |
| 400  | Bad Request - Invalid input             |
| 401  | Unauthorized - Invalid/missing token    |
| 403  | Forbidden - Not allowed                 |
| 404  | Not Found - Resource doesn't exist      |
| 429  | Too Many Requests - Rate limit exceeded |
| 500  | Internal Server Error                   |

### Error Codes

| Code             | Description               |
| ---------------- | ------------------------- |
| `INVALID_INPUT`  | Request validation failed |
| `UNAUTHORIZED`   | Authentication required   |
| `FORBIDDEN`      | Insufficient permissions  |
| `NOT_FOUND`      | Resource not found        |
| `RATE_LIMITED`   | Too many requests         |
| `INTERNAL_ERROR` | Server error              |

---

## 🚦 Rate Limiting

API endpoints are rate-limited to prevent abuse.

### General Endpoints
- **Limit:** 100 requests per 15 minutes per IP
- **Applies to:** All endpoints except auth

### Authentication Endpoints
- **Limit:** 5 requests per 15 minutes per IP
- **Applies to:** `/auth/signup`, `/auth/login`
- **Note:** Successful requests don't count toward limit

### Rate Limit Headers

```
http
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1642341600
```

When rate limit is exceeded:

```
json
{
  "error": "Too many requests from this IP, please try again later."
}
```

---

## 📱 Mobile Considerations

- All endpoints support CORS for mobile apps
- Image uploads should be optimized before sending
- Use WebSocket for real-time features
- Implement offline caching for better UX

---

## 🔒 Security

- All endpoints use HTTPS in production
- JWT tokens expire after 15 minutes
- Passwords hashed with bcrypt (12 rounds)
- Input sanitized to prevent XSS
- Helmet headers for additional protection

---

## 🧪 Testing

### Test Coverage

- **Unit Tests**: Matching algorithm tests
- **Integration Tests**: Auth, users, matches, requests, middleware
- **E2E Tests**: Auth, profile, matches, chat flows

Run tests:
```
bash
# Backend
cd backend
npm test

# Frontend E2E
npm run test:e2e
```

---

## 📝 Changelog

### v1.0.0 (March 2025)
- Initial API release
- Authentication system with JWT
- User management with skills
- Matching algorithm with scoring
- Real-time chat (WebSocket)
- Gamification system (XP, levels, achievements)
- Rate limiting
- Security hardening (Helmet, XSS protection)

---

**For support or questions, contact:** support@skillswap.com
