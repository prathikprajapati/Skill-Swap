# Backend Implementation Plan for Skill Swap Application

## Overview
This plan outlines the implementation of a backend API for the Skill Swap application, supporting the MVP features defined in backend-phase-1.md. The backend will provide authentication, user profiles, skills management, match recommendations, request workflows, and chat functionality.

## Architecture & Tech Stack

### Runtime & Framework
- **Node.js** with **Express.js** for the web framework
- **TypeScript** for type safety and better development experience

### Database & ORM
- **PostgreSQL** as the primary database
- **Prisma** as the ORM for type-safe database operations

### Authentication & Security
- **JWT** for authentication (short-lived access tokens)
- **bcrypt** for password hashing
- **express-validator** for input validation
- **CORS** middleware for cross-origin requests

### Development Tools
- **Nodemon** for development server auto-restart
- **Jest** for testing
- **ESLint** for code linting

## Database Schema

### Core Tables

#### users
- `id`: UUID (primary key)
- `email`: VARCHAR(255) UNIQUE NOT NULL
- `password_hash`: VARCHAR(255) NOT NULL
- `name`: VARCHAR(255) NOT NULL
- `avatar`: VARCHAR(500)
- `profile_completion`: INTEGER DEFAULT 0
- `created_at`: TIMESTAMP DEFAULT NOW()
- `updated_at`: TIMESTAMP DEFAULT NOW()

#### skills
- `id`: UUID (primary key)
- `name`: VARCHAR(255) UNIQUE NOT NULL
- `category`: VARCHAR(100)
- `created_at`: TIMESTAMP DEFAULT NOW()

#### user_skills
- `id`: UUID (primary key)
- `user_id`: UUID (foreign key to users.id) NOT NULL
- `skill_id`: UUID (foreign key to skills.id) NOT NULL
- `skill_type`: ENUM('offer', 'want') NOT NULL
- `proficiency_level`: ENUM('beginner', 'intermediate', 'expert') DEFAULT 'beginner'
- `created_at`: TIMESTAMP DEFAULT NOW()
- UNIQUE(user_id, skill_id, skill_type)

#### match_requests
- `id`: UUID (primary key)
- `sender_id`: UUID (foreign key to users.id) NOT NULL
- `receiver_id`: UUID (foreign key to users.id) NOT NULL
- `status`: ENUM('pending', 'accepted', 'rejected') DEFAULT 'pending'
- `created_at`: TIMESTAMP DEFAULT NOW()
- `updated_at`: TIMESTAMP DEFAULT NOW()
- UNIQUE(sender_id, receiver_id)

#### matches
- `id`: UUID (primary key)
- `user1_id`: UUID (foreign key to users.id) NOT NULL
- `user2_id`: UUID (foreign key to users.id) NOT NULL
- `created_at`: TIMESTAMP DEFAULT NOW()
- UNIQUE(user1_id, user2_id)

#### messages
- `id`: UUID (primary key)
- `match_id`: UUID (foreign key to matches.id) NOT NULL
- `sender_id`: UUID (foreign key to users.id) NOT NULL
- `content`: TEXT NOT NULL
- `is_read`: BOOLEAN DEFAULT FALSE
- `created_at`: TIMESTAMP DEFAULT NOW()

### Indexes
- users.email
- user_skills.user_id, user_skills.skill_id
- match_requests.sender_id, match_requests.receiver_id, match_requests.status
- messages.match_id, messages.created_at

## API Endpoints

### Authentication
- `POST /auth/signup` - User registration
- `POST /auth/login` - User login

### User Profile
- `GET /users/me` - Get current user profile
- `PUT /users/me` - Update user profile

### Skills Management
- `GET /skills` - List all available skills
- `POST /users/me/skills` - Add skill to user profile
- `DELETE /users/me/skills/:id` - Remove skill from user profile
- `GET /users/me/skills` - Get user's skills

### Match Recommendations
- `GET /matches/recommended` - Get recommended matches

