import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import { GetOverviewData, GetTimeSeriesData, GetIncomeStatementData } from '../controllers/alphaVantageControllers.js';
const router = express.Router();

/* GET */
// stock overview in stock page
// stock chart
// stock income table
router.get('/overview', verifyToken, GetOverviewData);
router.get('/timeseries', verifyToken, GetTimeSeriesData);
router.get('/incomestatement', verifyToken, GetIncomeStatementData);
export default router;