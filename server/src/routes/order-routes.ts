import { Router } from 'express';
import * as OrderControllers from '../controllers/order-controllers';
import { verifyAdmin } from '../middlewares/verify-admin';
import { verifyToken } from '../middlewares/verify-token';

const router = Router();

router.get('/', verifyToken, verifyAdmin, OrderControllers.getAllOrders);
router.post('/create', OrderControllers.createOrder);
router.post('/verify', OrderControllers.verifyOrder);

export default router;
