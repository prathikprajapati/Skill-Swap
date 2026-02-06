# Backend Phase 2: Backend Foundation

## Backend Stack (Locked)

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Authentication:** JWT (short-lived access tokens, no refresh tokens for MVP)
- **Validation:** Joi or express-validator
- **Password Hashing:** bcrypt
- **CORS:** express cors middleware

### Authentication Strategy
- **Access Tokens:** Short-lived JWT (15-30 minutes)
- **No Refresh Tokens:** For MVP simplicity, users re-login when tokens expire
- **Future Consideration:** Add refresh tokens table for production
  - refresh_tokens: id, user_id, token, expires_at, UNIQUE(user_id)

## Database Schema

### Tables & Relations

#### users
- id: UUID (primary key)
- email: VARCHAR(255) UNIQUE NOT NULL
- password_hash: VARCHAR(255) NOT NULL
- name: VARCHAR(255) NOT NULL
- avatar: VARCHAR(500)
- profile_completion: INTEGER DEFAULT 0
- created_at: TIMESTAMP DEFAULT NOW()
- updated_at: TIMESTAMP DEFAULT NOW()

#### skills
- id: UUID (primary key)
- name: VARCHAR(255) UNIQUE NOT NULL
- category: VARCHAR(100)
- created_at: TIMESTAMP DEFAULT NOW()

#### user_skills
- id: UUID (primary key)
- user_id: UUID (foreign key to users.id) NOT NULL
- skill_id: UUID (foreign key to skills.id) NOT NULL
- skill_type: ENUM('offer', 'want') NOT NULL
- proficiency_level: ENUM('beginner', 'intermediate', 'expert') DEFAULT 'beginner'
- created_at: TIMESTAMP DEFAULT NOW()
- UNIQUE(user_id, skill_id, skill_type) - prevent duplicate skills per user per type

#### match_requests
- id: UUID (primary key)
- sender_id: UUID (foreign key to users.id) NOT NULL
- receiver_id: UUID (foreign key to users.id) NOT NULL
- status: ENUM('pending', 'accepted', 'rejected') DEFAULT 'pending'
- created_at: TIMESTAMP DEFAULT NOW()
- updated_at: TIMESTAMP DEFAULT NOW()
- UNIQUE(sender_id, receiver_id) - prevent duplicate requests

#### matches
- id: UUID (primary key)
- user1_id: UUID (foreign key to users.id) NOT NULL
- user2_id: UUID (foreign key to users.id) NOT NULL
- created_at: TIMESTAMP DEFAULT NOW()
- UNIQUE(user1_id, user2_id) - prevent duplicate matches

#### messages
- id: UUID (primary key)
- match_id: UUID (foreign key to matches.id) NOT NULL
- sender_id: UUID (foreign key to users.id) NOT NULL
- content: TEXT NOT NULL
- is_read: BOOLEAN DEFAULT FALSE
- created_at: TIMESTAMP DEFAULT NOW()

### Indexes
- users.email
- user_skills.user_id
- user_skills.skill_id
- match_requests.sender_id
- match_requests.receiver_id
- match_requests.status
- messages.match_id
- messages.created_at

### Constraints
- Foreign key constraints on all relations
- Check constraints for profile_completion (0-100)
- Unique constraints as specified above

## Build Order

### 1. Project Setup & Auth
- Initialize Node.js + Express project
- Set up Prisma with PostgreSQL
- Implement user registration (POST /auth/signup)
- Implement user login (POST /auth/login)
- Create JWT middleware for protected routes
- Add password hashing with bcrypt

### 2. User Profile
- GET /users/me (get current user profile)
- PUT /users/me (update user profile)
- Add avatar upload handling (optional)

### 3. Skills Management
- GET /skills (list all available skills)
- POST /skills (add skill to user - offer/want)
- DELETE /skills/:id (remove skill from user)
- GET /users/me/skills (get user's skills)

### 4. Matching Logic
- GET /matches/recommended (rule-based matching algorithm)

#### Matching Rules
- User's wanted skills match other users' offered skills (mutual benefit)
- User's offered skills match other users' wanted skills (mutual benefit)
- Exclude users with existing pending/accepted requests or matches
- Exclude current user from results

#### Scoring Contract (Frozen)
- **Score Range:** 0-100 (integer)
- **Weighting:** 50% mutual matches, 30% skill count overlap, 20% profile completion
- **Output Shape:**
  ```json
  [
    {
      "userId": "uuid",
      "score": 82,
      "matchedOffers": ["JavaScript", "React"],
      "matchedWants": ["Python", "ML"],
      "name": "John Doe",
      "avatar": "url"
    }
  ]
  ```
- **Sorting:** Descending by score, then by profile completion

### 5. Match Requests
- POST /requests (send match request)
- GET /requests/incoming (list incoming requests)
- GET /requests/sent (list sent requests)
- PUT /requests/:id/accept (accept request)
- PUT /requests/:id/reject (reject request)

### 6. Chat (Optional - Last Priority)
- GET /matches/:id/messages (get messages for a match)
- POST /messages (send message)
- PUT /messages/:id/read (mark message as read)

## Development Order Rationale
1. Auth first - foundation for everything
2. Profile - basic user management
3. Skills - core business logic
4. Matching - the main feature
5. Requests - interaction layer
6. Chat - nice-to-have feature
