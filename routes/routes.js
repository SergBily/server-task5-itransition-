import express from 'express';
import { randomController } from '../controllers/random-controller.js';

export const router = express.Router();

router.post('/main', randomController.getFakerData);
