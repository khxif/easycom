import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { Order } from '../models/Order';
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

    const product = await Product.findById(id).populate('created_by');
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

export const getProductSales = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id: productId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      res.status(400).json({ message: 'Invalid Product ID' });
      return;
    }

    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth(); // 0-indexed (0 = January, 11 = December)

    const salesData = await Order.aggregate([
      {
        $match: {
          status: 'SUCCESS', // Only successful orders
          createdAt: {
            $gte: new Date(`${currentYear}-01-01`),
            $lt: new Date(`${currentYear + 1}-01-01`),
          },
          'products.product': new mongoose.Types.ObjectId(productId), // Filter by specific product ID
        },
      },
      { $unwind: '$products' }, // Flatten products array
      {
        $match: {
          'products.product': new mongoose.Types.ObjectId(productId),
        },
      },
      {
        $group: {
          _id: { $month: '$createdAt' }, // Group sales by month
          sales: { $sum: '$products.quantity' }, // Calculate total sales (sum of quantities)
        },
      },
      { $sort: { _id: 1 } }, // Sort by month in ascending order
    ]);

    // Full month names
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    // Format the output to include full month names, handling months without sales
    const formattedData = Array(12)
      .fill(0)
      .map((_, i) => {
        const monthData = salesData.find(item => item._id === i + 1);
        return {
          month: monthNames[i],
          sales: monthData ? monthData.sales : 0,
        };
      });

    // Slice data from January to the current month dynamically
    const filteredData = formattedData.slice(0, currentMonth + 1);

    res.status(200).json({ data: filteredData });
  } catch (error) {
    console.error('Error fetching product sales:', (error as Error).message);
    res.status(500).json({ message: (error as Error).message });
  }
};