### Match Requests
- `POST /requests` - Send match request
- `GET /requests/incoming` - List incoming requests
- `GET /requests/sent` - List sent requests
- `PUT /requests/:id/accept` - Accept request
- `PUT /requests/:id/reject` - Reject request

### Chat
- `GET /matches/:id/messages` - Get messages for a match
- `POST /messages` - Send message
- `PUT /messages/:id/read` - Mark message as read

## Implementation Phases

### Phase 1: Project Setup & Authentication
1. Initialize Node.js/Express project with TypeScript
2. Set up Prisma with PostgreSQL connection
3. Implement user registration endpoint
4. Implement user login endpoint
5. Create JWT authentication middleware
6. Add password hashing with bcrypt
7. Set up input validation

### Phase 2: User Profile Management
1. Implement GET /users/me endpoint
2. Implement PUT /users/me endpoint
3. Add avatar upload handling (optional)

### Phase 3: Skills Management
1. Create skills seed data
2. Implement GET /skills endpoint
3. Implement POST /users/me/skills endpoint
4. Implement DELETE /users/me/skills/:id endpoint
5. Implement GET /users/me/skills endpoint

### Phase 4: Match Recommendation Algorithm
1. Implement matching logic based on skill compatibility
2. Create scoring algorithm (50% mutual matches, 30% skill count, 20% profile completion)
3. Implement GET /matches/recommended endpoint
4. Add filtering to exclude existing connections

### Phase 5: Match Requests Workflow
1. Implement POST /requests endpoint
2. Implement GET /requests/incoming endpoint
3. Implement GET /requests/sent endpoint
4. Implement PUT /requests/:id/accept endpoint
5. Implement PUT /requests/:id/reject endpoint
6. Add logic to create matches when requests are accepted

### Phase 6: Chat System
1. Implement GET /matches/:id/messages endpoint
2. Implement POST /messages endpoint
3. Implement PUT /messages/:id/read endpoint

## Matching Algorithm Details

### Scoring Formula
```
Score = (Mutual Matches * 0.5) + (Skill Overlap * 0.3) + (Profile Completion * 0.2)
```

### Mutual Matches (50% weight)
- User's wanted skills that match other users' offered skills
- User's offered skills that match other users' wanted skills
- Score based on number of mutual matches

### Skill Overlap (30% weight)
- Total number of skills that overlap between users
- Normalized to 0-100 scale

### Profile Completion (20% weight)
- Direct percentage from user's profile_completion field

### Filtering Rules
- Exclude users with existing pending/accepted requests
- Exclude users who are already matches
- Exclude current user
- Only include users with complementary skills

## Security Considerations

### Authentication
- JWT tokens with 15-30 minute expiration
- Password hashing with bcrypt (salt rounds: 12)
- Secure token storage on client side

### Input Validation
- Use express-validator for all endpoints
- Sanitize user inputs
- Validate email formats, password strength
- Check for SQL injection prevention through Prisma

### CORS Configuration
- Allow requests from frontend domain only
- Configure appropriate headers

## Testing Strategy

### Unit Tests
- Test individual functions and utilities
- Test database operations
- Test authentication logic

### Integration Tests
- Test API endpoints
- Test database relationships
- Test authentication flow

### End-to-End Tests
- Test complete user workflows
- Test matching algorithm
- Test request and chat flows

## Deployment Considerations

### Environment Variables
- DATABASE_URL
- JWT_SECRET
- NODE_ENV
- PORT
- CORS_ORIGIN

### Database Migration
- Use Prisma migrations for schema changes
- Seed initial skills data

### Monitoring
- Add request logging
- Error tracking
- Performance monitoring

## Development Workflow

1. Set up development environment
2. Implement features in order (Phase 1 → Phase 6)
3. Write tests for each feature
4. Integration testing with frontend
5. Performance optimization
6. Security audit
7. Deployment preparation

## Success Criteria

- All MVP endpoints implemented and tested
- Matching algorithm provides relevant recommendations
- Authentication is secure and user-friendly
- Request workflow functions correctly
- Chat system enables communication between matches
- Code is well-documented and maintainable
- Performance meets requirements for MVP scale
