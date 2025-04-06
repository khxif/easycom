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

export const updateCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(422).json({ message: 'Missing required fields' });
      return;
    }

    const category = await Category.findById(id);
    if (!category) {
      res.status(404).json({ message: 'category not found' });
      return;
    }

    const updatedCategory = await Category.findByIdAndUpdate(id, req.body, { new: true });

    res.status(200).json({ message: 'Category updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Update Category error' });
  }
};

export const getCategoryById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(422).json({ message: 'Missing required fields' });
      return;
    }

    const category = await Category.findById(id);
    if (!category) {
      res.status(404).json({ message: 'category not found' });
      return;
    }

    res.status(200).json({ data: category });
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

    const category = await Category.findById(id);
    if (!category) {
      res.status(404).json({ message: 'category not found' });
      return;
    }

    await Category.findByIdAndDelete(id);

    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Delete category error' });
  }
};
