import { Router } from 'express';
import * as OverviewControllers from '../controllers/overview-controllers';
import { verifyAdmin } from '../middlewares/verify-admin';
import { verifyToken } from '../middlewares/verify-token';

const router = Router();

router.get('/', verifyToken, verifyAdmin, OverviewControllers.getOverview);

export default router;
