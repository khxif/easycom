import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { Order } from '../models/Order';
import { Product } from '../models/Product';

export const getAllProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const { limit, name, location, category } = req.query;

    const query: Record<string, unknown> = {};
    if (name) query.name = { $regex: name, $options: 'i' };
    if (location) query.location = { $regex: location, $options: 'i' };
    if (category) query.category = { $regex: category, $options: 'i' };

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
    const { limit, page, name, category } = req.query;

    const query: Record<string, unknown> = {};
    if (name) query.name = { $regex: name, $options: 'i' };
    if (category) query.category = { $regex: category, $options: 'i' };

    if (user.role === 'super-admin') {
      const [products, total] = await Promise.all([
        Product.find(query)
          .skip(Number(page || 0) * Number(limit || 10))
          .limit(Number(limit || 10)),
        Product.countDocuments(query),
      ]);

      const meta = {
        limit: products.length,
        total,
        total_pages: Math.ceil(total / Number(limit || 10)),
      };

      res.status(200).json({ data: products, meta });
      return;
    }

    const [products, total] = await Promise.all([
      Product.find({ ...query, created_by: user._id })
        .skip(Number(page) * Number(limit) || 10)
        .limit(Number(limit) || 10),
      Product.countDocuments({ ...query, created_by: user._id }),
    ]);

    const meta = {
      limit: products.length,
      total,
      total_pages: Math.ceil(total / Number(limit || 10)),
    };

    res.status(200).json({ data: products, meta });
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

    res.status(200).json({ message: 'Product created successfully' });
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
    const currentMonth = new Date().getMonth();

    const salesData = await Order.aggregate([
      {
        $match: {
          status: 'SUCCESS',
          createdAt: {
            $gte: new Date(`${currentYear}-01-01`),
            $lt: new Date(`${currentYear + 1}-01-01`),
          },
          'products.product': new mongoose.Types.ObjectId(productId),
        },
      },
      { $unwind: '$products' },
      {
        $match: {
          'products.product': new mongoose.Types.ObjectId(productId),
        },
      },
      {
        $group: {
          _id: { $month: '$createdAt' },
          sales: { $sum: '$products.quantity' },
        },
      },
      { $sort: { _id: 1 } },
    ]);

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

    const formattedData = Array(12)
      .fill(0)
      .map((_, i) => {
        const monthData = salesData.find(item => item._id === i + 1);
        return {
          month: monthNames[i],
          sales: monthData ? monthData.sales : 0,
        };
      });

    const filteredData = formattedData.slice(0, currentMonth + 1);

    res.status(200).json({ data: filteredData });
  } catch (error) {
    console.error('Error fetching product sales:', (error as Error).message);
    res.status(500).json({ message: (error as Error).message });
  }
};
