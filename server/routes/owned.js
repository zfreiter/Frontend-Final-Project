import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import { updateOwned } from '../controllers/stocksOwned.js';
const router = express.Router();

/* PATCH */
router.patch('/owned', updateOwned);

export default router;
