import type { Express, Request, Response } from 'express';
import AdminRoutes from './admin-routes';
import AuthRoutes from './auth-routes';
import CartRoutes from './cart-routes';
import DepartmentRoutes from './department-routes';
import FavoriteRoutes from './favorite-routes';
import OrderRoutes from './order-routes';
import OverviewRoutes from './overview-routes';
import ProductRoutes from './product-routes';
import ProfileRoutes from './profile-routes';
import SellerRoutes from './seller-routes';
import UserRoutes from './user-routes';

export const setupRoutes = (app: Express) => {
  app.get('/', (req: Request, res: Response) => {
    res.send('Easycom Server');
  });

  app.use('/api/auth', AuthRoutes);
  app.use('/api/admins', AdminRoutes);
  app.use('/api/cart', CartRoutes);
  app.use('/api/departments', DepartmentRoutes);
  app.use('/api/favorites', FavoriteRoutes);
  app.use('/api/orders', OrderRoutes);
  app.use('/api/products', ProductRoutes);
  app.use('/api/profile', ProfileRoutes);
  app.use('/api/sellers', SellerRoutes);
  app.use('/api/users', UserRoutes);
  app.use('/api/overview', OverviewRoutes);
};
