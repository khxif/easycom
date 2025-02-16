import { Request, Response } from 'express';
import { User } from '../models/User';

export const updateProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findById(res.locals._id);
    if (!user) {
      res.status(401).json({ message: 'User not found' });
      return;
    }

    const updatedUser = await User.findByIdAndUpdate(res.locals._id, req.body, { new: true });

    res.status(200).json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.log('Update Profile error:', (error as Error).message);
    res.status(402).json({ message: (error as Error).message });
  }
};
