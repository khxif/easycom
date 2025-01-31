import cors from 'cors';
import dotenv from 'dotenv';
import express, { Express, Request, Response } from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import AuthRoutes from './routes/auth-routes';
import ProductRoutes from './routes/product-routes';
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8888;

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use('/api/auth', AuthRoutes);
app.use('/api/products', ProductRoutes);

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log('MongoDB connected');
  } catch (error) {
    console.log(error);
  }
}

module.exports = app;
