import { Router } from 'express';
import * as CategoryControllers from '../controllers/category-controllers';

const router = Router();

router.get('/', CategoryControllers.getAllCategories);
router.post('/', CategoryControllers.createCategories);

export default router;
