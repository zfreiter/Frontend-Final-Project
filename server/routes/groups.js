import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import { updateGroup } from '../controllers/stockGroups.js';
const router = express.Router();

/* PATCH */
router.patch('/groups', updateGroup);

export default router;
