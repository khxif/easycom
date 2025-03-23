import { Request, Response } from 'express';
import { User } from '../models/User';
import { hashPassword } from '../lib/hash-password';

export const getSellers = async (req: Request, res: Response): Promise<void> => {
  try {
    const sellers = await User.find({ role: ['admin'], is_admin: true }).select('-password');

    const meta = {
      total: sellers.length,
    };

    res.status(200).json({ data: sellers, meta });
  } catch (error) {
    res.status(500).json({ message: 'Get seller error' });
  }
};

export const createSeller = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password, phone_number, profile_picture, location } = req.body;
    if (!name || !email || !password || !phone_number || !location) {
      res.status(422).json({ message: 'Missing required fields' });
      return;
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(401).json({ message: 'Seller already exists' });
      return;
    }

    const hashedPassword = await hashPassword(password);
    const admin = new User({
      email,
      password: hashedPassword,
      role: 'admin',
      name,
      phone_number,
      is_admin: true,
      profile_picture,
      location,
    });

    await admin.save();

    res.status(200).json({ message: 'Seller created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Create Seller error' });
  }
};

export const updateSeller = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(422).json({ message: 'Missing required fields' });
      return;
    }

    const admin = await User.findById(id);
    if (!admin) {
      res.status(404).json({ message: 'Seller not found' });
      return;
    }

    const updatedAdmin = await User.findByIdAndUpdate(id, req.body, { new: true });

    res.status(200).json({ message: 'Seller updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Update Seller error' });
  }
};

export const getSellerById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(422).json({ message: 'Missing required fields' });
      return;
    }

    const admin = await User.findOne({ _id: id, role: ['admin'] });
    if (!admin) {
      res.status(404).json({ message: 'Seller not found' });
      return;
    }

    res.status(200).json(admin);
  } catch (error) {
    res.status(500).json({ message: 'Get Seller error' });
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
