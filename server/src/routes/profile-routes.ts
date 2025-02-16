import { Router } from 'express';
import * as AuthControllers from '../controllers/auth-controllers';
import * as ProfileControllers from '../controllers/profile-controllers';
import { verifyToken } from '../middlewares/verify-token';

const router = Router();

router.get('/', verifyToken, AuthControllers.getMe);
router.put('/', verifyToken, ProfileControllers.updateProfile);

export default router;
