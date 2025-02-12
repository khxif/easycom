import { Router } from 'express';
import * as AdminController from '../controllers/admin-controllers';
import { verifySuperAdmin } from '../middlewares/verify-super-admin';
import { verifyToken } from '../middlewares/verify-token';

const router = Router();

router.get('/', verifyToken, verifySuperAdmin, AdminController.getAdmins);
router.get('/:id', verifyToken, verifySuperAdmin, AdminController.getAdminById);
router.post('/', verifyToken, verifySuperAdmin, AdminController.createAdmin);
router.put('/:id', verifyToken, verifySuperAdmin, AdminController.updateAdmin);

export default router;
