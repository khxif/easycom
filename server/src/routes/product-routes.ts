import { Router } from 'express';
import * as ProductControllers from '../controllers/product-controllers';
import { verifyAdmin } from '../middlewares/verify-admin';
import { verifyToken } from '../middlewares/verify-token';

const router = Router();

router.get('/', ProductControllers.getAllProducts);
router.post('/', verifyToken, verifyAdmin, ProductControllers.createProduct);

export default router;
