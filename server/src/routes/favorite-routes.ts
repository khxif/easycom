import { Router } from 'express';
import * as FavoriteController from '../controllers/favorite-controllers';

const router = Router();

router.get('/:id', FavoriteController.getFavorites);
router.post('/add', FavoriteController.addFavorites);
router.delete('/remove', FavoriteController.removeFavorites);

export default router;
