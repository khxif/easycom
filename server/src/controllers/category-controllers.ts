import { Request, Response } from 'express';
import { Category } from '../models/category';

export const getAllCategories = async (req: Request, res: Response): Promise<void> => {
  try {
    const categories = await Category.find();


    res.status(200).json({ data: categories });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Get All Categories error' });
  }
};

export const createCategories = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, description } = req.body;
    if (!name || !description) {
      res.status(422).json({ message: 'Missing credentials.' });
      return;
    }

    const department = await Category.findOne({ name });
    if (department) {
      res.status(400).json({ message: 'Category already exists' });
      return;
    }

    const newDepartment = await new Category({
      name,
      description,
    }).save();

    res.status(200).json(newDepartment);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Create Category error' });
  }
};
