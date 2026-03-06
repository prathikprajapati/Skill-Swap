# SkillSwap ✨

**Where skills become stories**

SkillSwap is a modern, full-stack web platform that connects people to exchange knowledge and learn from each other. Create your profile, showcase your skills, find complementary matches through intelligent algorithms, and grow together through meaningful skill exchanges with real-time chat.

![SkillSwap Landing Page](https://via.placeholder.com/800x400/1e293b/818cf8?text=SkillSwap+Platform)

## 🌟 Features

- **🤝 Smart Matching**: AI-powered algorithm matching complementary skills (50% mutual, 30% overlap, 20% completion)
- **💬 Real-Time Chat**: WebSocket-based messaging with typing indicators and online status
- **🎨 Beautiful UI**: Modern, animated interface with divine light ray effects and 9 theme variants
- **🎮 Gamification**: XP system, levels (Novice to Grandmaster), achievements, and streaks
- **📱 Mobile-First**: Responsive design with touch-friendly targets (44px+), pull-to-refresh, mobile navigation
- **♿ Accessible**: WCAG compliant with ARIA labels, keyboard navigation, skip links, screen reader support
- **🌐 Offline Support**: Service worker for offline caching and PWA capabilities
- **🔐 Secure**: JWT authentication, bcrypt hashing, rate limiting, Helmet security headers, XSS protection

## 🚀 Tech Stack

### Frontend
- **React 18.3** - Modern UI library with hooks and concurrent features
- **TypeScript 5.9** - Type-safe development with strict mode
- **Vite 6.3** - Fast build tool with HMR and optimized production builds
- **Tailwind CSS 4.1** - Utility-first styling with CSS variables
- **Framer Motion 12.23** - Smooth animations and transitions
- **React Router 7.13** - Client-side routing with data APIs
- **Socket.io Client 4.8** - Real-time WebSocket communication
- **Radix UI 1.4** - Accessible UI primitives (50+ components)
- **Lucide React** - Consistent, beautiful icon library
- **Sonner** - Toast notifications
- **React Hook Form** - Performant form management with validation
- **Axios** - HTTP client for API requests

### Backend
- **Node.js 18+** - Runtime environment
- **Express 5.2** - Web framework with middleware support
- **TypeScript 5.9** - Type-safe development
- **Prisma 5.22** - Database ORM with type safety and migrations
- **MySQL 8** - Relational database (PostgreSQL-ready for production)
- **Socket.io 4.8** - Real-time bidirectional event-based communication
- **JWT 9.0** - Authentication tokens (15min expiry)
- **bcryptjs** - Password hashing (12 rounds)
- **express-validator** - Input validation and sanitization
- **Helmet 8.1** - Security headers (CSP, XSS, clickjacking protection)
- **express-rate-limit** - API rate limiting (100 req/15min general, 5 req/15min auth)
- **CORS** - Cross-origin resource sharing

### Testing & Quality
- **Jest 29.7** - Testing framework with coverage
- **Supertest** - HTTP assertion library for API testing
- **Playwright** - E2E testing across browsers
- **ESLint** - Code linting with TypeScript rules
- **TypeScript** - Compile-time type checking

### DevOps & Tools
- **Git** - Version control
- **npm** - Package management
- **nodemon** - Development auto-restart
- **tsx** - TypeScript execution

## 📦 Quick Start

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js 18+** - [Download here](https://nodejs.org/)
- **MySQL 8+** - [Download here](https://dev.mysql.com/downloads/)
- **npm** - Comes with Node.js
- **Git** - [Download here](https://git-scm.com/)

### Installation Steps

#### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/skillswap.git
cd skillswap
```

#### 2. Install Frontend Dependencies

```
bash
npm install
```

#### 3. Install Backend Dependencies

```
bash
cd backend
npm install
cd ..
```

#### 4. Set Up Environment Variables

Create a `.env` file in the `backend/` directory:

```env
# Database Configuration
DATABASE_URL="mysql://username:password@localhost:3306/skillswap"

# JWT Configuration
JWT_SECRET="your-super-secret-jwt-key-min-32-characters-long"
JWT_EXPIRES_IN="15m"

# Server Configuration
PORT=3000
NODE_ENV=development

# CORS Configuration
CORS_ORIGIN="http://localhost:5173"

# Optional: For production
# FORCE_START_SERVER=false
```

Create a `.env` file in the root directory (for frontend):

```
env
VITE_API_BASE_URL="http://localhost:3000"
```

#### 5. Set Up the Database

```
bash
cd backend

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# Seed the database with sample data (optional)
npx prisma db seed

cd ..
```

#### 6. Start the Development Servers

**Terminal 1 - Backend:**
```
bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```
bash
npm run dev
```

#### 7. Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000
- **Health Check**: http://localhost:3000/health
- **API Documentation**: See `API_DOCUMENTATION.md`

## 🗂️ Project Structure

```
skillswap/
├── 📁 src/                          # Frontend source code
│   ├── 📁 app/
│   │   ├── 📁 api/                  # API service modules
│   │   │   ├── auth.ts              # Authentication API
│   │   │   ├── client.ts            # Axios instance with interceptors
│   │   │   ├── gamification.ts      # Gamification API
│   │   │   ├── matches.ts           # Matches API
│   │   │   ├── messages.ts          # Messages API
│   │   │   ├── requests.ts          # Requests API
│   │   │   ├── skills.ts            # Skills API
│   │   │   └── users.ts             # Users API
│   │   ├── 📁 components/            # React components
│   │   │   ├── 📁 ui/              # shadcn/ui components
│   │   │   ├── 📁 figma/           # Figma-inspired components
│   │   │   ├── 📁 lightswind/     # Light UI components
│   │   │   ├── ErrorBoundary.tsx   # Error handling
│   │   │   ├── Layout.tsx          # App layout
│   │   │   ├── MobileNavigation.tsx # Mobile nav
│   │   │   ├── Navigation.tsx       # Desktop nav
│   │   │   ├── ProtectedRoute.tsx  # Auth guard
│   │   │   ├── PullToRefresh.tsx   # Mobile pull-to-refresh
│   │   │   ├── SkipNavigation.tsx  # Accessibility skip links
│   │   │   ├── ThemeSelector.tsx   # Theme switcher
│   │   │   └── GlassFolder.tsx     # Animated folder component
│   │   ├── 📁 contexts/             # React contexts
│   │   │   ├── AuthContext.tsx      # Authentication state
│   │   │   └── ThemeContext.tsx     # Theme management (9 themes)
│   │   ├── 📁 hooks/                # Custom React hooks
│   │   │   ├── useServiceWorker.ts  # PWA/offline support
│   │   │   └── useSocket.ts         # WebSocket management
│   │   ├── 📁 pages/                # Page components
│   │   │   ├── AuthPage.tsx        # Login/Signup
│   │   │   ├── ChatPage.tsx        # Real-time chat
│   │   │   ├── DashboardPage.tsx   # Match recommendations
│   │   │   ├── LandingPage.tsx     # Marketing page
│   │   │   ├── OnboardingPage.tsx  # New user setup
│   │   │   ├── ProfilePage.tsx     # User profile
│   │   │   └── RequestsPage.tsx    # Match requests
│   │   ├── 📁 data/                # Mock data
│   │   ├── 📁 utils/               # Utility functions
│   │   ├── 📁 constants/           # App constants
│   │   ├── App.tsx                # Root component
│   │   └── routes.tsx             # Route definitions
│   ├── 📁 styles/                 # Global styles
│   ├── 📁 hooks/                  # Shared hooks
│   ├── 📁 lib/                    # Utility libraries
│   └── main.tsx                   # App entry point
├── 📁 backend/                    # Backend API
│   ├── 📁 src/
│   │   ├── 📁 controllers/        # Route controllers
│   │   │   ├── authController.ts
│   │   │   ├── gamificationController.ts
│   │   │   ├── matchesController.ts
│   │   │   ├── messagesController.ts
│   │   │   ├── requestsController.ts
│   │   │   ├── skillsController.ts
│   │   │   └── userController.ts
│   │   ├── 📁 middleware/          # Express middleware
│   │   │   ├── auth.ts             # JWT authentication
│   │   │   └── upload.ts           # File upload handling
│   │   ├── 📁 routes/              # API routes
│   │   │   ├── auth.ts
│   │   │   ├── gamification.ts
│   │   │   ├── matches.ts
│   │   │   ├── messages.ts
│   │   │   ├── requests.ts
│   │   │   ├── skills.ts
│   │   │   └── users.ts
│   │   ├── 📁 types/               # TypeScript types
│   │   ├── server.ts              # Express server entry
│   │   └── socket.ts              # WebSocket server
│   ├── 📁 prisma/
│   │   ├── schema.prisma          # Database schema
│   │   ├── seed.ts               # Database seeding
│   │   └── migrations/           # Database migrations
│   ├── 📁 tests/                  # Test suites
│   │   ├── 📁 integration/        # Integration tests
│   │   └── 📁 unit/               # Unit tests
│   └── uploads/                   # File uploads
├── 📁 e2e/                        # E2E tests (Playwright)
├── 📁 public/                     # Static public assets
│   └── service-worker.js          # PWA service worker
├── 📁 FIGMA UI/                   # UI design files
├── README.md                      # This file
├── API_DOCUMENTATION.md           # API documentation
├── package.json                   # Frontend dependencies
├── vite.config.ts                 # Vite configuration
└── playwright.config.ts          # Playwright configuration
```

## 🎨 Design System

### 9 Theme Variants

| Theme         | ID              | Description           | Emoji |
| ------------- | --------------- | --------------------- | ----- |
| Warm Light    | `warm-light`    | Calm, friendly, human | 🌤     |
| Cool Light    | `cool-light`    | Clean, professional   | ❄️     |
| Dark Mode     | `dark`          | Focus, night mode     | 🌙     |
| Sunny Day     | `sunny-day`     | Bright & cheerful     | ☀️     |
| Ocean Breeze  | `ocean-breeze`  | Calm & refreshing     | 🌊     |
| Spring Garden | `spring-garden` | Fresh & vibrant       | 🌸     |
| Midnight      | `midnight`      | Deep & focused        | 🌃     |
| Starry Night  | `starry-night`  | Dreamy & cosmic       | ✨     |
| Cozy Dark     | `cozy-dark`     | Warm & relaxed        | ☕     |

### CSS Variables System

Each theme uses CSS custom properties for consistent styling:
- `--background`, `--foreground` - Base colors
- `--primary`, `--primary-dark`, `--primary-light` - Brand colors
- `--accent`, `--accent-light` - Accent colors
- `--text-primary`, `--text-secondary` - Text colors
- `--success`, `--warning`, `--destructive` - Status colors

## 🛠️ Development

### Available Scripts

#### Frontend (Root Directory)
```
bash
npm run dev          # Start Vite development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run test:e2e     # Run Playwright E2E tests
npm run test:e2e:ui  # Run E2E tests with UI
npm run test:e2e:debug # Debug E2E tests
npm run test:e2e:report # View test report
```

#### Backend
```
bash
cd backend

# Development
npm run dev          # Start with hot reload (nodemon + tsx)

# Production
npm run build        # Compile TypeScript to dist/
npm start           # Start production server

# Testing
npm test            # Run all Jest tests
npm run test:watch  # Run tests in watch mode
npm run test:coverage # Run tests with coverage report
npm run test:unit   # Run unit tests only
npm run test:integration # Run integration tests only

# Code Quality
npm run lint        # Run ESLint
npm run lint:fix    # Fix ESLint issues

# Database
npm run prisma:generate  # Generate Prisma client
npm run prisma:migrate   # Run database migrations
npm run prisma:seed      # Seed database with sample data
```

## 🧪 Testing

### Running Tests

```
bash
# Backend tests
cd backend
npm test                    # Run all tests
npm run test:unit          # Unit tests only
npm run test:integration   # Integration tests only
npm run test:coverage      # With coverage report

# Frontend E2E tests
npm run test:e2e           # Run Playwright tests
npm run test:e2e:ui        # Interactive UI mode
```

### Test Coverage

- **Unit Tests**: 1 test file (matching algorithm)
- **Integration Tests**: 5 test files (auth, users, matches, requests, middleware)
- **E2E Tests**: 4 test files (auth, profile, matches, chat)
- **Total**: 39 tests passing ✅

## 📱 Pages Overview

| Page       | Route             | Description                                        | Status     |
| ---------- | ----------------- | -------------------------------------------------- | ---------- |
| Landing    | `/`               | Marketing page with light rays effect              | ✅ Complete |
| Auth       | `/auth`           | Login/Signup with animated transitions             | ✅ Complete |
| Onboarding | `/app/onboarding` | New user setup flow with stepper                   | ✅ Complete |
| Dashboard  | `/app`            | Match recommendations with filters                 | ✅ Complete |
| Profile    | `/app/profile`    | Edit profile, skills, themes, gamification         | ✅ Complete |
| Requests   | `/app/requests`   | Manage skill swap requests (Incoming/Sent/History) | ✅ Complete |
| Chat       | `/app/chat`       | Real-time messaging with WebSocket                 | ✅ Complete |

## 🔌 API Documentation

Complete API documentation is available in `API_DOCUMENTATION.md`.

### Quick Reference

| Endpoint               | Method   | Description              |
| ---------------------- | -------- | ------------------------ |
| `/auth/signup`         | POST     | Register new user        |
| `/auth/login`          | POST     | User login               |
| `/users/me`            | GET      | Get current user profile |
| `/skills`              | GET      | List all skills          |
| `/matches/recommended` | GET      | Get recommended matches  |
| `/requests`            | GET/POST | Manage match requests    |
| `/requests/:id/accept` | PUT      | Accept a request         |
| `/requests/:id/reject` | PUT      | Reject a request         |
| `/messages`            | POST     | Send message             |
| `/messages/:id/read`   | PUT      | Mark message as read     |
| `/gamification/stats`  | GET      | Get user gamification    |
| `/health`              | GET      | Server health check      |

## 🏗️ Architecture

### Data Flow

1. **User Registration** → JWT token issued
2. **Profile Setup** → Skills added (offer/want)
3. **Matching Engine** → Finds complementary skills
4. **Match Request** → Stored in match_requests table
5. **Request Accepted** → Match entity created
6. **Real-time Chat** → Messages linked to Match via WebSocket

### Security Architecture

- **Authentication**: JWT with 15min expiry
- **Authorization**: Middleware checks on protected routes
- **Input Validation**: express-validator on all inputs
- **XSS Protection**: Input sanitization + React escaping
- **Rate Limiting**: 100 req/15min general, 5 req/15min auth
- **Security Headers**: Helmet with CSP, HSTS, etc.

## 🎮 Gamification System

### Levels (6 Tiers)
1. **Novice** (0-499 XP)
2. **Apprentice** (500-999 XP)
3. **Practitioner** (1000-1999 XP)
4. **Expert** (2000-4999 XP)
5. **Master** (5000-9999 XP)
6. **Grandmaster** (10000+ XP)

### Achievements (12 Badges)
- 🎯 First Skill
- 🤝 First Match
- 🔥 7-Day Streak
- ⭐ Top Rated
- 🚀 Quick Learner
- 🛡️ Trusted Profile
- And 6 more...

## 🤝 Contributing

We welcome contributions! Please follow these guidelines:

### Getting Started

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Run tests: `npm test` (ensure all tests pass)
5. Commit: `git commit -m 'Add amazing feature'`
6. Push: `git push origin feature/amazing-feature`
7. Open a Pull Request

### Code Standards

- **TypeScript**: Strict mode enabled, no `any` types
- **ESLint**: Follow all linting rules
- **Testing**: Write tests for new features (unit + integration)
- **Commits**: Use conventional commit messages
- **Documentation**: Update docs for API changes

### Development Workflow

```
bash
# Before committing
npm run lint         # Check code style
cd backend && npm test  # Run all tests
npm run test:coverage # Ensure coverage doesn't decrease
```

## 🐛 Troubleshooting

### Common Issues

#### Database Connection Error
```
bash
# Ensure MySQL is running
# Check DATABASE_URL format: mysql://user:password@localhost:3306/skillswap
# Run migrations: cd backend && npx prisma migrate dev
```

#### Port Already in Use
```
bash
# Kill process on port 3000 (backend)
lsof -ti:3000 | xargs kill -9

# Or use different port in .env
PORT=3001
```

#### CORS Errors
```
bash
# Ensure CORS_ORIGIN matches your frontend URL
# Default: http://localhost:5173
```

#### JWT Token Expired
- Tokens expire after 15 minutes
- Re-login to get fresh token
- Check JWT_SECRET is set correctly in .env

#### WebSocket Connection Issues
```
bash
# Ensure backend is running
# Check browser console for connection errors
# Verify CORS_ORIGIN includes frontend URL
```

#### React Hook Errors ("Invalid hook call")
- Ensure React and React-DOM are installed: `npm install react react-dom`
- Check for multiple copies of React in node_modules

### Getting Help

- Check `API_DOCUMENTATION.md` for API details
- Open an issue on GitHub with:
  - Steps to reproduce
  - Expected vs actual behavior
  - Environment details (OS, Node version, etc.)

## 🗺️ Roadmap

### Completed ✅
- Core authentication & profiles
- Skill management & matching
- Real-time chat with WebSocket
- Gamification system
- Mobile optimization
- Accessibility (WCAG)
- E2E testing
- API documentation

### In Progress 🟡
- Docker containerization
- CI/CD pipeline
- Staging environment

### Future ⏳
- AI-powered matching v2 (AirLLM)
- Video/voice calls (WebRTC)
- Push notifications
- Mobile app (React Native)
- Admin panel
- Analytics dashboard

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for beautiful UI components
- [Radix UI](https://www.radix-ui.com/) for accessible primitives
- [Framer Motion](https://www.framer.com/motion/) for animations
- [Socket.io](https://socket.io/) for real-time communication
- [Prisma](https://www.prisma.io/) for database ORM
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Lucide](https://lucide.dev/) for icons

## 📧 Contact

For questions, support, or collaboration:
- Open an issue on GitHub
- Email: support@skillswap.com
- Twitter: [@skillswap](https://twitter.com/skillswap)

---

**Made with 💜 and ☕ by the SkillSwap Team**

*Last Updated: March 2025*  
*Version: 1.0.0 MVP*

[![Tests](https://img.shields.io/badge/tests-39%20passing-brightgreen)]() 
[![License](https://img.shields.io/badge/license-MIT-blue)]() 
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)]() 
[![React](https://img.shields.io/badge/React-18.3-61DAFB)]()
