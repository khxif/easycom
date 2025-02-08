import { NextFunction, Request, Response } from 'express';
import { User } from '../models/User';

export const verifySuperAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const id = res.locals._id;

    const user = await User.findById(id);
    if (!user || user?.role === 'user' || user?.role === 'admin') {
      res.status(401).json({ message: 'Only Super Admins can access this route' });
      return;
    }

    next();
  } catch (error) {
    console.log(`Verify Super admin error: ${(error as Error)?.message}`);
    res.status(500).json({ message: (error as Error)?.message });
  }
};
