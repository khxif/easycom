import { Router } from 'express';
import * as CartControllers from '../controllers/cart-controllers';

const router = Router();

router.get('/:id', CartControllers.getCart);
router.post('/add', CartControllers.addToCart);
router.post('/remove', CartControllers.removeFromCart);

export default router;