import * as crypto from 'crypto';
import { Request, Response } from 'express';
import Razorpay from 'razorpay';
import { Cart } from '../models/Cart';
import { Order } from '../models/Order';
import { Product } from '../models/Product';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const getAllOrders = async (req: Request, res: Response): Promise<void> => {
  try {
    const orders = await Order.find().populate('user').populate('products.product');
    res.status(200).json({ data: orders });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Get All Orders error' });
  }
};

export const createOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const { amount, user_id } = req.body;
    if (!amount || !user_id) {
      res.status(400).json({ message: 'Missing credentials.' });
      return;
    }

    const options = {
      amount: amount * 100,
      currency: 'INR',
      receipt: 'receipt_' + Math.random().toString(36).substring(7),
    };

    const cart = await Cart.findOne({ user: user_id }).populate('products.product');
    if (!cart || cart.products.length === 0) {
      res.status(400).json({ message: 'No products in cart' });
      return;
    }

    const order = await razorpay.orders.create(options);

    await new Order({
      user: user_id,
      amount: amount,
      products: cart.products,
      status: 'PENDING',
      razorpay_order_id: order.id,
    }).save();

    res.status(200).json(order);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Create Order error' });
  }
};

export const verifyOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, user_id } = req.body;
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !user_id) {
      res.status(400).json({ message: 'Missing Entries' });
      return;
    }

    const sign = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET as string)
      .update(sign.toString())
      .digest('hex');

    if (razorpay_signature !== expectedSign) {
      Order.findOneAndUpdate({ user: user_id }, { status: 'FAILED' });
      res.status(400).json({ error: 'Invalid payment signature' });
      return;
    }

    const cart = await Cart.findOne({ user: user_id }).populate('products.product');
    cart?.products.map(async (product: any) => {
      await Product.findOneAndUpdate(
        { name: product.product.name },
        { stock: product.product.stock - product.quantity },
      );
    });
    cart.products = [];
    await cart.save();

    await Order.findOneAndUpdate({ razorpay_order_id }, { status: 'SUCCESS' });

    res.status(200).json({ message: 'Payment verified successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Verify Order error' });
  }
};
