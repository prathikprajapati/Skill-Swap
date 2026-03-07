# Skill-Swap TODO List (Final Optimized)

> Created from Technical Audit Report - Tech Lead Refined v2

---

## 🚦 EXECUTION STRATEGY

### Critical Principle
**Group schema changes together → ONE migration cycle**

Doing individual migrations will waste time regenerating Prisma client 5+ times.

---

## 🔴 WEEK 1 — Domain Integrity (Schema + Transactions + Core Entities)

> Goal: Backend integrity solid

### Step 1.1 — Batch Schema Migration (Do Together!)

Run ONE migration with ALL changes including safety defaults:

- [x] Add `MatchStatus` enum (active, completed, cancelled, archived)
- [x] Add `status` field to Match model with default:
  ```prisma
  status MatchStatus @default(active)
  ```
- [x] Add `Achievement` model with AchievementType enum
- [x] Add `Notification` model with NotificationType enum
- [x] Add `is_deleted` + `deleted_at` fields to User model with defaults:
  ```prisma
  is_deleted  Boolean  @default(false)
  deleted_at  DateTime?
  ```
- [x] Add composite unique constraint for Ratings
- [x] Add pagination-friendly indexes:
  ```prisma
  @@index([created_at])
  @@index([user_id])
  @@index([status])
  ```
- **Priority**: CRITICAL | **Realistic**: 30 min setup + migration ✅ COMPLETED

### Step 1.2 — Transaction Fix (Immediately After Schema)

- [x] Fix `acceptRequest` in `requestsController.ts`
- [x] Wrap operations in `prisma.$transaction`
- **Priority**: CRITICAL | **Realistic**: 30 min ✅ COMPLETED

### Step 1.3 — Pagination Utility Layer

- [x] Create `backend/src/utils/pagination.ts`
  ```ts
  export function getPagination(query) {
    const page = Math.max(parseInt(query.page) || 1, 1);
    const limit = Math.min(parseInt(query.limit) || 20, 100);
    const skip = (page - 1) * limit;
    return { page, limit, skip };
  }
  ```
- [x] Add default orderBy to all paginated queries:
  ```ts
  orderBy: { created_at: 'desc' }
  ```
- [x] Implement pagination in all endpoints:
  - [x] ratingsController.ts - getRatings, getUserRating ✅
  - [x] matchesController.ts - getMyMatches ✅
  - [x] messagesController.ts - getMessages ✅
  - [x] requestsController.ts - getIncomingRequests, getSentRequests ✅
  - [x] gamificationController.ts - getXPHistory ✅
- **Priority**: HIGH | **Realistic**: 30 min ✅ COMPLETED (FIXED)

### Step 1.4 — Soft Delete Query Discipline

- [x] Create `backend/src/utils/filters.ts`
  ```ts
  export const activeUser = { is_deleted: false };
  ```
- [x] Refactor user queries to use centralized service method
- [x] Wrap all user fetches in service layer (never query Prisma directly from controller)
- [x] Apply to matching algorithm (exclude deleted users)
- [x] Apply to recommendations
- **Priority**: HIGH | **Realistic**: 2–3 hours ✅ COMPLETED

### Step 1.5 — Ratings CRUD

**Before writing routes, define rules:**
- Composite unique constraint: `[rated_user_id, rater_user_id, match_id]`
- Ownership validation
- Prevent self-review
- Use Prisma aggregation for average rating (Option A - cleaner for college level)

**Features:**
- [x] CREATE /ratings (with authorization)
- [x] READ /ratings (list + get by id)
- [x] GET /ratings/user/:id (average rating via aggregation)
- [x] DELETE /ratings/:id (if needed)
- [x] ~~UPDATE /ratings~~ (NOT needed - keep scope tight)

**Decision**: Use Prisma aggregation for average rating (Option A)
- No extra field on User model
- Compute dynamically when needed

- **Priority**: HIGH | **Realistic**: 4–6 hours ✅ COMPLETED

---

## 🟡 WEEK 2 — Domain Rules Completion

> Goal: Domain airtight

### Step 2.1 — Achievement System

- [x] Create `backend/src/services/achievementService.ts`
- [x] Add unlock triggers (centralized, NOT scattered):
  - After match completion → FIRST_MATCH, FIVE_CONNECTIONS
  - After skill addition → SKILL_MASTER
  - After rating submission → TOP_TEACHER
- [x] **Ensure achievement unlock is idempotent** (use upsert() - no duplicates)
- [x] READ endpoint (users get their achievements)
- [x] **NO public CREATE/DELETE** (internal only via service)

### Step 2.2 — Notification System

- [x] Implement notification persistence
- [x] CREATE (via events - internal)
- [x] GET /notifications (list with pagination)
- [x] PUT /notifications/:id/read
- [x] PUT /notifications/read-all
- [x] **Ensure notification failure does NOT break main transaction**
  - Wrap in try/catch or separate async call
  - Fire-and-forget pattern
- **DO NOT build full UI yet** - just ensure creation works

### Step 2.3 — Match Lifecycle

- [x] Implement status transitions:
  ```
  Request → Accept → Match (active)
  → Complete Session → Match (completed)
  → Cancel → Match (cancelled)
  → Archive → Match (archived)
  ```
- [x] **Define match completion rule (rating-driven)**
  - **Rule**: Match becomes completed when BOTH users submit rating
  - This removes manual state toggling

### Step 2.4 — Add DELETE/PATCH Endpoints

- [x] PATCH /users/me (soft delete account)
- [x] PATCH /requests/:id (cancel request) — NOT DELETE
- [x] PATCH /matches/:id (archive/unmatch) — **Use PATCH, NOT DELETE**
  ```ts
  // Should update status = 'archived', not hard delete
  ```
