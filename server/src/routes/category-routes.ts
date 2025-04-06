import { Router } from 'express';
import * as CategoryControllers from '../controllers/category-controllers';

const router = Router();

router.get('/', CategoryControllers.getAllCategories);
router.get('/:id', CategoryControllers.getCategoryById);
router.put('/:id', CategoryControllers.updateCategory);
router.post('/', CategoryControllers.createCategories);

export default router;
