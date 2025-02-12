import { Router } from 'express';
import * as ProductControllers from '../controllers/product-controllers';
import { verifyAdmin } from '../middlewares/verify-admin';
import { verifyToken } from '../middlewares/verify-token';

const router = Router();

router.get('/', ProductControllers.getAllProducts);
router.get('/:id', ProductControllers.getProductById);
router.post('/', verifyToken, verifyAdmin, ProductControllers.createProduct);
router.put('/:id', verifyToken, verifyAdmin, ProductControllers.updateProduct);

export default router;
