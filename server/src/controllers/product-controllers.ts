import { Request, Response } from 'express';
import { Product } from '../models/Product';

export const getAllProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const { limit, name, location } = req.query;

    const query: Record<string, unknown> = {};
    if (name) query.name = { $regex: name, $options: 'i' };
    if (location) query.location = { $regex: location, $options: 'i' };

    const [products, total] = await Promise.all([
      Product.find(query).limit(Number(limit) || 10),
      Product.countDocuments(query),
    ]);
    const meta = {
      limit: products.length,
      total,
    };
    res.json({ data: products, meta }).status(200);
  } catch (error) {
    console.log('Get all products error:', (error as Error).message);
    res.status(402).json({ message: (error as Error).message });
  }
};

export const getMyProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = res.locals.user;
    if (user.role === 'super-admin') {
      const products = await Product.find();
      res.status(200).json({ data: products });
      return;
    }

    const products = await Product.find({ created_by: user._id });
    res.status(200).json({ data: products });
  } catch (error) {
    console.log('Get my products error:', (error as Error).message);
    res.status(402).json({ message: (error as Error).message });
  }
};

export const createProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, description, price, image_url, category, stock, location, created_by } = req.body;
    if (
      !name ||
      !description ||
      !price ||
      !image_url ||
      !category ||
      !stock ||
      !location ||
      !created_by
    ) {
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
      location,
      created_by,
    });

    await product.save();

    res.json({ message: 'Product created successfully' }).status(200);
  } catch (error) {
    console.log('Create Product error:', (error as Error).message);
    res.status(402).json({ message: (error as Error).message });
  }
};

export const getProductById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(422).json({ message: 'Missing Product id' });
      return;
    }

    const product = await Product.findById(id);
    if (!product) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }

    res.status(200).json(product);
  } catch (error) {
    console.log('Get product by id error:', (error as Error).message);
    res.status(402).json({ message: (error as Error).message });
  }
};

export const updateProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(422).json({ message: 'Missing Product id' });
      return;
    }

    const product = await Product.findById(id);
    if (!product) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });

    res.status(200).json({ message: 'Updated Product' });
  } catch (error) {
    console.log('Update product error:', (error as Error).message);
    res.status(402).json({ message: (error as Error).message });
  }
};

export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(422).json({ message: 'Missing Product id' });
      return;
    }

    const product = await Product.findById(id);
    if (!product) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }

    await Product.findByIdAndDelete(id);
    res.status(200).json({ message: 'Product deleted' });
  } catch (error) {
    console.log('Delete product error:', (error as Error).message);
    res.status(402).json({ message: (error as Error).message });
  }
};
