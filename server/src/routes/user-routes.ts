import { Router } from 'express';
import * as UserController from '../controllers/user-controllers';

const router = Router();

router.get('/', UserController.getUsers);
router.get('/:id', UserController.getUserById);

export default router;
