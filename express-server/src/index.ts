import express from 'express';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import router from './routes/index';
import { isAuthenticated } from './middleware/auth';

import connectDB from './db.setup';

import './cronjobs/habit';

const app = express();
const PORT = process.env.PORT ?? 8080;

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: false, limit: '16kb' }));
app.use(cookieParser());

app.use(isAuthenticated);

app.use('/api', router);

connectDB()
  .then(() => {
    const server = app.listen(PORT, () => {
      console.log(`Server running on ${PORT}`);
    });

    server.on('error', (err: NodeJS.ErrnoException) => {
      console.error('Error in starting the server:', err);
      if (err.code === 'EADDRINUSE') {
        process.exit(1);
      }
    });
  })
  .catch((err) => {
    console.error('Error connecting to the database:', err);
    process.exit(1);
  });

export default app;
