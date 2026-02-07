# SkillSwap ✨

**Where skills meet stories**

SkillSwap is a modern web platform that connects people to exchange knowledge and learn from each other. Create your profile, find matches based on complementary skills, and grow together through meaningful skill exchanges.

![SkillSwap Landing Page](https://via.placeholder.com/800x400/1e293b/818cf8?text=SkillSwap+Platform)

## 🌟 Features

- **Smart Matching**: Find people whose skills complement yours perfectly
- **Beautiful UI**: Modern, animated interface with divine light ray effects
- **Dark/Light Theme**: Toggle between dark and light modes
- **Real-time Chat**: Connect and communicate with your matches
- **Skill Management**: Track what you teach and what you learn
- **Responsive Design**: Works seamlessly on desktop and mobile

## 🚀 Tech Stack

### Frontend
- **React 18** - Modern UI library with hooks
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations and transitions
- **React Router** - Client-side routing
- **Lucide React** - Beautiful icon library

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **Prisma** - Database ORM
- **PostgreSQL** - Relational database
- **JWT** - Authentication tokens
- **Jest** - Testing framework

### Special Effects
- **OGL (OpenGL)** - WebGL-based light ray animations
- **Custom Shaders** - Divine light effects with mouse interaction

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn
- PostgreSQL (for backend)

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

# Set up environment variables
cp .env.example .env
# Edit .env with your database credentials

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

## 🗂️ Project Structure

```
skillswap/
├── src/                          # Frontend source
│   ├── app/
│   │   ├── components/            # Reusable UI components
│   │   │   ├── ui/               # shadcn/ui components
│   │   │   ├── Layout.tsx        # App layout wrapper
│   │   │   └── Navigation.tsx    # Navigation component
│   │   ├── pages/                # Page components
│   │   │   ├── LandingPage.tsx   # Home/landing page
│   │   │   ├── AuthPage.tsx      # Login/Signup
│   │   │   ├── DashboardPage.tsx # User dashboard
│   │   │   ├── ProfilePage.tsx   # User profile
│   │   │   ├── ChatPage.tsx      # Messaging
│   │   │   └── OnboardingPage.tsx # New user onboarding
│   │   ├── routes.tsx            # Route definitions
│   │   └── contexts/             # React contexts
│   ├── styles/                   # Global styles
│   └── assets/                   # Static assets
├── backend/                       # Backend API
│   ├── src/
│   │   ├── controllers/          # Route controllers
│   │   ├── middleware/           # Express middleware
│   │   ├── routes/               # API routes
│   │   └── types/                # TypeScript types
│   ├── prisma/
│   │   └── schema.prisma         # Database schema
│   └── tests/                    # Test suites
└── README.md                      # This file
```

## 🎨 Design System

### Colors
- **Primary**: Indigo (`#6366f1`) - Main brand color
- **Secondary**: Amber (`#f59e0b`) - Accents and highlights
- **Background**: Slate (`#0f172a`) - Dark mode background
- **Surface**: Slate 800/900 - Cards and elevated surfaces
- **Text**: White/Slate 300 - High contrast readability

### Typography
- **Font Family**: System UI / Inter
- **Headings**: Bold, tight tracking
- **Body**: Regular weight, relaxed line-height

### Animations
- **Page Transitions**: 300ms ease-in-out
- **Hover Effects**: Scale 1.02, shadow elevation
- **Light Rays**: Continuous WebGL animation with mouse tracking

## 🛠️ Development

### Available Scripts

```bash
# Frontend
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint

# Backend
npm run dev          # Start with hot reload
npm run build        # Compile TypeScript
npm start            # Start production server
npm test             # Run Jest tests
```

### Environment Variables

Create a `.env` file in the backend directory:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/skillswap"

# JWT
JWT_SECRET="your-super-secret-jwt-key"
JWT_EXPIRES_IN="7d"

# Server
PORT=3000
NODE_ENV=development
```

## 🧪 Testing

```bash
# Run all tests
cd backend
npm test

# Run specific test file
npm test -- auth.test.ts

# Run with coverage
npm test -- --coverage
```

## 📱 Pages Overview

| Page | Route | Description |
|------|-------|-------------|
| Landing | `/` | Marketing page with light rays effect |
| Auth | `/auth` | Login/Signup with animated transitions |
| Dashboard | `/app` | Main user dashboard |
| Profile | `/app/profile` | Edit profile and skills |
| Requests | `/app/requests` | Manage skill swap requests |
| Chat | `/app/chat` | Real-time messaging |
| Onboarding | `/app/onboarding` | New user setup flow |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style
- Use TypeScript for type safety
- Follow ESLint rules
- Write tests for new features
- Use conventional commit messages

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for beautiful UI components
- [Framer Motion](https://www.framer.com/motion/) for animations
- [OGL](https://github.com/oframe/ogl) for WebGL effects
- [Lucide](https://lucide.dev/) for icons

## 📧 Contact

For questions or support, please open an issue on GitHub or contact the maintainers.

---

**Made with 💜 and ☕ by the SkillSwap Team**
