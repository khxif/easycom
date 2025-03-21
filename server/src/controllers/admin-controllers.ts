import { Request, Response } from 'express';
import { hashPassword } from '../lib/hash-password';
import { User } from '../models/User';

export const getAdmins = async (req: Request, res: Response): Promise<void> => {
  try {
    const admins = await User.find({ role: ['super-admin'], is_admin: true }).select('-password');

    const meta = {
      total: admins.length,
    };

    res.status(200).json({ data: admins, meta });
  } catch (error) {
    res.status(500).json({ message: 'Get Admin error' });
  }
};

export const createAdmin = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password, phone_number, profile_picture, location } = req.body;
    if (!name || !email || !password || !phone_number || !location) {
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
      role: 'super-admin',
      name,
      phone_number,
      is_admin: true,
      profile_picture,
      location,
    });

    await admin.save();

    res.status(200).json({ message: 'Admin created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Create Admin error' });
  }
};

export const updateAdmin = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(422).json({ message: 'Missing required fields' });
      return;
    }

    const admin = await User.findById(id);
    if (!admin) {
      res.status(404).json({ message: 'Admin not found' });
      return;
    }

    const updatedAdmin = await User.findByIdAndUpdate(id, req.body, { new: true });

    res.status(200).json({ message: 'Admin updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Update Admin error' });
  }
};

export const getAdminById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(422).json({ message: 'Missing required fields' });
      return;
    }

    const admin = await User.findOne({ _id: id, role: ['super-admin'] });
    if (!admin) {
      res.status(404).json({ message: 'Admin not found' });
      return;
    }

    res.status(200).json(admin);
  } catch (error) {
    res.status(500).json({ message: 'Get Admin error' });
  }
};

export const deleteAdmin = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(422).json({ message: 'Missing required fields' });
      return;
    }

    const admin = await User.findById(id);
    if (!admin) {
      res.status(404).json({ message: 'Admin not found' });
      return;
    }

    await User.findByIdAndDelete(id);

    res.status(200).json({ message: 'Admin deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Delete Admin error' });
  }
};
