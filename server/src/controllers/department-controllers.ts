import { Request, Response } from 'express';
import { Department } from '../models/department';

export const getAllDepartments = async (req: Request, res: Response): Promise<void> => {
  try {
    const departments = await Department.find();
    res.status(200).json({ data: departments });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Get All Departments error' });
  }
};

export const createDepartment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, description } = req.body;
    if (!name || !description) {
      res.status(422).json({ message: 'Missing credentials.' });
      return;
    }

    const department = await Department.findOne({ name });
    if (department) {
      res.status(400).json({ message: 'Department already exists' });
      return;
    }

    const newDepartment = await new Department({
      name,
      description,
    }).save();

    res.status(200).json(newDepartment);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Create Department error' });
  }
};
