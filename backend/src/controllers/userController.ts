import type { Response } from 'express';
import { validationResult } from 'express-validator';
import { PrismaClient } from '../generated/prisma';
import type { AuthRequest } from '../types/auth';
