import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { PrismaClient } from '@prisma/client';

const app: Express = express();
const prisma: PrismaClient = new PrismaClient();
const PORT: number | string = process.env.PORT || 5000;

// Security & Utility Middleware
app.use(helmet());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// Health Check Route
app.get('/api/v1/health', (req: Request, res: Response): void => {
  res.status(200).json({ status: 'ok', message: 'Family Tracker API is running' });
});

// TODO: Import and use routes here
// app.use('/api/v1/auth', authRoutes);
// app.use('/api/v1/families', familyRoutes);
// app.use('/api/v1/expenses', expenseRoutes);

// Global Error Handler
app.use((err: Error | any, req: Request, res: Response, next: NextFunction): void => {
  console.error(err?.stack || err);
  res.status(500).json({ success: false, error: 'Internal Server Error' });
});

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Graceful Shutdown
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  server.close(() => process.exit(0));
});

export { app, prisma };
