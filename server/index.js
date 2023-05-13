import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import authRoutes from './routes/auth';

dotenv.config();
const app = express();
app.use(cors());

/* ROUTES USING express.Router */
app.use('/auth', authRoutes);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 6001;
mongoose.set('strictQuery', false);
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () =>
      console.log(`Server Port: http://localhost:${PORT}`)
    );
  })
  .catch((error) =>
    console.log(`${error}. Did not connect database`)
  );
