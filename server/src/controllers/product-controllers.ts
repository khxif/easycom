import { Request, Response } from 'express';
import { Product } from '../models/Product';

export const getAllProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const { limit, name } = req.query;

    const query: Record<string, unknown> = {};
    if (name) query.name = { $regex: name, $options: 'i' };

    const products = await Product.find(query).limit(Number(limit) || 10);
    const meta = {
      total: products.length,
    };
    res.json({ data: products, meta });
  } catch (error) {
    console.log('Get all products error:', (error as Error).message);
    res.status(402).json({ message: (error as Error).message });
  }
};

export const createProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, description, price, image_url, category, stock } = req.body;
    if (!name || !description || !price || !image_url || !category || !stock) {
      res.status(422).json({ message: 'Missing Fields' });
      return;
    }

    const product = new Product({
      name,
      description,
      price,
      image_url,
      category,
      stock,
    });

    await product.save();

    res.json({ message: 'Product created successfully' });
  } catch (error) {
    console.log('Create Product error:', (error as Error).message);
    res.status(402).json({ message: (error as Error).message });
  }
};
