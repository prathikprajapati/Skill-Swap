# Backend Phase 1: Freeze & Clean

## MVP Scope (Frozen)

### What is IN v1:
- Auth
- Profile
- Skills CRUD
- Matches
- Requests
- Chat

### What is NOT in v1:
- Advanced filters
- Analytics
- Notifications
- AI matching v2
- Admin panel
- Social features

## API Boundaries

### Dashboard Page
- GET /matches/recommended

### Profile Page
- GET /users/me
- PUT /users/me
- POST /skills
- DELETE /skills/:id

### Requests Page
- GET /requests/incoming
- GET /requests/sent
- POST /requests
- PUT /requests/:id/accept
- PUT /requests/:id/reject

### Chat Page
- GET /matches/:id/messages
- POST /messages

### Additional Notes
- When a request is accepted, create a matches record
- Messages reference matches.id, not match_requests.id
- Separate workflow (requests) from relationships (matches)
