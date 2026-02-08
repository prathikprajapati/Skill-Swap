# Backend Phase 3: Frontend ↔ Backend Integration

## API Layer Creation

Create `src/app/api/` folder with service modules:

### auth.ts
```typescript
export const authAPI = {
  signup: (data: SignupData) => api.post('/auth/signup', data),
  login: (data: LoginData) => api.post('/auth/login', data),
  refresh: () => api.post('/auth/refresh'),
  logout: () => api.post('/auth/logout'),
};
```

### users.ts
```typescript
export const usersAPI = {
  getMe: () => api.get('/users/me'),
  updateMe: (data: UpdateUserData) => api.put('/users/me', data),
  updateAvatar: (file: File) => api.post('/users/me/avatar', file),
};
```

### skills.ts
```typescript
export const skillsAPI = {
  getAll: () => api.get('/skills'), // global skill catalog
  addToUser: (data: AddSkillData) => api.post('/users/me/skills', data),
  removeFromUser: (skillId: string) => api.delete(`/users/me/skills/${skillId}`),
  getUserSkills: () => api.get('/users/me/skills'),
};
```

### matches.ts
```typescript
export const matchesAPI = {
  getRecommended: (params?: MatchParams) => api.get('/matches/recommended', { params }),
  getAccepted: () => api.get('/matches/accepted'),
};
```

### requests.ts
```typescript
export const requestsAPI = {
  send: (receiverId: string) => api.post('/requests', { receiverId }),
  getIncoming: () => api.get('/requests/incoming'),
  getSent: () => api.get('/requests/sent'),
  accept: (requestId: string) => api.put(`/requests/${requestId}/accept`),
  reject: (requestId: string) => api.put(`/requests/${requestId}/reject`),
};
```

### messages.ts
```typescript
export const messagesAPI = {
  getForMatch: (matchId: string) => api.get(`/matches/${matchId}/messages`),
  send: (data: SendMessageData) => api.post('/messages', data),
  markAsRead: (messageId: string) => api.put(`/messages/${messageId}/read`),
};
```

## API Client Setup

Create `src/app/api/client.ts`:
- Axios instance with base URL
- Request/response interceptors
- JWT token handling
- Error handling
- Retry logic

## State Management Upgrade

### Auth State
- Create `AuthContext` with user data and token
- Persist auth state in localStorage
- Auto-refresh tokens
- Route protection

### Query Caching
- Install TanStack Query (React Query)
- Wrap app with QueryClient
- Convert API calls to useQuery/useMutation
- Implement optimistic updates
- Handle loading/error states globally

## UI Updates

### Replace Mock Calls
- Update all pages to use real API calls
- Remove mockData imports
- Add proper loading states
- Handle API errors gracefully

### Error Handling
- Global error boundary
- Toast notifications for errors
- Retry buttons for failed requests
- Offline handling

### Loading States
- Skeleton loaders for lists
- Spinner buttons for actions
- Progressive loading for images
- Disable interactions during loading

## Migration Strategy

1. **Auth Integration First**
   - Replace AuthPage with real API calls
   - Update routing to handle auth state

2. **Profile & Skills**
   - Update ProfilePage to use usersAPI and skillsAPI
   - Handle skill CRUD operations

3. **Matching & Requests**
   - Update DashboardPage with matchesAPI
   - Update RequestsPage with requestsAPI

4. **Chat (Optional)**
   - Update ChatPage with messagesAPI
   - Add real-time updates if implemented

## Testing Integration

- Mock API responses for development
- Test error scenarios
- Verify loading states
- Check authentication flow
