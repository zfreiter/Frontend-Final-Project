import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import groupRoutes from './routes/groups.js';
import ownedRoutes from './routes/owned.js';
import stockRoutes from './routes/stocks.js';
import alphaVantageRoutes from './routes/alphaVantage.js';

dotenv.config();
const app = express();
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

/* ROUTES USING express.Router */
app.use('/auth', authRoutes);
app.use('/group', groupRoutes);
app.use('/own', ownedRoutes);
app.use('/stock', stockRoutes);
app.use('/alphaVantage', alphaVantageRoutes);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 6001;
mongoose.set('strictQuery', false);
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: http://localhost:${PORT}`));
  })
  .catch((error) => console.log(`${error}. Did not connect database`));
