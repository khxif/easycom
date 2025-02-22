import { Router } from 'express';
import * as CartControllers from '../controllers/cart-controllers';

const router = Router();

router.post('/add', CartControllers.addToCart);

export default router;