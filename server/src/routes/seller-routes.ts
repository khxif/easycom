import { Router } from 'express';
import * as SellerController from '../controllers/seller-controllers';
import { verifyAdmin } from '../middlewares/verify-admin';
import { verifyToken } from '../middlewares/verify-token';

const router = Router();

router.get('/', verifyToken, verifyAdmin, SellerController.getSellers);
router.post('/', verifyToken, verifyAdmin, SellerController.createSeller);
router.get('/:id', verifyToken, verifyAdmin, SellerController.getSellerById);
router.put('/:id', verifyToken, verifyAdmin, SellerController.updateSeller);
router.delete('/:id', verifyToken, verifyAdmin, SellerController.deleteSeller);

export default router;
