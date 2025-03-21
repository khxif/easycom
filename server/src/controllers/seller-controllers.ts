import { Request, Response } from 'express';
import { User } from '../models/User';

export const getSellers = async (req: Request, res: Response): Promise<void> => {
  try {
    const sellers = await User.find({ role: ['admin'], is_admin: true }).select('-password');

    const meta = {
      total: sellers.length,
    };

    res.status(200).json({ data: sellers, meta });
  } catch (error) {
    res.status(500).json({ message: 'Get Admin error' });
  }
};

export const deleteSeller = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(422).json({ message: 'Missing required fields' });
      return;
    }

    const seller = await User.findById(id);
    if (!seller) {
      res.status(404).json({ message: 'Seller not found' });
      return;
    }

    await User.findByIdAndDelete(id);

    res.status(200).json({ message: 'Seller deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Delete Seller error' });
  }
};
