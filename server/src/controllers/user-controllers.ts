import { Request, Response } from 'express';
import { User } from '../models/User';

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find({ is_admin: false });

    const meta = {
      total: users.length,
    };

    res.status(200).json({ data: users, meta });
  } catch (error) {
    res.status(500).json({ message: 'Get Users error' });
  }
};

export const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(422).json({ message: 'Missing required fields' });
      return;
    }

    const user = await User.findOne({ _id: id, is_admin: false });
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Get User error' });
  }
};
