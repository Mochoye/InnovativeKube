import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import predictRoutes from './routes/predict.route.js'
import cookieParser from 'cookie-parser';
import { spawn } from 'child_process';

import path from 'path';
dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log(err);
  });

const __dirname = path.resolve();

const app = express();

app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

// const pythonScriptPath = './ML/app.py';

app.use(express.json());

app.use(cookieParser());

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});

// const pythonProcess = spawn('python', [pythonScriptPath]);

// pythonProcess.stdout.on('data', (data) => {
//   console.log(`stdout: ${data}`);
// });

// pythonProcess.stderr.on('data', (data) => {
//   console.error(`stderr: ${data}`);
// });

// pythonProcess.on('close', (code) => {
//   console.log(`Python script exited with code ${code}`);
// });

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/predict', predictRoutes);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});
