import { Router } from 'express';
import * as AdminController from '../controllers/admin-controllers';
import { verifySuperAdmin } from '../middlewares/verify-super-admin';
import { verifyToken } from '../middlewares/verify-token';

const router = Router();

router.get('/', verifyToken, verifySuperAdmin, AdminController.getAdmins);
router.post('/', verifyToken, verifySuperAdmin, AdminController.createAdmin);

export default router;
