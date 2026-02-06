import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import userRoutes from './routes/users';
import skillsRoutes from './routes/skills';
import matchesRoutes from './routes/matches';
import requestsRoutes from './routes/requests';
import messagesRoutes from './routes/messages';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import userRoutes from './routes/users';
import skillsRoutes from './routes/skills';
import matchesRoutes from './routes/matches';
import requestsRoutes from './routes/requests';
import messagesRoutes from './routes/messages';
import { requestLogger, errorLogger, performanceMonitor, securityLogger } from './middleware/logging';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Monitoring Middleware (must be first)
app.use(requestLogger);
app.use(performanceMonitor);
app.use(securityLogger);

// CORS middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
