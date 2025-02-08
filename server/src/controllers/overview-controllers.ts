import { Request, Response } from 'express';
import { Product } from '../models/Product';
import { User } from '../models/User';

export const getOverview = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await Product.find();
    const users = await User.find({ role: 'user' });
    const admins = await User.find({ is_admin: true });

    const overview = {
      total_products: products?.length,
      total_users: users?.length,
      total_admins: admins?.length,
    };

    res.json(overview).status(200);
  } catch (error) {
    console.log('overview  error:', (error as Error).message);
    res.status(402).json({ message: (error as Error).message });
  }
};