- [x] DELETE /messages/:id

---

## 🟢 WEEK 3 — Frontend Data Stability

> Goal: Frontend stable and real

### Step 3.1 — React Query Setup

- [x] Install and configure React Query
- [x] Replace all manual useEffect fetching

### Step 3.2 — Remove Mock Data

- [x] Remove hardcoded achievements from `ProfilePage.tsx`
- [x] Remove mock data from `LandingPage.tsx`
- [x] Replace with real API data

### Step 3.3 — Add Loading + Error UI

- [x] Add loading states to DashboardPage
- [x] Add error handling to API calls

---

## 🔵 WEEK 4 — Refactor & Polish

> Goal: Maintainable + clean

### Step 4.1 — DashboardPage Split

- [x] Target: 200 lines max (currently 800+)
- [x] Extract MatchCard component
- [x] Extract Sidebar components

### Step 4.2 — Design System

- [x] Standardize spacing (8, 16, 24, 32, 48)
- [x] Typography cleanup (3-5 font sizes)
- [x] Clean theme usage

---

## 📋 ENTITY CRUD STATUS (Final)

### Ratings
- [x] Model exists
- [x] CREATE /ratings
- [x] READ /ratings
- [x] READ /ratings/user/:id (average via aggregation)
- [x] DELETE /ratings/:id
- [x] ~~UPDATE /ratings~~ (removed - keep scope tight)

**Strategy**: Use Prisma aggregation for average rating (Option A)

### Achievements (Internal Only)
- [x] CREATE (via achievementService - internal)
- [x] READ /achievements (via gamification endpoint)
- [x] ~~UPDATE~~ (not needed)
- [x] ~~DELETE~~ (not needed)

**Note**: Use upsert() for idempotent unlock

### Notifications
- [x] CREATE (via events - internal, fire-and-forget)
- [x] READ /notifications
- [x] UPDATE /notifications/:id/read
- [x] ~~DELETE~~ (not needed)

### DELETE/PATCH Endpoints
- [x] PATCH /users/me (soft delete)
- [x] PATCH /requests/:id (cancel)
- [x] PATCH /matches/:id (archive - update status)
- [x] DELETE /messages/:id

---

## ⚡ QUICK WINS SUMMARY

| Time   | Tasks                                    |
| ------ | ---------------------------------------- |
| 30 min | Fix acceptRequest transaction            |
| 30 min | Add JWT_SECRET validation                |
| 30 min | Create pagination utility + orderBy      |
| 1 hr   | Add indexes to schema                    |
| 2-3 hr | Implement soft delete with service layer |

---

## 📊 REALISTIC TIME ESTIMATES

| Task                         | Original | Realistic |
| ---------------------------- | -------- | --------- |
| Ratings CRUD                 | 2h       | 4–6h      |
| Achievements model + service | 2h       | 3–4h      |
| Notifications CRUD           | 2h       | 3h        |
| Pagination + orderBy         | 1h       | 2–3h      |
| Soft delete + service layer  | 2h       | 3–4h      |

---

## ⚠️ CRITICAL RULES ADDED

### 1. Data Migration Defaults (Step 1.1)
```prisma
status MatchStatus @default(active)
is_deleted Boolean @default(false)
```

### 2. Pagination Stability (Step 1.3)
Always add: `orderBy: { created_at: 'desc' }`

### 3. Achievement Idempotency (Step 2.1)
Use `upsert()` to prevent duplicate achievements

### 4. Notification Fire-and-Forget (Step 2.2)
Wrap in try/catch - don't block main request on notification failure

### 5. Match Completion Rule (Step 2.3)
**Match completes when BOTH users submit ratings** (no manual toggle)

### 6. Rating Average Strategy (Step 1.5)
Use Prisma aggregation (Option A) - compute dynamically, no extra field

### 7. Soft Delete Service Layer (Step 1.4)
Never query Prisma directly from controller - use centralized service method

---

## 📈 PROGRESS TRACKING

| Metric            | Current | Target |
| ----------------- | ------- | ------ |
| Backend Complete  | ~55%    | 85%    |
| Frontend Complete | ~50%    | 75%    |
| Critical Blockers | 5       | 0      |

---

## 💣 STRATEGIC ADVICE

**Focus on:**
1. Clean domain
2. Solid CRUD
3. Clear lifecycle

**DO NOT add (scope creep):**
- Advanced caching
- Redis
- Optimistic UI
- Complex event system

**Difficulty Curve:**
- Week 1: Heavy mental load ✅
- Week 2: Medium
- Week 3: Easy
- Week 4: Cosmetic

**Make backend logically correct → Make frontend stable → Then stop**

---

## 🎯 WEEKLY CHECKPOINTS

### Week 1 Checkpoint
- [x] Single schema migration ran (with defaults!)
- [x] Transaction fixed
- [x] Pagination utility + orderBy created
- [x] Soft delete service layer implemented
- [x] Ratings CRUD working (with aggregation)

### Week 2 Checkpoint
- [x] Achievement triggers centralized + idempotent
- [x] Notifications working (fire-and-forget)
- [x] Match lifecycle complete (rating-driven)
- [x] DELETE/PATCH endpoints done

### Week 3 Checkpoint
- [x] React Query implemented
- [x] Mock data removed
- [x] Loading/error UI consistent

### Week 4 Checkpoint
- [x] DashboardPage split into smaller components
- [x] Design system standardized (spacing, typography constants)
- [x] React Query implemented in DashboardPage

