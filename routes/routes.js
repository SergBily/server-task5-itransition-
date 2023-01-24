import express from 'express';
import { csvController } from '../controllers/csv-controller.js';
import { randomController } from '../controllers/random-controller.js';

export const router = express.Router();

router.post('/main', randomController.getFakesData);
router.get('/export', csvController.exportToCsv);
