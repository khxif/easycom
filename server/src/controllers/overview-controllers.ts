import { Request, Response } from 'express';
import { Order } from '../models/Order';
import { Product } from '../models/Product';
import { User } from '../models/User';

export const getOverview = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await Product.find();
    const users = await User.find({ role: 'user' });
    const sellers = await User.find({ is_admin: true, role: 'admin' });

    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;

    const monthlyOrders = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(`${currentYear}-01-01`),
            $lt: new Date(`${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-01`),
          },
        },
      },
      {
        $group: {
          _id: { month: { $month: '$createdAt' } },
          totalOrders: { $sum: 1 },
        },
      },
      {
        $project: {
          month: '$_id.month',
          totalOrders: 1,
          _id: 0,
        },
      },
      {
        $sort: { month: 1 },
      },
    ]);

    const months = [
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

    const ordersByMonth = monthlyOrders.map(order => ({
      month: months[order.month - 1],
      orders: order.totalOrders,
    }));

    const overview = {
      total_products: products?.length,
      total_users: users?.length,
      total_sellers: sellers?.length,
      orders_by_month: ordersByMonth,
    };

    res.json(overview).status(200);
  } catch (error) {
    console.log('overview  error:', (error as Error).message);
    res.status(402).json({ message: (error as Error).message });
  }
};
