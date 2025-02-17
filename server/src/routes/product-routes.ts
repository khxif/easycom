import { Router } from 'express';
import * as ProductControllers from '../controllers/product-controllers';
import { verifyAdmin } from '../middlewares/verify-admin';
import { verifyToken } from '../middlewares/verify-token';

const router = Router();

router.get('/', ProductControllers.getAllProducts);
router.post('/', verifyToken, verifyAdmin, ProductControllers.createProduct);
router.get('/:id', ProductControllers.getProductById);
router.put('/:id', verifyToken, verifyAdmin, ProductControllers.updateProduct);
router.delete('/:id', verifyToken, verifyAdmin, ProductControllers.deleteProduct);

export default router;
