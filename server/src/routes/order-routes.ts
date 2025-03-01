import { Router } from 'express';
import * as OrderControllers from '../controllers/order-controllers';

const router = Router();

router.post('/create', OrderControllers.createOrder);
router.post('/verify', OrderControllers.verifyOrder);

export default router;
