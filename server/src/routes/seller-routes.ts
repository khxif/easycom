import { Router } from 'express';
import * as SellerController from '../controllers/seller-controllers';
import { verifyAdmin } from '../middlewares/verify-admin';
import { verifyToken } from '../middlewares/verify-token';

const router = Router();

router.get('/', verifyToken, verifyAdmin, SellerController.getSellers);
router.delete('/:id', verifyToken, verifyAdmin, SellerController.deleteSeller);

export default router;
