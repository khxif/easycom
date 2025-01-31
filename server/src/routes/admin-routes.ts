import { Router } from 'express';
import * as AdminController from '../controllers/admin-controllers';

const router = Router();

router.get('/', AdminController.getAdmins);

export default router;
