import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import { getStories, getInformation, getPrice } from '../controllers/stockControllers.js';
const router = express.Router();

/* GET */
router.get('/information', verifyToken, getInformation);
router.get('/stories', verifyToken, getStories);
router.get('/price', verifyToken, getPrice);
export default router;
