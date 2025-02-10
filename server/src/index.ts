import cluster from 'cluster';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { Express, Request, Response } from 'express';
import morgan from 'morgan';
import { connectDB } from './lib/connectDB';
import { setupRoutes } from './routes';
dotenv.config();

const port = process.env.PORT || 8888;
const numCPUs = require('os').cpus().length;

const setupMiddlewares = (app: Express) => {
  app.use(cors());
  app.use(express.json());
  app.use(morgan('dev'));
};

const startServer = async () => {
  const app: Express = express();

  setupMiddlewares(app);
  setupRoutes(app);

  try {
    await connectDB();
    app.listen(port, () => console.log(`Server is running on port ${port}`));
  } catch (error) {
    console.error(error);
  }

  module.exports = app;
};

if (cluster.isPrimary) for (let i = 0; i < numCPUs; i++) cluster.fork();
else startServer();
