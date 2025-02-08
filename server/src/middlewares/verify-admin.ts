import { NextFunction, Request, Response } from 'express';
import { User } from '../models/User';

export const verifyAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const id = res.locals._id;

    const user = await User.findById(id);
    if (!user || user?.role === 'user') {
      res.status(401).json({ message: 'Only Admins can access this route' });
      return;
    }

    next();
  } catch (error) {
    console.log(`Verify admin error: ${(error as Error)?.message}`);
    res.status(500).json({ message: (error as Error)?.message });
  }
};
