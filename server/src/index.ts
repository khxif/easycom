import cors from 'cors';
import dotenv from 'dotenv';
import express, { Express } from 'express';
import morgan from 'morgan';
import { connectDB } from './lib/connectDB';
import { setupRoutes } from './routes';
dotenv.config();

const port = process.env.PORT || 8888;
const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

setupRoutes(app);

connectDB().then(() => {
  app.listen(port, () => console.log(`Server running on port ${port}`));
});

module.exports = app;
