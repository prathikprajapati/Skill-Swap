# SkillSwap ✨

**Where skills become stories**

SkillSwap is a modern web platform that connects people to exchange knowledge and learn from each other. Create your profile, showcase your skills, find complementary matches, and grow together through meaningful skill exchanges.

![SkillSwap Landing Page](https://via.placeholder.com/800x400/1e293b/818cf8?text=SkillSwap+Platform)

## 🌟 Features

- **Smart Matching**: Find people whose skills complement yours
- **Beautiful UI**: Modern, animated interface with divine light ray effects and 9 theme variants
- **9 Theme System**: Warm Light, Cool Light, Dark, Sunny Day, Ocean Breeze, Spring Garden, Midnight, Starry Night, Cozy Dark
- **Gamification**: Level system with achievement badges
- **Chat**: HTTP-based messaging interface
- **Skill Management**: Track what you teach and what you want to learn with proficiency levels
- **Responsive Design**: Mobile-first approach, works seamlessly on all devices
- **UI Components**: Built with Radix UI primitives and shadcn/ui

## 🚀 Tech Stack

### Frontend
- **React 18.3** - Modern UI library with hooks
- **TypeScript 5.9** - Type-safe development
- **Vite 6.3** - Fast build tool and dev server
- **Tailwind CSS 4.1.12** - Utility-first styling with CSS variables
- **Framer Motion 12.23** - Smooth animations and transitions
- **React Router 7.13** - Client-side routing
- **Radix UI 1.4** - Accessible UI primitives (50+ components)
- **shadcn/ui** - Beautiful component library
- **Lucide React** - Beautiful icon library
- **Sonner** - Toast notifications
- **React Hook Form** - Form management with validation
- **GSAP** - Advanced animations
- **OGL** - WebGL-based light ray effects

### Backend
- **Node.js 18+** - Runtime environment
- **Express 5.2** - Web framework
- **TypeScript 5.9** - Type-safe development
- **Prisma 5.22** - Database ORM with type safety
- **MySQL 8** - Relational database
- **JWT 9.0** - Authentication tokens (15min expiry)
- **bcryptjs** - Password hashing (12 rounds)
- **express-validator** - Input validation
- **CORS** - Cross-origin resource sharing
- **Multer** - File upload handling

### Testing
- **Jest 29.7** - Testing framework
- **Supertest** - HTTP assertion library
- **ts-jest** - TypeScript support for Jest
- **Nodemon** - Development auto-restart

### Special Effects
- **OGL (OpenGL)** - WebGL-based light ray animations
- **Custom Shaders** - Divine light effects with mouse interaction
- **CSS Variables** - 9-theme system with dynamic switching

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn
- MySQL 8+ (for backend database)

### Quick Start

```bash
# Clone the repository
git clone https://github.com/yourusername/skillswap.git
cd skillswap

# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install

# Set up environment variables (see Environment Setup section below)
# Create .env file in backend/ directory

# Run database migrations
npx prisma migrate dev

# Seed the database (optional)
npx prisma db seed

# Start the backend server
npm run dev

# In a new terminal, start the frontend
cd ..
npm run dev
```

The app will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000
- Health Check: http://localhost:3000/health

### Environment Setup

Create a `.env` file in the `backend/` directory:

```env
# Database
DATABASE_URL="mysql://user:password@localhost:3306/skillswap"

# JWT
JWT_SECRET="your-super-secret-jwt-key-min-32-characters-long"
JWT_EXPIRES_IN="15m"

# Server
PORT=3000
NODE_ENV=development

# CORS
CORS_ORIGIN="http://localhost:5173"
```

Create a `.env` file in the root directory (for frontend):

```env
VITE_API_BASE_URL="http://localhost:3000"
```

## 🗂️ Project Structure

```
skillswap/
├── src/                          # Frontend source
│   ├── app/
│   │   ├── components/            # Reusable UI components
│   │   │   ├── ui/               # 50+ shadcn/ui components
│   │   │   ├── Layout.tsx        # App layout wrapper
│   │   │   ├── Navigation.tsx    # Dock-style navigation
│   │   │   └── ThemeSelector.tsx # Theme switcher
│   │   ├── pages/                # Page components
│   │   │   ├── LandingPage.tsx   # Home/landing page
│   │   │   ├── AuthPage.tsx      # Login/Signup
│   │   │   ├── DashboardPage.tsx # User dashboard with matches
│   │   │   ├── ProfilePage.tsx   # User profile with gamification
│   │   │   ├── ChatPage.tsx      # Messaging interface
│   │   │   ├── RequestsPage.tsx # Match requests management
│   │   │   └── OnboardingPage.tsx # New user setup flow
│   │   ├── contexts/             # React contexts
│   │   │   └── ThemeContext.tsx  # 9-theme system
│   │   ├── data/                 # Mock data for development
│   │   ├── utils/                # Utility functions
│   │   ├── constants/            # App constants
│   │   ├── routes.tsx            # Route definitions
│   │   └── App.tsx               # Root component
│   ├── styles/                   # Global styles
│   │   ├── theme.css             # Theme variables
│   │   └── tailwind.css          # Tailwind directives
│   └── assets/                   # Static assets
├── backend/                       # Backend API
│   ├── src/
│   │   ├── controllers/          # Route controllers
│   │   │   ├── authController.ts
│   │   │   ├── matchesController.ts
│   │   │   ├── messagesController.ts
│   │   │   ├── requestsController.ts
│   │   │   ├── skillsController.ts
│   │   │   └── userController.ts
│   │   ├── middleware/           # Express middleware
│   │   │   ├── auth.ts         # JWT authentication
│   │   │   └── upload.ts       # File upload handling
│   │   ├── routes/               # API routes
│   │   │   ├── auth.ts
│   │   │   ├── matches.ts
│   │   │   ├── messages.ts
│   │   │   ├── requests.ts
│   │   │   ├── skills.ts
│   │   │   └── users.ts
│   │   ├── types/                # TypeScript types
│   │   └── server.ts             # Express server entry
│   ├── prisma/
│   │   ├── schema.prisma         # Database schema
│   │   ├── seed.ts               # Database seeding
│   │   └── migrations/           # Database migrations
│   ├── tests/                    # Test suites
│   │   ├── unit/                 # Unit tests
│   │   │   └── matchingAlgorithm.test.ts
│   │   ├── integration/          # Integration tests
│   │   │   ├── auth.test.ts
│   │   │   ├── matches.test.ts
│   │   │   ├── middleware.test.ts
│   │   │   ├── requests.test.ts
│   │   │   └── user.test.ts
│   │   └── setup.ts              # Test configuration
│   └── uploads/                  # File uploads directory
│       └── avatars/              # User avatar uploads
├── docs/                         # Documentation
│   ├── implementation_checklist.md
│   └── ab_tak_kya_kra.md
├── README.md                      # This file
├── package.json                   # Frontend dependencies
├── vite.config.ts                 # Vite configuration
└── tailwind.config.ts             # Tailwind configuration
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

Each theme uses CSS custom properties:
- `--background`, `--foreground` - Base colors
- `--primary`, `--primary-dark`, `--primary-light` - Brand colors
- `--accent`, `--accent-light` - Accent colors
- `--text-primary`, `--text-secondary` - Text colors
- `--success`, `--warning`, `--destructive` - Status colors

### Typography
- **Font Family**: System UI / Inter
- **Headings**: Bold, tight tracking
- **Body**: Regular weight, relaxed line-height

### Animations
- **Page Transitions**: 300ms ease-in-out
- **Hover Effects**: Scale 1.02, shadow elevation
- **Light Rays**: Continuous WebGL animation with mouse tracking
- **Stagger Effects**: List item animations with delay

## 🛠️ Development

### Available Scripts

#### Frontend (Root Directory)
```bash
npm run dev          # Start Vite development server
npm run build        # Build for production
npm run preview      # Preview production build
```

#### Backend
```bash
# Development
npm run dev          # Start with hot reload (nodemon + tsx)

# Production
npm run build        # Compile TypeScript to dist/
npm start            # Start production server (node dist/server.js)

# Testing
npm test             # Run all Jest tests
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Run tests with coverage report
npm run test:unit    # Run unit tests only
npm run test:integration # Run integration tests only
npm run test:e2e     # Run E2E tests (if configured)

# Code Quality
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues

# Database
npm run prisma:generate  # Generate Prisma client
npm run prisma:migrate   # Run database migrations
npm run prisma:seed      # Seed database with sample data
```

## 🧪 Testing

### Running Tests

```bash
# Navigate to backend directory
cd backend

# Run all tests
npm test

# Run specific test types
npm run test:unit        # Unit tests (algorithms, utilities)
npm run test:integration # Integration tests (API endpoints)
npm run test:coverage    # With coverage report

# Run specific test file
npm test -- auth.test.ts
```

### Test Structure

- **Unit Tests**: Algorithm testing, utility functions
- **Integration Tests**: API endpoint testing with database
- **Test Database**: Uses separate test environment (configured in jest.config.js)

### Writing Tests

```typescript
// Example integration test pattern
import request from 'supertest';
import app from '../src/server';

describe('Auth API', () => {
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/auth/signup')
      .send({ email: 'test@example.com', password: 'password123', name: 'Test' });
    
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('token');
  });
});
```

## 📱 Pages Overview

| Page       | Route             | Description                                        | Status        |
| ---------- | ----------------- | -------------------------------------------------- | ------------- |
| Landing    | `/`               | Marketing page with light rays effect              | ✅ Complete    |
| Auth       | `/auth`           | Login/Signup with animated transitions             | ✅ Complete    |
| Onboarding | `/app/onboarding` | New user setup flow with stepper                   | ✅ Complete    |
| Dashboard  | `/app`            | Match recommendations with filters                 | ✅ Complete    |
| Profile    | `/app/profile`    | Edit profile, skills, themes, gamification         | ✅ Complete    |
| Requests   | `/app/requests`   | Manage skill swap requests (Incoming/Sent/History) | ✅ Complete    |
| Chat       | `/app/chat`       | Messaging interface (HTTP-based)                   | 🟡 UI Complete |

## 🔌 API Documentation

### Authentication
| Endpoint       | Method | Description       |
| -------------- | ------ | ----------------- |
| `/auth/signup` | POST   | Register new user |
| `/auth/login`  | POST   | User login        |

### Users
| Endpoint    | Method | Description              |
| ----------- | ------ | ------------------------ |
| `/users/me` | GET    | Get current user profile |
| `/users/me` | PUT    | Update user profile      |

### Skills
| Endpoint               | Method | Description               |
| ---------------------- | ------ | ------------------------- |
| `/skills`              | GET    | List all available skills |
| `/users/me/skills`     | POST   | Add skill to user profile |
| `/users/me/skills/:id` | DELETE | Remove skill from user    |

### Matches
| Endpoint               | Method | Description                         |
| ---------------------- | ------ | ----------------------------------- |
| `/matches/recommended` | GET    | Get recommended matches with scores |

### Requests
| Endpoint               | Method | Description            |
| ---------------------- | ------ | ---------------------- |
| `/requests`            | POST   | Send match request     |
| `/requests/incoming`   | GET    | List incoming requests |
| `/requests/sent`       | GET    | List sent requests     |
| `/requests/:id/accept` | PUT    | Accept match request   |
| `/requests/:id/reject` | PUT    | Reject match request   |

### Messages
| Endpoint                | Method | Description              |
| ----------------------- | ------ | ------------------------ |
| `/matches/:id/messages` | GET    | Get messages for a match |
| `/messages`             | POST   | Send message             |
| `/messages/:id/read`    | PUT    | Mark message as read     |

### Health Check
| Endpoint  | Method | Description          |
| --------- | ------ | -------------------- |
| `/health` | GET    | Server health status |

## 🏗️ Architecture

### Data Flow

1. User registers and creates profile
2. User adds skills as "offer" (can teach) and "want" (want to learn)
3. Matching engine finds users with complementary skills
4. User sends match request → stored in match_requests table
5. On acceptance → Match entity created linking both users
6. Messages are linked to Match via match_id

## 🎮 Gamification System

### Levels
- Novice, Apprentice, Practitioner, Expert, Master

### Achievements
- 7-Day Streak
- First Match
- Skill Master
- Top Rated
- Quick Learner
- Trusted Profile

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style
- Use TypeScript for type safety
- Follow ESLint rules
- Write tests for new features (unit + integration)
- Use conventional commit messages
- Update documentation for API changes

### Development Workflow

```bash
# Before committing
npm run lint         # Check code style
npm test             # Run all tests
npm run test:coverage # Ensure coverage doesn't decrease
```

## 🐛 Troubleshooting

### Common Issues

**Database Connection Error**
```bash
# Ensure MySQL is running
# Check DATABASE_URL format: mysql://user:password@localhost:3306/skillswap
# Run: npx prisma migrate dev
```

**CORS Errors**
```bash
# Ensure CORS_ORIGIN matches your frontend URL
# Default: http://localhost:5173
```

**JWT Token Expired**
- Tokens expire after 15 minutes
- Re-login to get fresh token
- Check JWT_SECRET is set correctly

**Port Already in Use**
```bash
# Backend default: 3000
# Frontend default: 5173
# Change in .env files if needed
```

## 🗺️ Roadmap

### Upcoming Features
- WebSocket real-time chat
- Push notifications
- Mobile app
- Admin panel
- Analytics dashboard

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for beautiful UI components
- [Radix UI](https://www.radix-ui.com/) for accessible primitives
- [Framer Motion](https://www.framer.com/motion/) for animations
- [OGL](https://github.com/oframe/ogl) for WebGL effects
- [Lucide](https://lucide.dev/) for icons
- [Prisma](https://www.prisma.io/) for database ORM
- [Tailwind CSS](https://tailwindcss.com/) for styling

## 📧 Contact

For questions or support, please open an issue on GitHub or contact the maintainers.

---

**Made with 💜 and ☕ by the SkillSwap Team**

*Last Updated: January 2025*
