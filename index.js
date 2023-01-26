import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import { router } from './routes/routes.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.options('*', cors({
  origin: [process.env.CLIENT_URL],
  methods: ['GET', 'POST', 'DELETE', 'PATCH'],
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

app.use(cors({
  origin: [process.env.CLIENT_URL],
  methods: ['GET', 'POST', 'DELETE', 'PATCH'],
  credentials: true,
}));
app.use('/', router);

const start = () => {
  mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  app.listen(PORT);
};

start();
