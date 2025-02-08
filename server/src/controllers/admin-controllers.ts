import { Request, Response } from 'express';
import { User } from '../models/User';
import { hashPassword } from '../lib/hash-password';

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

export const createAdmin = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password, role, phone_number } = req.body;
    if (!name || !email || !password || !role || !phone_number) {
      res.status(422).json({ message: 'Missing required fields' });
      return;
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(401).json({ message: 'User already exists' });
      return;
    }

    const hashedPassword = await hashPassword(password);
    const admin = new User({
      email,
      password: hashedPassword,
      role,
      name,
      phone_number,
      is_admin: true,
    });

    await admin.save();

    res.json({ message: 'Admin created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Create Admin error' });
  }
};
