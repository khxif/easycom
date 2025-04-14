import { Request, Response } from 'express';
import { User } from '../models/User';

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const { page, limit, name } = req.query;

    const query: Record<string, unknown> = {};
    if (name) query.name = { $regex: name, $options: 'i' };

    const [users, total] = await Promise.all([
      User.find({ ...query, is_admin: false }),
      User.countDocuments({ ...query, is_admin: false }),
    ]);

    const meta = {
      limit: users.length,
      total,
      total_pages: Math.ceil(total / Number(limit || 10)),
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

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(422).json({ message: 'Missing required fields' });
      return;
    }

    const user = await User.findOneAndDelete({ _id: id, is_admin: false });
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.status(200).json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Delete User error' });
  }
};
