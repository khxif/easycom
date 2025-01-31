import { Request, Response } from 'express';
import { User } from '../models/User';

export const getAdmins = async (req: Request, res: Response): Promise<void> => {
  try {
    const admins = await User.find({ role: ['admin', 'super-admin'] });

    const meta = {
      total: admins.length,
    };

    res.json({ data: admins, meta });
  } catch (error) {
    res.status(500).json({ message: 'Get Admin error' });
  }
};
